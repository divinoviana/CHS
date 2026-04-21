
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
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { STUDENTS_SEED_DATA } from './src/students_to_seed.ts';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log(`Starting seed for ${STUDENTS_SEED_DATA.length} students...`);
  
  // Set persistence to none to avoid session interference in node
  await setPersistence(auth, inMemoryPersistence);

  let success = 0;
  let alreadyExists = 0;
  let errors = 0;

  for (const student of STUDENTS_SEED_DATA) {
    try {
      console.log(`Processing: ${student.email}...`);
      
      let grade = '1';
      if (student.school_class.startsWith('2')) grade = '2';
      if (student.school_class.startsWith('3')) grade = '3';

      let user;
      try {
        // Check if user already exists in Auth
        const userCredential = await signInWithEmailAndPassword(auth, student.email, student.password);
        user = userCredential.user;
        console.log(`  User already exists in Auth: ${user.uid}`);
        alreadyExists++;
      } catch (authError) {
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') {
          // Create new user
          const userCredential = await createUserWithEmailAndPassword(auth, student.email, student.password);
          user = userCredential.user;
          console.log(`  Created new Auth user: ${user.uid}`);
          success++;
        } else {
          throw authError;
        }
      }

      // Sync with Firestore using the Auth UID
      await setDoc(doc(db, 'students', user.uid), {
        name: student.name,
        email: student.email,
        password: student.password,
        grade: grade,
        school_class: student.school_class,
        role: 'student',
        created_at: serverTimestamp()
      }, { merge: true });

      console.log(`  Firestore profile synced.`);
      
      // Sign out to clean up for next iteration
      await signOut(auth);

    } catch (error) {
      console.error(`  Error processing ${student.email}:`, error.message);
      errors++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n--- Seed Result ---');
  console.log(`Success: ${success}`);
  console.log(`Already Existed: ${alreadyExists}`);
  console.log(`Errors: ${errors}`);
  console.log('-------------------\n');
}

seed().catch(console.error);
