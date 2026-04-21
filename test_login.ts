
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testLogin() {
  const email = "celestino.iasrc07@gmail.com";
  const pass = "01051218";
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    console.log(`Success! Logged in as ${userCredential.user.email}`);
    await signOut(auth);
  } catch (err) {
    console.error(`Login failed for ${email}: ${err.message}`);
  }
}

testLogin().catch(console.error);
