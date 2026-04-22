
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { curriculumData } from '../data';
import { ArrowLeft, BookCheck, Star, MessageSquare, RotateCcw, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const MyActivities: React.FC = () => {
  const navigate = useNavigate();
  const { student, isLoading: isAuthLoading } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!student) {
        navigate('/login');
      } else {
        fetchMySubmissions(student.id);
      }
    }
  }, [student, isAuthLoading, navigate]);

  const fetchMySubmissions = async (studentId: string) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'submissions'),
        where('student_id', '==', studentId),
        orderBy('submitted_at', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubmissions(data || []);
    } catch (err: any) {
      console.warn("Falha na query de histórico (provável falta de índice), usando fallback:", err.message);
      try {
        // Fallback: busca por student_id e ordena na memória
        const qSimple = query(collection(db, 'submissions'), where('student_id', '==', studentId));
        const querySnapshot = await getDocs(qSimple);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmissions(data.sort((a: any, b: any) => {
          const t1 = a.submitted_at?.seconds || 0;
          const t2 = b.submitted_at?.seconds || 0;
          return t2 - t1;
        }));
      } catch (fallbackErr) {
        handleFirestoreError(fallbackErr, OperationType.LIST, 'submissions');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRedo = (lessonTitle: string) => {
    // Busca o ID da aula no curriculumData baseado no título
    let lessonIdFound = "";
    
    curriculumData.forEach(grade => {
      grade.bimesters.forEach(bimester => {
        const lesson = bimester.lessons.find(l => l.title === lessonTitle);
        if (lesson) lessonIdFound = lesson.id;
      });
    });

    if (lessonIdFound) {
      if (confirm(`Deseja refazer a aula: "${lessonTitle}"?`)) {
        navigate(`/lesson/${lessonIdFound}`);
      }
    } else {
      alert("Aula original não encontrada. Tente acessar pela página inicial.");
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-tocantins-blue dark:border-t-tocantins-yellow rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-20 transition-colors duration-300">
      <div className="bg-slate-900 dark:bg-slate-950 text-white p-8 md:p-12 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors font-bold text-xs uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2"/> Voltar para o Início
          </Link>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookCheck className="text-tocantins-yellow"/> Meu Histórico
          </h1>
          <p className="text-slate-400 mt-2 font-medium">{student.name} • {student.school_class}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 -mt-8">
        {loading ? (
          <div className="bg-white dark:bg-slate-900 p-20 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center gap-4 transition-colors">
             <Loader2 className="animate-spin text-tocantins-blue dark:text-tocantins-yellow" size={40}/>
             <p className="text-slate-500 dark:text-slate-400 font-bold">Buscando seus registros...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-20 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-800 transition-colors">
             <p className="text-slate-400 dark:text-slate-500 text-lg">Você ainda não enviou nenhuma atividade.</p>
             <Link to="/" className="inline-block mt-6 bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 px-8 py-3 rounded-xl font-bold">Começar agora</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map(sub => (
              <div key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="p-6 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">{sub.lesson_title}</h3>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-1">Enviado em: {sub.submitted_at?.toDate ? sub.submitted_at.toDate().toLocaleString('pt-BR') : new Date(sub.submitted_at).toLocaleString('pt-BR')}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border-2 border-tocantins-blue dark:border-tocantins-yellow font-black text-tocantins-blue dark:text-tocantins-yellow text-xl shadow-sm">
                    {sub.score?.toFixed(1) || '0.0'}
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {sub.teacher_feedback && (
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <MessageSquare className="text-tocantins-blue dark:text-tocantins-yellow shrink-0" size={24}/>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm">Feedback do Professor</h4>
                           <button onClick={() => handleRedo(sub.lesson_title)} className="flex items-center gap-2 bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold hover:bg-blue-800 dark:hover:bg-amber-500 transition shadow-md">
                             <RotateCcw size={14}/> Refazer
                           </button>
                        </div>
                        <p className="text-blue-900/80 dark:text-blue-200/80 text-sm leading-relaxed italic font-medium">"{sub.teacher_feedback}"</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2 text-sm">
                      <Star size={16} className="text-tocantins-yellow fill-tocantins-yellow"/> Análise da IA
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-xs italic">"{sub.ai_feedback?.generalComment || 'Atividade processada com sucesso pelo sistema.'}"</p>
                  </div>

                  <details className="text-sm group">
                    <summary className="cursor-pointer font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition flex items-center gap-2 select-none uppercase text-[10px] tracking-widest">
                       Visualizar respostas enviadas
                    </summary>
                    <div className="mt-4 space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {sub.content?.map((item: any, i: number) => (
                        <div key={i} className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/50 p-3 rounded-lg border dark:border-slate-800">
                           <b className="text-slate-400 dark:text-slate-500 block mb-1">P: {item.question}</b>
                           <span className="text-slate-800 dark:text-slate-300">R: {item.answer}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
