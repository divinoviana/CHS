const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'screens/AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The problematic transition
const messyPattern = /<\/div>\s+<div className="text-center py-10 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 font-bold">Nenhuma questão no banco\. Use o Plano de Aulas para criar novas atividades\.<\/div>\s+\) : \(/g;
const cleanReplacement = '</div>\n\n                     {questionBank.length === 0 ? (\n                       <div className="text-center py-10 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 font-bold">Nenhuma questão no banco. Use o Plano de Aulas para criar novas atividades.</div>\n                     ) : (';

let newContent = content.replace(messyPattern, cleanReplacement);

if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Successfully fixed logic in AdminDashboard.tsx');
} else {
    // Try even simpler match
    console.log('Regex failed, trying literal match for part of the problem...');
    const literalStr = ') : (';
    // This is risky if there are others, but inside this block it might be okay.
    // Let's use a more unique one.
    const uniqueMess = 'Questões Individuais</h2>\n                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Banco de questões avulsas ou vinculadas.</p>\n                       </div>\n                       <div className="text-xs font-black bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-xl uppercase"> {questionBank.length} Questões </div>\n                     </div>\n                       <div className="text-center py-10 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 font-bold">Nenhuma questão no banco. Use o Plano de Aulas para criar novas atividades.</div>\n                     ) : (';
    const cleanUnique = 'Questões Individuais</h2>\n                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Banco de questões avulsas ou vinculadas.</p>\n                       </div>\n                       <div className="text-xs font-black bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-xl uppercase"> {questionBank.length} Questões </div>\n                     </div>\n\n                     {questionBank.length === 0 ? (\n                       <div className="text-center py-10 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-400 font-bold">Nenhuma questão no banco. Use o Plano de Aulas para criar novas atividades.</div>\n                     ) : (';
    newContent = content.replace(uniqueMess, cleanUnique);
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Successfully fixed logic via literal match.');
    } else {
        console.log('All attempts failed.');
    }
}
