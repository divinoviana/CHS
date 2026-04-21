
import { STUDENTS_SEED_DATA } from './src/students_to_seed.ts';
import fs from 'fs';

const emails = STUDENTS_SEED_DATA.map(s => s.email);
const uniqueEmails = new Set(emails);

console.log(`Total records in Seed: ${STUDENTS_SEED_DATA.length}`);
console.log(`Unique emails in Seed: ${uniqueEmails.size}`);

const duplicates = emails.filter((item, index) => emails.indexOf(item) !== index);
if (duplicates.length > 0) {
  console.log(`Duplicate emails found in Seed: ${duplicates.length}`);
  console.log("Top 5 duplicates:", duplicates.slice(0, 5));
}
