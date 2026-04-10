
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { subjectsInfo } from '../data';
import { TEACHER_INFO } from '../data_admin';
import { BookOpen, GraduationCap, ChevronRight, BrainCircuit, BellRing, Loader2 } from 'lucide-react';
import { Subject } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { student, isLoading } = useAuth();
  const [exams, setExams] = useState<any[]>([]);
  const [finishedExamTitles, setFinishedExamTitles] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !student) {
      navigate('/login');
    } else if (student) {
      fetchExamsAndHistory();
    }
  }, [student, isLoading, navigate]);

  const fetchExamsAndHistory = async () => {
    if (!student) return;
    
    try {
      const examsQ = query(
        collection(db, 'bimonthly_exams'),
        where('grade', '==', Number(student.grade)),
        orderBy('created_at', 'desc')
      );
      
      const examsSnapshot = await getDocs(examsQ);
      const examData = examsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((exam: any) => !exam.school_class || exam.school_class === student.school_class.trim());

      const subsQ = query(
        collection(db, 'submissions'),
        where('student_id', '==', student.id)
      );
      
      const subsSnapshot = await getDocs(subsQ);
      const subData = subsSnapshot.docs
        .map(doc => doc.data().lesson_title.trim())
        .filter(title => title.startsWith('Avaliação Bimestral'));
        
      setExams(examData);
      setFinishedExamTitles(subData);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'bimonthly_exams');
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;
  if (!student) return null;

  // Filtra apenas provas que ele AINDA NÃO fez
  const pendingExams = exams.filter(e => {
    const title = `Avaliação Bimestral: ${e.bimester}º Bimestre`;
    return !finishedExamTitles.includes(title.trim());
  });

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Olá, {student.name.split(' ')[0]}!</h2>
          <p className="text-slate-400">Suas atividades da <span className="text-tocantins-yellow font-bold">{student.grade}ª Série</span>.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-10 space-y-12">
        {pendingExams.length > 0 && (
           <div className="bg-amber-50 border-2 border-amber-200 rounded-[40px] p-8 shadow-xl animate-in bounce-in duration-700">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <BrainCircuit size={24}/>
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-amber-900 uppercase tracking-tighter">Avaliações Pendentes</h3>
                    <p className="text-amber-700 text-xs font-bold uppercase tracking-widest">Você possui simulados bimestrais disponíveis</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {pendingExams.map(exam => (
                    <Link 
                      key={exam.id} 
                      to={`/evaluation/${exam.id}`}
                      className="bg-white p-6 rounded-3xl border border-amber-100 hover:border-amber-400 hover:shadow-lg transition-all group flex items-center justify-between"
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 ${subjectsInfo[exam.subject as Subject].color} rounded-xl flex items-center justify-center text-white text-xl`}>
                             {subjectsInfo[exam.subject as Subject].icon}
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-800 text-sm">Simulado {subjectsInfo[exam.subject as Subject].name}</h4>
                             <p className="text-[10px] font-black text-slate-400 uppercase">{exam.bimester}º Bimestre • {exam.school_class || 'Público Geral'}</p>
                          </div>
                       </div>
                       <ChevronRight className="text-amber-200 group-hover:text-amber-500 transition-colors" />
                    </Link>
                 ))}
              </div>
           </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(subjectsInfo) as Subject[]).map((key) => {
            const info = subjectsInfo[key];
            return (
              <Link key={key} to={`/grade/${student.grade}?subject=${key}`} className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200 hover:-translate-y-2 transition-all group">
                <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg`}>{info.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-tocantins-blue transition-colors">{info.name}</h3>
                <div className="flex items-center text-tocantins-blue font-bold text-xs uppercase tracking-widest mt-4">Acessar Conteúdo <ChevronRight size={14} className="ml-1" /></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
