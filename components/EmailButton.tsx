import React from 'react';
import { Mail } from 'lucide-react';

interface Props {
  studentName: string;
  schoolClass: string;
  lessonTitle: string;
  answers: Record<string, string>;
  teacherEmail?: string;
}

export const EmailButton: React.FC<Props> = ({ 
  studentName, 
  schoolClass, 
  lessonTitle, 
  answers,
  teacherEmail = "divino.viana@professor.to.gov.br"
}) => {
  
  const handleSend = () => {
    if (!studentName.trim()) {
      alert("Por favor, digite seu nome antes de enviar.");
      return;
    }

    const subject = `Atividade de Filosofia: ${studentName} - ${schoolClass}`;
    
    let body = `Nome do Aluno: ${studentName}\n`;
    body += `Turma/Escola: ${schoolClass}\n`;
    body += `Aula: ${lessonTitle}\n\n`;
    body += `--- RESPOSTAS ---\n\n`;

    // We iterate through the answers. Note: The order depends on how keys were inserted.
    // Since keys are generated based on activity ID and index in LessonView, they generally preserve order.
    let count = 1;
    Object.entries(answers).forEach(([key, value]) => {
      // Check type to ensure TS knows it is a string before trimming
      if (typeof value === 'string' && value.trim()) {
        body += `Resposta ${count}:\n${value}\n\n`;
        count++;
      }
    });

    if (count === 1) {
       alert("Por favor, responda pelo menos uma questão antes de enviar.");
       return;
    }

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const url = `mailto:${teacherEmail}?subject=${encodedSubject}&body=${encodedBody}`;
    
    window.location.href = url;
  };

  return (
    <button
      onClick={handleSend}
      className="fixed bottom-6 right-6 bg-tocantins-blue hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-full shadow-xl flex items-center space-x-2 transition-transform hover:scale-105 z-50"
    >
      <Mail className="w-5 h-5" />
      <span>Enviar por E-mail</span>
    </button>
  );
};