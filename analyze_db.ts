
import { STUDENTS_SEED_DATA } from './src/students_to_seed.ts';
import fs from 'fs';

const existingEmails = JSON.parse(fs.readFileSync('existing_emails.json', 'utf8'));
const inSeed = STUDENTS_SEED_DATA.map(s => s.email);

const missing = STUDENTS_SEED_DATA.filter(s => !existingEmails.includes(s.email));
const extra = existingEmails.filter(e => !inSeed.includes(e));

console.log(`Total in Seed: ${STUDENTS_SEED_DATA.length}`);
console.log(`Total in DB: ${existingEmails.length}`);
console.log(`Missing from DB (Seed emails not found): ${missing.length}`);
console.log(`Extra in DB (DB emails not in Seed): ${extra.length}`);

if (missing.length > 0) {
  console.log("\nMissing students (top 5):");
  missing.slice(0, 5).forEach(m => console.log(`- ${m.name} (${m.email})`));
}
