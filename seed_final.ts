
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
  const missing = [
    "guidoreis7755@gmail.com",
    "guilhermereis77555@gmail.com",
    "gustavooliveiradasilva020@gmail.com",
    "sousateteus2023@gmail.com",
    "aguiarsaisack@gmail.com"
  ];
  
  const students = STUDENTS_SEED_DATA.filter(s => missing.includes(s.email));
  
  console.log(`Starting final sync for ${students.length} students...`);
  await setPersistence(auth, inMemoryPersistence);

  for (const student of students) {
    try {
      console.log(`Processing: ${student.email}...`);
      let user;
      try {
        const cred = await createUserWithEmailAndPassword(auth, student.email, student.password);
        user = cred.user;
      } catch (e) {
        if (e.code === 'auth/email-already-in-use') {
           const cred = await signInWithEmailAndPassword(auth, student.email, student.password);
           user = cred.user;
        } else throw e;
      }

      await setDoc(doc(db, 'students', user.uid), {
        name: student.name,
        email: student.email,
        password: student.password,
        grade: student.school_class.startsWith('1') ? '1' : (student.school_class.startsWith('2') ? '2' : '3'),
        school_class: student.school_class,
        role: 'student',
        created_at: serverTimestamp(),
        migrated: true
      }, { merge: true });

      console.log(`  Success.`);
      await signOut(auth);
      
    } catch (error) {
      console.error(`  Error: ${error.message}`);
      if (error.code === 'auth/too-many-requests') break;
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

seed().catch(console.error);
