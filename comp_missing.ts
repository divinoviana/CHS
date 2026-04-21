
import { STUDENTS_SEED_DATA } from './src/students_to_seed.ts';
import fs from 'fs';

const existingEmails = JSON.parse(fs.readFileSync('existing_emails.json', 'utf8'));
const missing = STUDENTS_SEED_DATA.filter(s => !existingEmails.includes(s.email));

console.log(`Missing students (${missing.length}):`);
missing.forEach(m => console.log(`- ${m.name} (${m.email})`));
