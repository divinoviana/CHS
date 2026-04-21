
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function check() {
  const snapshot = await getDocs(collection(db, 'students'));
  const docs = snapshot.docs.map(doc => ({ id: doc.id, email: doc.data().email }));
  fs.writeFileSync('db_docs.json', JSON.stringify(docs, null, 2));
  console.log(`Saved ${docs.length} docs to db_docs.json`);
}

check().catch(console.error);
