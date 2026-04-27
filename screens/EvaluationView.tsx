
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { subjectsInfo } from '../data';
import { Subject } from '../types';
import { ArrowLeft, BrainCircuit, CheckCircle2, Clock, Send, Loader2, Award, Info, Lock } from 'lucide-react';
import { VisualActivityRenderer } from '../components/VisualActivityRenderer';

export const EvaluationView: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { student, isLoading: isAuthLoading } = useAuth();
  
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && !student) {
      navigate('/login');
    } else if (examId && student) {
      checkAttemptAndFetchExam();
    }
  }, [examId, student, isAuthLoading]);

  const checkAttemptAndFetchExam = async () => {
    if (!examId || !student) return;
    setCheckingStatus(true);
    try {
      const examDoc = await getDoc(doc(db, 'bimonthly_exams', examId));
      
      if (!examDoc.exists()) {
        alert("Avaliação não encontrada.");
        navigate('/');
        return;
      }

      const examData = { id: examDoc.id, ...examDoc.data() } as any;
      setExam(examData);

      const examTitle = `Avaliação Bimestral: ${examData.bimester}º Bimestre`;
      const subsQ = query(
        collection(db, 'submissions'),
        where('student_id', '==', student.id),
        where('subject', '==', examData.subject),
        where('lesson_title', '==', examTitle.trim())
      );
      
      const subsSnapshot = await getDocs(subsQ);
      if (!subsSnapshot.empty) {
        const existingSub = subsSnapshot.docs[0].data();
        setScore(existingSub.score);
        setAlreadyDone(true);
        setIsFinished(true);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `bimonthly_exams/${examId}`);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < exam.questions.length) {
      alert("Por favor, responda todas as questões antes de finalizar.");
      return;
    }

    if (!confirm("Tem certeza que deseja enviar? Você só tem UMA tentativa para esta avaliação.")) return;

    setIsSubmitting(true);
    
    let correctCount = 0;
    exam.questions.forEach((q: any) => {
      if (answers[q.id]?.toLowerCase() === q.correctOption.toLowerCase()) {
        correctCount++;
      }
    });

    const finalScore = (correctCount / exam.questions.length) * 10;
    setScore(finalScore);

    try {
      await addDoc(collection(db, 'submissions'), {
        student_id: student.id,
        student_name: student.name.trim(),
        school_class: student.school_class.trim(),
        grade: student.grade,
        lesson_id: examId,
        lesson_title: `Avaliação Bimestral: ${exam.bimester}º Bimestre`.trim(),
        subject: exam.subject,
        score: finalScore,
        content: exam.questions.map((q: any) => ({
           question: q.questionText,
           answer: `Opção ${answers[q.id].toUpperCase()}`
        })),
        teacher_feedback: `Simulado automático finalizado. Acertos: ${correctCount}/${exam.questions.length}.`,
        submitted_at: serverTimestamp(),
        status: 'completed'
      });

      setIsFinished(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'submissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingStatus) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4 transition-colors duration-300">
      <Loader2 className="animate-spin text-tocantins-blue dark:text-tocantins-yellow" size={40} />
      <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest">Validando sua tentativa...</p>
    </div>
  );

  if (!exam) return null;

  const subjectInfo = subjectsInfo[exam.subject as Subject];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 transition-colors duration-300">
      <div className={`${subjectInfo.color} text-white py-12 px-4 shadow-lg border-b border-white/5`}>
        <div className="container mx-auto max-w-3xl">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-bold transition-all">
             <ArrowLeft size={16}/> Voltar ao Início
           </button>
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-[30px] flex items-center justify-center text-4xl shadow-inner border border-white/20">
                 {subjectInfo.icon}
              </div>
              <div>
                 <h1 className="text-3xl font-black uppercase tracking-tighter">Avaliação: {subjectInfo.name}</h1>
                 <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">{exam.bimester}º Bimestre • {student.grade}ª Série</p>
              </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 -mt-8">
        {!isFinished ? (
           <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl flex items-center justify-between border-2 border-indigo-100 dark:border-indigo-900 transition-colors duration-300">
                 <div className="flex items-center gap-3">
                    <Info className="text-indigo-500 dark:text-indigo-400" size={20}/>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Atenção: Você só pode realizar esta prova uma única vez.</p>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-2xl font-black text-slate-400 dark:text-slate-500 text-xs">
                    <Clock size={14}/> QUESTÕES: {Object.keys(answers).length}/{exam.questions.length}
                 </div>
              </div>

              {exam.visualContent && (
                 <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 p-8 mb-8 transition-colors duration-300">
                    <VisualActivityRenderer content={exam.visualContent} />
                 </div>
              )}

              {exam.questions && Array.isArray(exam.questions) && exam.questions.map((q: any, idx: number) => (
                 <div key={idx} className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                    <div className="p-8 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
                       <span className="bg-slate-900 dark:bg-slate-950 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black">
                          {idx + 1}
                       </span>
                       <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest">ENEM Style</span>
                    </div>
                    <div className="p-8 space-y-6">
                       <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border-l-4 border-indigo-400 italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed shadow-inner">
                          "{q.textFragment}"
                       </div>
                       <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{q.questionText}</p>
                       
                       <div className="space-y-3">
                          {['a', 'b', 'c', 'd', 'e'].map(key => q.options[key as keyof typeof q.options] && (
                             <button 
                               key={key} 
                               onClick={() => handleOptionSelect(q.id, key)}
                               className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${answers[q.id] === key ? 'border-tocantins-blue dark:border-tocantins-yellow bg-blue-50 dark:bg-blue-900/20 shadow-md ring-2 ring-blue-100 dark:ring-blue-900/40' : 'border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                             >
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-black uppercase text-xs ${answers[q.id] === key ? 'bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border dark:border-slate-700'}`}>
                                   {key}
                                </span>
                                <span className={`text-sm leading-relaxed ${answers[q.id] === key ? 'text-blue-900 dark:text-blue-100 font-bold' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>
                                   {q.options[key as keyof typeof q.options] as string}
                                </span>
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              ))}

              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="w-full bg-slate-900 dark:bg-slate-800 text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-slate-800 dark:hover:bg-slate-700 transition active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                 {isSubmitting ? <Loader2 className="animate-spin"/> : <Send size={20}/>}
                 Finalizar e Bloquear Tentativa
              </button>
           </div>
        ) : (
           <div className="bg-white dark:bg-slate-900 rounded-[50px] shadow-2xl p-12 text-center border-4 border-indigo-100 dark:border-indigo-900 animate-in zoom-in duration-500 transition-colors duration-300">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${alreadyDone ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 shadow-amber-50 dark:shadow-none' : 'bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 shadow-green-50 dark:shadow-none'}`}>
                 {alreadyDone ? <Lock size={48}/> : <CheckCircle2 size={48}/>}
              </div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter mb-2">
                {alreadyDone ? 'Prova já Realizada' : 'Simulado Concluído!'}
              </h2>
              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-10">
                {alreadyDone ? 'Você já utilizou sua única chance nesta disciplina.' : 'Sua resposta foi enviada e o professor irá validar sua atividade.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                 <button onClick={() => navigate('/')} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-4 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">Voltar ao Portal</button>
                 <Link to="/my-activities" className="bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-800 dark:hover:bg-amber-500 transition">Ver Histórico</Link>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
