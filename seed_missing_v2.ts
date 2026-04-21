
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
  const existingDocs = JSON.parse(fs.readFileSync('db_docs.json', 'utf8'));
  const existingEmails = new Set(existingDocs.map(d => d.email));
  
  // Use unique emails from seed
  const uniqueSeed = [];
  const seen = new Set();
  for (const s of STUDENTS_SEED_DATA) {
    if (!seen.has(s.email)) {
      uniqueSeed.push(s);
      seen.add(s.email);
    }
  }

  const missing = uniqueSeed.filter(s => !existingEmails.has(s.email));
  
  console.log(`Starting migration for ${missing.length} missing students...`);
  await setPersistence(auth, inMemoryPersistence);

  let count = 0;
  for (const student of missing) {
    count++;
    try {
      console.log(`[${count}/${missing.length}] Processing: ${student.email}...`);
      
      let grade = '1';
      if (student.school_class.startsWith('2')) grade = '2';
      if (student.school_class.startsWith('3')) grade = '3';

      let user;
      try {
        // Try sign in first (it might be in Auth but missing Firestore doc)
        const userCredential = await signInWithEmailAndPassword(auth, student.email, student.password);
        user = userCredential.user;
      } catch (authError) {
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential' || authError.code === 'auth/invalid-email' || authError.code === 'auth/wrong-password') {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, student.email, student.password);
            user = userCredential.user;
          } catch (createError) {
             if (createError.code === 'auth/email-already-in-use') {
                // Should have worked with sign in unless password differs?
                console.log(`  Email in use, but sign-in failed. Check manually: ${student.email}`);
                continue;
             }
             throw createError;
          }
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
      await signOut(auth);
      
    } catch (error) {
      console.error(`  Error processing ${student.email}:`, error.message);
      if (error.code === 'auth/too-many-requests') {
        console.log("Rate limit hit. Stopping.");
        break;
      }
    }
    
    // 2 second delay to avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\nMigration run ended.`);
}

seed().catch(console.error);
