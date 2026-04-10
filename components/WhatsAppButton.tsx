import React from 'react';
import { Send } from 'lucide-react';

interface Props {
  studentName: string;
  schoolClass: string;
  lessonTitle: string;
  answers: Record<string, string>;
  teacherNumber?: string; // Could be an environment variable
}

export const WhatsAppButton: React.FC<Props> = ({ 
  studentName, 
  schoolClass, 
  lessonTitle, 
  answers,
  teacherNumber = "5563999999999" // Placeholder for teacher's number (Tocantins DDD 63)
}) => {
  
  const handleSend = () => {
    if (!studentName.trim()) {
      alert("Por favor, digite seu nome antes de enviar.");
      return;
    }

    let message = `*Atividade de Filosofia*\n\n`;
    message += `*Aluno:* ${studentName}\n`;
    message += `*Turma:* ${schoolClass}\n`;
    message += `*Aula:* ${lessonTitle}\n\n`;
    message += `------------------\n\n`;

    Object.entries(answers).forEach(([key, value], index) => {
      message += `*R${index + 1}:* ${value}\n\n`;
    });

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${teacherNumber}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleSend}
      className="fixed bottom-6 right-6 bg-tocantins-green hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full shadow-xl flex items-center space-x-2 transition-transform hover:scale-105 z-50"
    >
      <Send className="w-5 h-5" />
      <span>Enviar ao Professor</span>
    </button>
  );
};