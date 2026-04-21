
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
  const missing = STUDENTS_SEED_DATA.filter(s => !existingEmails.includes(s.email)).slice(0, 5);
  
  if (missing.length === 0) {
    console.log("No missing students found in the current slice.");
    return;
  }

  console.log(`Attempting migration for 5 missing students...`);
  await setPersistence(auth, inMemoryPersistence);

  for (const student of missing) {
    try {
      console.log(`Processing: ${student.email}...`);
      let grade = '1';
      if (student.school_class.startsWith('2')) grade = '2';
      if (student.school_class.startsWith('3')) grade = '3';

      let userCredential = await createUserWithEmailAndPassword(auth, student.email, student.password);
      const user = userCredential.user;

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
      await signOut(auth);
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
         console.log("  Already in Auth. Syncing Firestore...");
         const userCredential = await signInWithEmailAndPassword(auth, student.email, student.password);
         const user = userCredential.user;
         await setDoc(doc(db, 'students', user.uid), {
            name: student.name,
            email: student.email,
            password: student.password,
            grade: grade,
            school_class: student.school_class,
            role: 'student',
            created_at: serverTimestamp()
          }, { merge: true });
          console.log("  Firestore synced.");
          await signOut(auth);
      } else {
        console.error(`  Error: ${error.message}`);
        if (error.code === 'auth/too-many-requests') break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

seed().catch(console.error);
