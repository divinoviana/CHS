
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

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  const existingEmails = JSON.parse(fs.readFileSync('existing_emails.json', 'utf8'));
  const missing = STUDENTS_SEED_DATA.filter(s => !existingEmails.includes(s.email));
  
  console.log(`Starting migration for ${missing.length} missing students...`);
  await setPersistence(auth, inMemoryPersistence);

  let successCount = 0;
  let errorCount = 0;

  for (const student of missing) {
    try {
      console.log(`Processing: ${student.email}...`);
      
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
        created_at: serverTimestamp()
      }, { merge: true });

      console.log(`  Success.`);
      successCount++;
      await signOut(auth);
      
    } catch (error) {
      console.error(`  Error processing ${student.email}:`, error.message);
      errorCount++;
      if (error.code === 'auth/too-many-requests') {
        console.log("Rate limit hit. Stopping this run.");
        break;
      }
    }
    
    // Increased delay to be safe
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log(`\nMigration Finished. Success: ${successCount}, Errors: ${errorCount}`);
}

seed().catch(console.error);
