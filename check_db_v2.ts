
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function check() {
  const snapshot = await getDocs(collection(db, 'students'));
  console.log(`Total students in Firestore: ${snapshot.size}`);
  
  const emails = snapshot.docs.map(doc => doc.data().email);
  fs.writeFileSync('existing_emails.json', JSON.stringify(emails, null, 2));
}

check().catch(console.error);
