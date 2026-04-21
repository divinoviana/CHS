
import fs from 'fs';

const docs = JSON.parse(fs.readFileSync('db_docs.json', 'utf8'));
const emailToIds = {};

docs.forEach(d => {
  if (!emailToIds[d.email]) emailToIds[d.email] = [];
  emailToIds[d.email].push(d.id);
});

const duplicates = Object.keys(emailToIds).filter(e => emailToIds[e].length > 1);
console.log(`Unique emails in DB: ${Object.keys(emailToIds).length}`);
console.log(`Unique emails with multiple doc IDs: ${duplicates.length}`);

if (duplicates.length > 0) {
  console.log("Example dupe:", duplicates[0], emailToIds[duplicates[0]]);
}
