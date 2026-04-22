const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'screens/AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// I'll be extremely aggressive with the search and replace using index-based slicing if needed, but let's try a very unique multi-line string.
const lines = content.split('\n');
console.log('Original line 1724:', JSON.stringify(lines[1723]));

// Removing 1724, 1725, 1726 (which are index 1723, 1724, 1725)
// These were the extra opens.
lines.splice(1723, 3);

// Now removing the duplicate text block at the bottom of the tab.
// Line 1782 (index 1781 originally, now 1778)
lines.splice(1778, 3);

const newContent = lines.join('\n');
fs.writeFileSync(filePath, newContent);
console.log('Successfully applied structural fix to AdminDashboard.tsx');
