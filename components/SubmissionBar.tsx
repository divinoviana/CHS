
import React, { useState } from 'react';
import { Send, CheckCircle, Database, Loader2 } from 'lucide-react';
import { AIResponse, evaluateActivities } from '../services/aiService';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Subject } from '../types';
import { useAuth } from '../context/AuthContext';

export interface SubmissionItem {
  activityTitle: string;
  question: string;
  answer: string;
}

interface Props {
  studentName: string;
  schoolClass: string;
  submissionDate: string;
  lessonTitle: string;
  subject: Subject; 
  submissionData: SubmissionItem[];
  aiData?: AIResponse | null;
  theory: string;
}

export const SubmissionBar: React.FC<Props> = ({ 
  studentName, 
  schoolClass, 
  submissionDate,
  lessonTitle, 
  subject,
  submissionData,
  aiData,
  theory
}) => {
  const { student } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [dbStatus, setDbStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleInternalSend = async () => {
    if (!studentName?.trim() || submissionData.length === 0) {
      alert("Por favor, responda as atividades antes de enviar.");
      return;
    }

    if (dbStatus === 'saved') {
      // No alert/confirm in iframe, using a simple check
      // In a real app we'd use a custom modal
    }

    setIsGenerating(true);
    setDbStatus('saving');
    
    let currentAIData = aiData;
    try {
      if (!currentAIData) {
        const q = submissionData.map(item => ({ question: item.question, answer: item.answer }));
        currentAIData = await evaluateActivities(lessonTitle, theory, q);
      }

      const avgScore = currentAIData?.corrections?.length > 0 
        ? currentAIData.corrections.reduce((acc, c) => acc + (Number(c.score) || 0), 0) / currentAIData.corrections.length 
        : 0;

      await addDoc(collection(db, 'submissions'), {
        student_id: student?.id || 'anonymous',
        student_name: studentName.trim(),
        school_class: schoolClass.trim(),
        lesson_title: lessonTitle.trim(),
        subject: subject,
        submitted_at: serverTimestamp(),
        content: submissionData, 
        ai_feedback: currentAIData,
        score: avgScore,
        status: 'completed',
        teacher_feedback: null
      });

      setDbStatus('saved');
      alert(`Atividade de ${subject.toUpperCase()} enviada com sucesso!`);
    } catch (error: any) {
      handleFirestoreError(error, OperationType.CREATE, 'submissions');
      setDbStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
      <div className="container mx-auto max-w-3xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl transition-all duration-500 ${dbStatus === 'saved' ? 'bg-green-100 text-green-600 scale-110' : 'bg-slate-100 text-slate-400'}`}>
            {dbStatus === 'saved' ? <CheckCircle size={22}/> : <Database size={22}/>}
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1 tracking-widest">Sincronização</p>
            <p className="text-xs font-bold text-slate-600">
              {dbStatus === 'saving' ? 'Gravando no servidor...' : 
               dbStatus === 'saved' ? 'Atividade Sincronizada!' : 
               dbStatus === 'error' ? 'Falha na Gravação' : `Enviar p/ Prof. de ${subject}`}
            </p>
          </div>
        </div>

        <button 
          onClick={handleInternalSend} 
          disabled={isGenerating} 
          className={`relative overflow-hidden font-bold py-3.5 px-8 rounded-2xl flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg ${
            dbStatus === 'saved' 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-tocantins-blue hover:bg-blue-800 text-white'
          }`}
        >
          {isGenerating ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>}
          <span>{dbStatus === 'saved' ? 'Enviar Novamente' : 'Finalizar Atividade'}</span>
        </button>
      </div>
    </div>
  );
};
