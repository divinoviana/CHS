const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'screens/AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The messy top part indentations are tricky. I'll use a regex that is a bit more flexible but targeting the specific sequence.
const messyTopRegex = /                  <div className="bg-white dark:bg-slate-900 p-6 rounded-\[32px\] border dark:border-slate-800 shadow-sm transition-colors">\s+<div className="flex justify-between items-center mb-4">\s+<div>\s+<div className="bg-white dark:bg-slate-900 p-6 rounded-\[32px\] border dark:border-slate-800 shadow-sm transition-colors mb-8">/g;
const cleanTop = '                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm transition-colors mb-8">';

// The messy bottom part
const messyBottomRegex = /                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Aqui estão todas as questões geradas e salvas no banco de dados.<\/p>\s+<\/div>\s+<\/div>/g;
const cleanBottom = '';

let newContent = content.replace(messyTopRegex, cleanTop).replace(messyBottomRegex, cleanBottom);

// Check if changed
if (content === newContent) {
    console.log('No matches found with regex. Trying literal strings...');
    // Fallback to literal if regex fails due to line endings or something
    const messyTopLiteral = '                  <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm transition-colors">\n                     <div className="flex justify-between items-center mb-4">\n                       <div>\n                   <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm transition-colors mb-8">';
    const messyBottomLiteral = '                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Aqui estão todas as questões geradas e salvas no banco de dados.</p>\n                       </div>\n                     </div>';
    newContent = content.replace(messyTopLiteral, cleanTop).replace(messyBottomLiteral, cleanBottom);
}

if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully fixed AdminDashboard.tsx structure.');
} else {
    console.log('Failed to identify the messy blocks. Manual intervention needed.');
}
