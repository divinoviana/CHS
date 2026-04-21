
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  inMemoryPersistence
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  serverTimestamp
} from 'firebase/firestore';
import { STUDENTS_SEED_DATA } from './src/students_to_seed.ts';
import fs from 'fs';

const STATE_FILE = './migration_state.json';
const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  }
  return { processed: [] };
}

function saveState(processedEmail) {
  const state = loadState();
  if (!state.processed.includes(processedEmail)) {
    state.processed.push(processedEmail);
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  }
}

async function seed() {
  const state = loadState();
  const studentsToProcess = STUDENTS_SEED_DATA.filter(s => !state.processed.includes(s.email));
  
  console.log(`Resuming seed. ${state.processed.length} already done. ${studentsToProcess.length} remaining...`);
  
  await setPersistence(auth, inMemoryPersistence);

  for (const student of studentsToProcess) {
    let retryCount = 0;
    const maxRetries = 5;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        console.log(`Processing [${retryCount}]: ${student.email}...`);
        
        let grade = '1';
        if (student.school_class.startsWith('2')) grade = '2';
        if (student.school_class.startsWith('3')) grade = '3';

        let user;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, student.email, student.password);
          user = userCredential.user;
        } catch (authError) {
          if (authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential' || authError.code === 'auth/invalid-email') {
            const userCredential = await createUserWithEmailAndPassword(auth, student.email, student.password);
            user = userCredential.user;
          } else if (authError.code === 'auth/too-many-requests') {
            console.log(`  Rate limited. Waiting 30s...`);
            await new Promise(resolve => setTimeout(resolve, 30000));
            retryCount++;
            continue;
          } else {
            throw authError;
          }
        }

        await setDoc(doc(db, 'students', user.uid), {
          name: student.name,
          email: student.email,
          password: student.password,
          grade: grade,
          school_class: student.school_class,
          role: 'student',
          created_at: serverTimestamp(),
          migrated: true
        }, { merge: true });

        console.log(`  Success.`);
        saveState(student.email);
        await signOut(auth);
        success = true;
        
      } catch (error) {
        if (error.code === 'auth/too-many-requests') {
          console.log(`  Rate limited. Waiting 60s...`);
          await new Promise(resolve => setTimeout(resolve, 60000));
          retryCount++;
        } else {
          console.error(`  Error processing ${student.email}:`, error.message);
          success = true; // Skip this one for now to avoid stuck loop
        }
      }
    }
    
    // Regular delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n--- Seed Cycle Complete ---');
}

seed().catch(console.error);
