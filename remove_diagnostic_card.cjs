
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'screens', 'AdminDashboard.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Buscamos a div do diagnóstico
const startMarker = '<h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter">Diagnóstico do Banco de Dados</h3>';
const endMarker = '                  </div>'; // O fechamento da div principal que contém o diagnóstico

// Vamos tentar uma abordagem mais robusta: remover pela estrutura do card
const cardStart = content.indexOf('<Database className="text-tocantins-blue dark:text-tocantins-yellow" size={24}/>');
if (cardStart !== -1) {
    // Encontrar o início da div que contém esse ícone (provavelmente algumas linhas acima)
    let startOfDiv = content.lastIndexOf('<div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm mb-6 transition-colors">', cardStart);
    if (startOfDiv === -1) {
        // Tenta sem os espaços extras ou variações
        startOfDiv = content.lastIndexOf('<div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm mb-6 transition-colors', cardStart);
    }

    if (startOfDiv !== -1) {
        // Agora encontrar o fechamento dessa div. É um bloco grande.
        // O bloco termina antes de 'Atividades por Área'
        const nextHeader = content.indexOf('<h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Atividades por Área</h2>', cardStart);
        if (nextHeader !== -1) {
            // O fechamento da div anterior deve estar um pouco antes do próximo container
            const endOfDiv = content.lastIndexOf('<div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm transition-colors mb-8">', nextHeader);
            
            if (endOfDiv !== -1 && endOfDiv > startOfDiv) {
                const newContent = content.substring(0, startOfDiv) + content.substring(endOfDiv);
                fs.writeFileSync(filePath, newContent);
                console.log("Card de diagnóstico removido com sucesso!");
            } else {
                console.log("Não foi possível determinar o fim do bloco.");
            }
        }
    }
} else {
    console.log("Card de diagnóstico não encontrado.");
}
