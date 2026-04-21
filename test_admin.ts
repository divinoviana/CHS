
import admin from 'firebase-admin';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

let app;
try {
  app = admin.initializeApp({
    projectId: firebaseConfig.projectId
  });
} catch (e) {
  console.log("Default init failed");
}

async function test() {
  if (!app) return;
  try {
    const db = admin.firestore(firebaseConfig.firestoreDatabaseId);
    const snapshot = await db.collection('students').limit(1).get();
    console.log(`Success! Found ${snapshot.size} student doc.`);
  } catch (err) {
    console.error("Firestore access failed:", err.message);
    if (err.code === 7) {
       console.log("Permission denied for admin. This environment likely doesn't have local service account permissions.");
    }
  }
}

test().catch(e => console.error("Admin test failed:", e));
