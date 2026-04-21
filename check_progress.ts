
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function checkProgress() {
  const querySnapshot = await getDocs(collection(db, 'students'));
  console.log(`Total students in Firestore: ${querySnapshot.size}`);
}

checkProgress().catch(console.error);
