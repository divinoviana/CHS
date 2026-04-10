
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { curriculumData, subjectsInfo } from '../data';
import { Book, ArrowLeft, ShieldAlert, ChevronRight, BrainCircuit, CheckCircle2, Clock, Award, Lock } from 'lucide-react';
import { Subject } from '../types';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export const GradeView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { student, isLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<string[]>([]);
  const [loadingExams, setLoadingExams] = useState(true);
  
  const subjectKey = searchParams.get('subject') as Subject || 'filosofia';
  const grade = curriculumData.find(g => g.id === Number(id));
  const subject = subjectsInfo[subjectKey];

  useEffect(() => {
    if (!isLoading) {
      if (!student) {
        navigate('/login');
      } else if (Number(student.grade) !== Number(id)) {
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
        fetchExamsAndStatus();
      }
    }
  }, [id, student, isLoading, navigate, subjectKey]);

  const fetchExamsAndStatus = async () => {
    if (!student || !subjectKey) return;
    setLoadingExams(true);
    try {
      const examsQ = query(
        collection(db, 'bimonthly_exams'),
        where('grade', '==', Number(id)),
        where('subject', '==', subjectKey),
        orderBy('created_at', 'desc')
      );
      
      const examsSnapshot = await getDocs(examsQ);
      const examsData = examsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((exam: any) => !exam.school_class || exam.school_class === student.school_class.trim());

      const subsQ = query(
        collection(db, 'submissions'),
        where('student_id', '==', student.id),
        where('subject', '==', subjectKey)
      );
      
      const subsSnapshot = await getDocs(subsQ);
      const subsData = subsSnapshot.docs.map(doc => doc.data().lesson_title.trim());

      setExams(examsData || []);
      setUserSubmissions(subsData || []);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'bimonthly_exams');
    } finally {
      setLoadingExams(false);
    }
  };

  if (isLoading || isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-tocantins-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthorized === false) return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md border border-red-100">
        <ShieldAlert className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Série Incorreta</h2>
        <p className="text-slate-500 mb-6">Você está cadastrado na {student?.grade}ª Série e tentou acessar a {id}ª Série.</p>
        <Link to="/" className="block bg-slate-900 text-white p-4 rounded-xl font-bold">Voltar ao Meu Painel</Link>
      </div>
    </div>
  );

  if (!grade || !subject) return null;

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-500 pb-20">
      <div className={`${subject.color} py-16 text-white shadow-inner`}>
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-bold transition-all">
            <ArrowLeft size={16}/> Mudar Disciplina
          </Link>
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-white/20 rounded-[30px] flex items-center justify-center text-4xl shadow-inner border border-white/20 backdrop-blur-sm">
                {subject.icon}
             </div>
             <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">{subject.name} - {grade.title}</h1>
                <p className="text-white/70 font-medium uppercase tracking-widest text-[10px]">Portal de Conteúdo e Avaliação</p>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl -mt-10">
        <div className="space-y-12">
          
          {(exams.length > 0 || loadingExams) && (
            <section className="animate-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 mb-6 ml-2">
                <Award className="text-tocantins-blue" size={20} />
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Avaliação Bimestral Disponível</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {loadingExams ? (
                  <div className="bg-white p-8 rounded-[32px] border border-dashed flex items-center justify-center gap-3 text-slate-400 font-bold">
                    <Clock className="animate-spin" size={18}/> Sincronizando...
                  </div>
                ) : (
                  exams.map(exam => {
                    const examTitle = `Avaliação Bimestral: ${exam.bimester}º Bimestre`;
                    const isDone = userSubmissions.includes(examTitle);

                    return (
                      <Link 
                        key={exam.id} 
                        to={isDone ? "#" : `/evaluation/${exam.id}`}
                        className={`bg-white p-6 rounded-[32px] shadow-lg border-2 transition-all flex items-center justify-between group ${isDone ? 'border-green-100 opacity-80 cursor-default grayscale' : 'border-indigo-50 hover:border-indigo-400 hover:-translate-y-1'}`}
                        onClick={(e) => isDone && e.preventDefault()}
                      >
                         <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${isDone ? 'bg-slate-200 text-slate-500' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'}`}>
                               {isDone ? <Lock size={28}/> : <BrainCircuit size={28}/>}
                            </div>
                            <div>
                               <h4 className="font-black text-slate-800 uppercase tracking-tight text-sm">
                                 {isDone ? 'Avaliação Encerrada' : `Simulado do ${exam.bimester}º Bimestre`}
                               </h4>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                 {isDone ? 'Nota já registrada no sistema' : `Realize sua única tentativa agora`}
                               </p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            {isDone ? (
                              <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-full text-[10px] font-black uppercase">Realizada</span>
                            ) : (
                              <>
                                <span className="hidden sm:block text-[10px] font-black text-indigo-500 uppercase">Fazer Agora</span>
                                <ChevronRight className="text-indigo-200 group-hover:text-indigo-500 transition-colors" />
                              </>
                            )}
                         </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center gap-2 mb-6 ml-2">
              <Book className="text-slate-400" size={20} />
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Roteiro de Estudos</h2>
            </div>
            
            <div className="space-y-8">
              {grade.bimesters.map((bimester) => {
                const filteredLessons = bimester.lessons.filter(l => l.subject === subjectKey);
                if (filteredLessons.length === 0) return null;

                const displayTitle = bimester.subjectTitles?.[subjectKey] || bimester.title;

                return (
                  <div key={bimester.id} className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden">
                    <div className="bg-slate-50 px-8 py-5 border-b flex justify-between items-center">
                       <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">{displayTitle}</h3>
                       <span className="bg-white px-3 py-1 rounded-full text-[9px] font-black text-slate-400 border border-slate-200">{filteredLessons.length} Aulas</span>
                    </div>
                    <div className="divide-y divide-slate-50">
                      {filteredLessons.map((lesson) => {
                        const isLessonDone = userSubmissions.includes(lesson.title.trim());
                        return (
                          <Link key={lesson.id} to={`/lesson/${lesson.id}`} className="flex items-center p-6 hover:bg-slate-50/80 transition group">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all mr-5 ${isLessonDone ? 'bg-green-50 text-green-500' : 'bg-slate-100 text-slate-400 group-hover:bg-tocantins-blue group-hover:text-white group-hover:rotate-6'}`}>
                               {isLessonDone ? <CheckCircle2 size={20}/> : <Book size={20}/>}
                             </div>
                             <div className="flex-1">
                                <span className={`font-bold text-sm block transition-colors ${isLessonDone ? 'text-slate-400' : 'text-slate-700 group-hover:text-tocantins-blue'}`}>
                                  {lesson.title}
                                </span>
                                {isLessonDone && <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Atividade entregue</span>}
                             </div>
                             <ChevronRight size={18} className="text-slate-200 group-hover:text-tocantins-blue transition-all group-hover:translate-x-1"/>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
