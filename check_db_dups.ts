
import fs from 'fs';

const emails = JSON.parse(fs.readFileSync('existing_emails.json', 'utf8'));
const uniqueEmails = new Set(emails);

console.log(`Total emails in DB: ${emails.length}`);
console.log(`Unique emails in DB: ${uniqueEmails.size}`);

const counts = {};
emails.forEach(e => counts[e] = (counts[e] || 0) + 1);
const dups = Object.keys(counts).filter(e => counts[e] > 1);

if (dups.length > 0) {
  console.log(`Unique emails with duplicates in DB: ${dups.length}`);
  console.log("Example:", dups[0], "count:", counts[dups[0]]);
}
