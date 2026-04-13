
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, onSnapshot, setDoc } from 'firebase/firestore';
import { subjectsInfo, ADMIN_PASSWORDS, curriculumData } from '../data';
import { Subject } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateBimonthlyEvaluation, GeneratedEvaluation, generatePedagogicalSummary, generateLessonPlan, LessonPlan } from '../services/aiService';
import { 
  Users, BookOpen, User, 
  MessageSquare, Loader2, X, Save, 
  RefreshCw, Home, ShieldCheck, Trash2, Settings,
  Search, Award, StickyNote, Clock, Send, UserCircle, BrainCircuit, Sparkles, FileText, CheckCircle2,
  Filter, Download, GraduationCap, ChevronRight, ClipboardEdit, BarChart3, Printer, Wand2,
  Library, ListChecks, Reply, Key, UserMinus, AlertTriangle, Camera, Upload, Eye, MessageSquareQuote, UserPlus, Pencil, Layers, Database
} from 'lucide-react';

// Componente otimizado para buscar a foto de cada aluno individualmente, evitando o timeout.
const StudentAvatar: React.FC<{ studentId?: string; studentName: string }> = ({ studentId, studentName }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    const fetchPhoto = async () => {
      if (!studentId) {
          setLoading(false);
          return;
      }
      setLoading(true);
      try {
        const studentDoc = await getDoc(doc(db, 'students', studentId));
        
        if (studentDoc.exists()) {
          const data = studentDoc.data();
          if (!isCancelled && data?.photo_url) {
            setPhoto(data.photo_url);
          }
        }
      } catch (err) {
        console.error("Photo fetch error for student", studentId, err);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    fetchPhoto();
    return () => { isCancelled = true; };
  }, [studentId]);

  if (loading) {
    return <div className="w-full h-full bg-slate-200 animate-pulse" />;
  }

  return (
    <img 
      src={photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=random`} 
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
      loading="lazy"
      alt={studentName}
    />
  );
};


export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { teacherSubject, loginTeacher, logoutTeacher } = useAuth();
  
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState(''); 
  const [selectedAccess, setSelectedAccess] = useState<Subject | 'SUPER_ADMIN'>('filosofia');
  
  const [students, setStudents] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'submissions' | 'evaluations' | 'messages' | 'students' | 'manage' | 'exam_generator' | 'reports' | 'lessons_list' | 'teacher_profile' | 'question_bank'>('submissions');
  
  // Atividades Salvas
  const [savedActivities, setSavedActivities] = useState<string[]>([]);
  const [isGeneratingActivityFor, setIsGeneratingActivityFor] = useState<string | null>(null);
  const [questionBank, setQuestionBank] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'lessons_list') {
      fetchSavedActivities();
    }
    if (activeTab === 'question_bank') {
      fetchQuestionBank();
    }
  }, [activeTab]);

  const fetchSavedActivities = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'activities'));
      const data = querySnapshot.docs.map(doc => doc.data().lesson_id);
      setSavedActivities(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'activities');
    }
  };

  const fetchQuestionBank = async () => {
    try {
      const q = query(collection(db, 'questions'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestionBank(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'questions');
    }
  };

  const handleSeedDatabase = async () => {
    if (!confirm("Isso irá gerar atividades padrão para TODAS as aulas que ainda não possuem atividade no banco de dados. Pode levar alguns segundos. Deseja continuar?")) return;
    
    setLoading(true);
    try {
      const { generateFallbackActivity } = await import('../services/aiService');
      
      const allLessons: any[] = [];
      curriculumData.forEach(grade => {
        grade.bimesters.forEach(bim => {
          bim.lessons.forEach(lesson => {
            allLessons.push(lesson);
          });
        });
      });

      let addedCount = 0;
      
      for (const lesson of allLessons) {
        if (savedActivities.includes(lesson.id)) continue; 
        
        const activity = generateFallbackActivity(lesson.title, lesson.theory, lesson.questions);
        
        const actRef = await addDoc(collection(db, 'activities'), {
          lesson_id: lesson.id, 
          title: `Atividade: ${lesson.title}`,
          visual_content: activity.visualContent,
          created_at: serverTimestamp()
        });

        const questionsToInsert = [
          ...activity.objectives.map(q => ({
            subject: lesson.subject,
            topic: lesson.title,
            type: 'objective',
            difficulty: 'Médio',
            question_text: q.question,
            options: q.options,
            correct_option: q.correctOption,
            explanation: '',
            created_at: serverTimestamp()
          })),
          ...activity.discursives.map(q => ({
            subject: lesson.subject,
            topic: lesson.title,
            type: 'discursive',
            difficulty: 'Médio',
            question_text: q.question,
            created_at: serverTimestamp()
          }))
        ];

        for (const q of questionsToInsert) {
          const qRef = await addDoc(collection(db, 'questions'), q);
          // In Firestore we can just link by ID in the activity document or a subcollection
          // For simplicity with the current structure, I'll just add them to the question bank
        }
        
        addedCount++;
      }
      
      alert(`Processo concluído! ${addedCount} atividades foram geradas e salvas no banco de dados.`);
      fetchSavedActivities();
      fetchQuestionBank();
    } catch (e) {
      console.error("Erro no seed:", e);
      alert("Ocorreu um erro ao gerar as atividades.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAndSaveActivity = async (lesson: any) => {
    if (isGeneratingActivityFor) return;
    setIsGeneratingActivityFor(lesson.id);
    try {
      const { generateLessonActivity } = await import('../services/aiService');
      const activity = await generateLessonActivity(lesson.title, lesson.theory);
      
      if (savedActivities.includes(lesson.id)) {
        const q = query(collection(db, 'activities'), where('lesson_id', '==', lesson.id));
        const querySnapshot = await getDocs(q);
        for (const doc of querySnapshot.docs) {
          await deleteDoc(doc.ref);
        }
        
        const q2 = query(collection(db, 'questions'), where('topic', '==', lesson.title), where('subject', '==', lesson.subject));
        const querySnapshot2 = await getDocs(q2);
        for (const doc of querySnapshot2.docs) {
          await deleteDoc(doc.ref);
        }
      }

      await addDoc(collection(db, 'activities'), {
        lesson_id: lesson.id, 
        title: `Atividade: ${lesson.title}`,
        visual_content: activity.visualContent,
        created_at: serverTimestamp()
      });

      const questionsToInsert = [
        ...activity.objectives.map(q => ({
          subject: lesson.subject,
          topic: lesson.title,
          type: 'objective',
          difficulty: 'Médio',
          question_text: q.question,
          options: q.options,
          correct_option: q.correctOption,
          explanation: '',
          created_at: serverTimestamp()
        })),
        ...activity.discursives.map(q => ({
          subject: lesson.subject,
          topic: lesson.title,
          type: 'discursive',
          difficulty: 'Médio',
          question_text: q.question,
          created_at: serverTimestamp()
        }))
      ];

      for (const q of questionsToInsert) {
        await addDoc(collection(db, 'questions'), q);
      }

      alert('Atividade gerada e salva com sucesso no banco de dados!');
      fetchSavedActivities();
      fetchQuestionBank();
    } catch (e: any) {
      console.error(e);
      alert("Erro ao gerar/salvar atividade: " + e.message);
    } finally {
      setIsGeneratingActivityFor(null);
    }
  };

  // Perfil do Professor
  const [teacherPhoto, setTeacherPhoto] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Visualização de Submissão (Modal de Detalhes)
  const [viewingSubmission, setViewingSubmission] = useState<any | null>(null);
  const [manualFeedback, setManualFeedback] = useState('');
  const [isSavingManualFeedback, setIsSavingManualFeedback] = useState(false);

  // Aula Pronta IA
  const [viewingLessonPlan, setViewingLessonPlan] = useState<LessonPlan | null>(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Carômetro e Notas
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [studentNote, setStudentNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [studentNotesHistory, setStudentNotesHistory] = useState<any[]>([]);
  
  // Edição de Notas
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState('');

  // Criação de Estudante (Super Admin)
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    email: '',
    password: '',
    grade: '1',
    school_class: ''
  });
  const [isSavingNewStudent, setIsSavingNewStudent] = useState(false);

  // Chat
  const [selectedChatStudentId, setSelectedChatStudentId] = useState<string | null>(null);
  const [teacherReplyText, setTeacherReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Relatórios IA
  const [reportTarget, setReportTarget] = useState<'student' | 'class'>('student');
  const [selectedReportStudent, setSelectedReportStudent] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [aiReportResult, setAiReportResult] = useState<string | null>(null);

  // Gerador de Provas IA
  const [examGrade, setExamGrade] = useState('1');
  const [examBimester, setExamBimester] = useState('1');
  const [examClass, setExamClass] = useState('all');
  const [generatedExam, setGeneratedExam] = useState<GeneratedEvaluation | null>(null);
  const [isGeneratingExam, setIsGeneratingExam] = useState(false);
  const [isPublishingExam, setIsPublishingExam] = useState(false);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterBimester, setFilterBimester] = useState<string>('all');

  const isSuper = teacherSubject === 'SUPER_ADMIN';

  const getLessonBimester = (lessonTitle: string) => {
    for (const grade of curriculumData) {
      for (const bimester of grade.bimesters) {
        if (bimester.lessons.some(l => l.title === lessonTitle)) {
          return bimester.title;
        }
      }
    }
    return 'Atividades Extras';
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAccess === 'SUPER_ADMIN') {
        if (email.trim() === 'divinoviana@gmail.com' && pass.trim() === '3614526312') {
            loginTeacher('SUPER_ADMIN');
            setActiveTab('submissions');
        } else {
            alert("Credenciais de Super Admin incorretas.");
        }
    } else {
        if (pass.trim() === ADMIN_PASSWORDS[selectedAccess as Subject]) {
          loginTeacher(selectedAccess);
          setActiveTab('submissions');
        } else {
          alert("Senha incorreta.");
        }
    }
  };

  const handleViewLessonPlan = async (lesson: any, gradeId: number) => {
    setViewingLessonPlan({
      title: lesson.title,
      objectives: lesson.objectives,
      theory: lesson.theory,
      methodology: {
        introduction: "Introdução ao tema e contextualização.",
        development: lesson.methodology || "Desenvolvimento do conteúdo com exemplos práticos.",
        conclusion: "Revisão dos pontos chave e reflexão."
      },
      suggestedActivity: lesson.reflectionQuestions?.join('\n') || "Atividade prática em sala."
    });
  };

  const loadTeacherProfile = async () => {
    if (!teacherSubject || isSuper) return;
    try {
      const teacherDoc = await getDoc(doc(db, 'teacher_profiles', teacherSubject));
      if (teacherDoc.exists()) {
        setTeacherPhoto(teacherDoc.data().photo_url);
      }
    } catch (e) {
      console.error("Error loading teacher profile", e);
    }
  };

  const handleSaveTeacherProfile = async () => {
    if (!teacherPhoto || !teacherSubject) return;
    setIsSavingProfile(true);
    try {
      await setDoc(doc(db, 'teacher_profiles', teacherSubject), {
        subject: teacherSubject, 
        photo_url: teacherPhoto,
        updated_at: serverTimestamp()
      }, { merge: true });

      alert("Foto de perfil atualizada!");
      setActiveTab('submissions');
    } catch (e: any) {
      handleFirestoreError(e, OperationType.UPDATE, `teacher_profiles/${teacherSubject}`);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleExitAdmin = () => {
    logoutTeacher();
    navigate('/admin');
  };

  const loadData = async () => {
    if (!teacherSubject) return;
    setLoading(true);
    try {
      const studentsQuery = query(collection(db, 'students'), orderBy('name'));
      const studentsSnapshot = await getDocs(studentsQuery);
      setStudents(studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      let subQ = query(collection(db, 'submissions'), orderBy('submitted_at', 'desc'));
      if (!isSuper) {
        subQ = query(collection(db, 'submissions'), where('subject', '==', teacherSubject), orderBy('submitted_at', 'desc'));
      }
      const subSnapshot = await getDocs(subQ);
      setSubmissions(subSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      let msgQ = query(collection(db, 'messages'), orderBy('created_at', 'asc'));
      if (!isSuper) {
        msgQ = query(collection(db, 'messages'), where('subject', '==', teacherSubject), orderBy('created_at', 'asc'));
      }
      const msgSnapshot = await getDocs(msgQ);
      setMessages(msgSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      loadTeacherProfile();
    } catch (e) {
      console.error("Error loading data", e);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!teacherSubject) return;
    
    let msgQ = query(collection(db, 'messages'), orderBy('created_at', 'asc'));
    if (!isSuper) {
      msgQ = query(collection(db, 'messages'), where('subject', '==', teacherSubject), orderBy('created_at', 'asc'));
    }

    const unsubscribe = onSnapshot(msgQ, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(newMessages);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'messages');
    });

    return () => unsubscribe();
  }, [teacherSubject, isSuper]);

  useEffect(() => {
    if (teacherSubject) { loadData(); }
  }, [teacherSubject]);

  useEffect(() => {
    if (selectedStudent && teacherSubject) { fetchStudentNotes(selectedStudent.id); }
  }, [selectedStudent, teacherSubject]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChatStudentId]);

  const fetchStudentNotes = async (studentId: string) => {
    try {
      const q = query(
        collection(db, 'student_notes'),
        where('student_id', '==', studentId),
        where('teacher_subject', '==', teacherSubject),
        orderBy('created_at', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudentNotesHistory(data || []);
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'student_notes');
    }
  };

  const handleSaveNote = async () => {
    if (!studentNote.trim() || !selectedStudent || !teacherSubject) return;
    setIsSavingNote(true);
    try {
      await addDoc(collection(db, 'student_notes'), {
        student_id: selectedStudent.id,
        teacher_subject: teacherSubject,
        content: studentNote.trim(),
        created_at: serverTimestamp()
      });
      setStudentNote('');
      fetchStudentNotes(selectedStudent.id);
    } catch (e: any) {
      handleFirestoreError(e, OperationType.CREATE, 'student_notes');
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleUpdateNote = async () => {
    if (!editingNoteId || !editingNoteContent.trim() || !selectedStudent) return;
    try {
      await updateDoc(doc(db, 'student_notes', editingNoteId), {
        content: editingNoteContent.trim(),
        updated_at: serverTimestamp()
      });
      
      setEditingNoteId(null);
      setEditingNoteContent('');
      fetchStudentNotes(selectedStudent.id);
    } catch (e: any) {
      handleFirestoreError(e, OperationType.UPDATE, `student_notes/${editingNoteId}`);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm("Deseja realmente excluir esta anotação?")) return;
    try {
      await deleteDoc(doc(db, 'student_notes', noteId));
      if (selectedStudent) fetchStudentNotes(selectedStudent.id);
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `student_notes/${noteId}`);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuper) return;
    setIsSavingNewStudent(true);
    try {
      // In Firebase, we should use Auth to create the user, but for now I'll just add to Firestore
      // as the user might want to manage auth separately or use the Login screen logic.
      // In our Firebase setup, we create the student doc in Firestore.
      
      await addDoc(collection(db, 'students'), {
        ...newStudentData,
        photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(newStudentData.name)}&background=random`,
        created_at: serverTimestamp()
      });

      alert("Estudante criado com sucesso!");
      setIsCreatingStudent(false);
      setNewStudentData({ name: '', email: '', password: '', grade: '1', school_class: '' });
      loadData();
    } catch (e: any) {
      handleFirestoreError(e, OperationType.CREATE, 'students');
    } finally {
      setIsSavingNewStudent(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedStudent || !isSuper) return;
    const newPass = prompt("Digite a nova senha para o estudante:", "123456");
    if (!newPass) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'students', selectedStudent.id), {
        password: newPass,
        updated_at: serverTimestamp()
      });
      alert("Senha resetada!");
    } catch (e: any) {
      handleFirestoreError(e, OperationType.UPDATE, `students/${selectedStudent.id}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent || !isSuper) return;
    if (!confirm(`TEM CERTEZA ABSOLUTA? Isso excluirá permanentemente ${selectedStudent.name} e todo o seu histórico.`)) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'students', selectedStudent.id));
      setStudents(prev => prev.filter(s => s.id !== selectedStudent.id));
      setSelectedStudent(null);
      alert("Estudante removido.");
    } catch (e: any) {
      handleFirestoreError(e, OperationType.DELETE, `students/${selectedStudent.id}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherReplyText.trim() || !selectedChatStudentId || !teacherSubject) return;
    setIsSendingReply(true);
    try {
      const student = students.find(s => s.id === selectedChatStudentId);
      const lastStudentMsg = [...messages].reverse().find(m => m.sender_id === selectedChatStudentId && !m.is_from_teacher);
      const subjectToUse = isSuper ? (lastStudentMsg?.subject || 'filosofia') : teacherSubject;

      await addDoc(collection(db, 'messages'), {
        sender_id: selectedChatStudentId,
        sender_name: isSuper ? 'Gestão Geral' : `Prof. de ${subjectsInfo[teacherSubject as Subject]?.name}`,
        content: teacherReplyText.trim(),
        is_from_teacher: true,
        subject: subjectToUse,
        grade: student?.grade || lastStudentMsg?.grade,
        school_class: student?.school_class || lastStudentMsg?.school_class,
        created_at: serverTimestamp()
      });
      setTeacherReplyText('');
    } catch (e: any) {
      handleFirestoreError(e, OperationType.CREATE, 'messages');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleSaveManualFeedback = async () => {
    if (!viewingSubmission || !manualFeedback.trim()) return;
    setIsSavingManualFeedback(true);
    try {
      await updateDoc(doc(db, 'submissions', viewingSubmission.id), {
        teacher_feedback: manualFeedback.trim(),
        updated_at: serverTimestamp()
      });
      
      setSubmissions(prev => prev.map(s => s.id === viewingSubmission.id ? { ...s, teacher_feedback: manualFeedback.trim() } : s));
      alert("Feedback enviado ao aluno!");
      setViewingSubmission(null);
    } catch (e: any) {
      handleFirestoreError(e, OperationType.UPDATE, `submissions/${viewingSubmission.id}`);
    } finally {
      setIsSavingManualFeedback(false);
    }
  };

  const handleGenerateExam = async () => {
    if (!teacherSubject || isSuper) return;
    setIsGeneratingExam(true);
    setGeneratedExam(null);
    try {
      const subjectName = subjectsInfo[teacherSubject as Subject]?.name || "";
      const gradeData = curriculumData.find(g => g.id === Number(examGrade));
      const bimesterData = gradeData?.bimesters.find(b => b.id === Number(examBimester));
      const topics = bimesterData?.lessons.filter(l => l.subject === teacherSubject).map(l => l.title) || [];
      if (topics.length === 0) throw new Error("Sem lições para este período.");
      const result = await generateBimonthlyEvaluation(subjectName, examGrade, examBimester, topics);
      setGeneratedExam(result);
    } catch (e: any) {
      alert("IA Falhou: " + e.message);
    } finally {
      setIsGeneratingExam(false);
    }
  };

  const handlePublishExam = async () => {
    if (!generatedExam || !teacherSubject) return;
    setIsPublishingExam(true);
    try {
      await addDoc(collection(db, 'bimonthly_exams'), {
        subject: teacherSubject, 
        grade: Number(examGrade), 
        bimester: Number(examBimester),
        school_class: examClass === 'all' ? null : examClass, 
        questions: generatedExam.questions,
        created_at: serverTimestamp()
      });
      alert("Publicada!");
      setGeneratedExam(null);
      setActiveTab('submissions');
    } catch (e: any) {
      handleFirestoreError(e, OperationType.CREATE, 'bimonthly_exams');
    } finally {
      setIsPublishingExam(false);
    }
  };

  const handleGenerateFullReport = async () => {
    if (!teacherSubject) return;
    setIsGeneratingReport(true);
    setAiReportResult(null);
    try {
      let targetGrades: number[] = [];
      let targetNotes: string[] = [];
      let studentName = "";
      let schoolClass = filterClass !== 'all' ? filterClass : "Turma não selecionada";
      if (reportTarget === 'student') {
        const student = students.find(s => s.id === selectedReportStudent);
        if (!student) throw new Error("Selecione um aluno.");
        studentName = student.name.trim();
        schoolClass = student.school_class;
        targetGrades = submissions.filter(s => s.student_name === student.name.trim()).map(s => Number(s.score));
        
        const q = query(collection(db, 'student_notes'), where('student_id', '==', student.id), where('teacher_subject', '==', teacherSubject));
        const notesSnapshot = await getDocs(q);
        targetNotes = notesSnapshot.docs.map(n => n.data().content);
      } else {
        if (filterClass === 'all') throw new Error("Selecione uma turma.");
        targetGrades = submissions.filter(s => s.school_class === filterClass).map(s => Number(s.score));
        targetNotes = ["Relatório coletivo da turma " + filterClass];
      }
      const summary = await generatePedagogicalSummary(reportTarget === 'student' ? 'INDIVIDUAL' : 'TURMA', {
        subject: subjectsInfo[teacherSubject as Subject]?.name || "Ciências Humanas",
        grades: targetGrades, notes: targetNotes, studentName: studentName || undefined, schoolClass: schoolClass
      });
      setAiReportResult(summary);
    } catch (e: any) {
      alert("Erro: " + e.message);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const classOptions = useMemo(() => {
    const grade = filterGrade === 'all' ? examGrade : filterGrade;
    if (grade === '1') return Array.from({length: 7}, (_, i) => `13.0${i+1}`);
    if (grade === '2') return Array.from({length: 8}, (_, i) => `23.0${i+1}`);
    if (grade === '3') return Array.from({length: 9}, (_, i) => `33.0${i+1}`);
    return [];
  }, [examGrade, filterGrade]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchName = sub.student_name.toLowerCase().includes(searchTerm.toLowerCase());
      const subGrade = sub.school_class.substring(0, 1);
      const matchGrade = filterGrade === 'all' || subGrade === filterGrade;
      const matchClass = filterClass === 'all' || sub.school_class === filterClass;
      if (activeTab === 'evaluations') {
        const isExam = sub.lesson_title.startsWith('Avaliação Bimestral');
        const matchBimester = filterBimester === 'all' || sub.lesson_title.includes(`${filterBimester}º Bimestre`);
        return matchName && matchGrade && matchClass && isExam && matchBimester;
      }
      const isNormalActivity = !sub.lesson_title.startsWith('Avaliação Bimestral');
      return matchName && matchGrade && matchClass && isNormalActivity;
    });
  }, [submissions, searchTerm, filterGrade, filterClass, filterBimester, activeTab]);

  const filteredStudents = useMemo(() => {
    return students.filter(st => {
      const matchName = st.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGrade = filterGrade === 'all' || st.grade === filterGrade;
      const matchClass = filterClass === 'all' || st.school_class === filterClass;
      return matchName && matchGrade && matchClass;
    });
  }, [students, searchTerm, filterGrade, filterClass]);

  const studentsWithSubmissions = useMemo(() => {
    // Get unique student IDs from filtered submissions
    const studentIds = Array.from(new Set(filteredSubmissions.map(s => s.student_id)));
    
    return studentIds.map(id => {
      const student = students.find(st => st.id === id);
      const studentSubs = filteredSubmissions.filter(s => s.student_id === id);
      
      return {
        id,
        name: student?.name || studentSubs[0]?.student_name || 'Estudante Desconhecido',
        school_class: student?.school_class || studentSubs[0]?.school_class || 'N/A',
        grade: student?.grade || studentSubs[0]?.school_class?.substring(0, 1) || '?',
        photo_url: student?.photo_url,
        submissionCount: studentSubs.length,
        lastSubmission: studentSubs[0]?.submitted_at,
        submissions: studentSubs
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredSubmissions, students]);

  const chatSessions = useMemo(() => {
    const groups: Record<string, any> = {};
    messages.forEach(m => {
        if (!groups[m.sender_id]) {
            const student = students.find(s => s.id === m.sender_id);
            groups[m.sender_id] = { studentId: m.sender_id, studentName: m.sender_name, schoolClass: m.school_class, photoUrl: student?.photo_url, lastMessage: m.content, timestamp: m.created_at, unread: !m.is_from_teacher };
        } else {
            groups[m.sender_id].lastMessage = m.content;
            groups[m.sender_id].timestamp = m.created_at;
            if (!m.is_from_teacher) groups[m.sender_id].unread = true;
        }
    });
    return Object.values(groups).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [messages, students]);

  const selectedChatMessages = useMemo(() => messages.filter(m => m.sender_id === selectedChatStudentId), [messages, selectedChatStudentId]);

  if (!teacherSubject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 font-sans">
        <div className="bg-white p-8 rounded-[40px] shadow-2xl w-full max-w-sm border border-slate-100">
          <div className="text-center mb-8">
             <div className="w-20 h-20 bg-tocantins-blue rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-100">
                <ShieldCheck className="text-white" size={40}/>
             </div>
             <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Acesso Docente</h2>
          </div>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <select className="w-full p-4 border rounded-2xl bg-slate-50 font-bold text-slate-700 outline-none" value={selectedAccess} onChange={e => setSelectedAccess(e.target.value as any)}>
              <option value="SUPER_ADMIN">👑 Gestão Geral (Super Admin)</option>
              {Object.entries(subjectsInfo).map(([k, v]) => <option key={k} value={k}>Professor de {v.name}</option>)}
            </select>
            {selectedAccess === 'SUPER_ADMIN' && (
              <input 
                required 
                type="email" 
                placeholder="Email Administrativo" 
                className="w-full p-4 border rounded-2xl bg-slate-50 outline-none" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
            )}
            <input 
              required 
              type="password" 
              placeholder="Senha de Acesso" 
              className="w-full p-4 border rounded-2xl bg-slate-50 outline-none" 
              value={pass} 
              onChange={e => setPass(e.target.value)} 
            />
            <button type="submit" className="w-full bg-tocantins-blue text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">Acessar Painel</button>
          </form>
        </div>
      </div>
    );
  }

  const currentSubInfo = !isSuper ? subjectsInfo[teacherSubject as Subject] : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans overflow-hidden">
      
      {/* MODAL PLANO DE AULA GERADO (IA) */}
      {viewingLessonPlan && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-5xl rounded-[50px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] border-8 border-slate-50">
                <div className="p-8 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-amber-500 rounded-3xl flex items-center justify-center text-white shadow-xl">
                            <Sparkles size={28}/>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-tight">{viewingLessonPlan.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Roteiro Pedagógico Sugerido (50 Minutos)</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => window.print()} className="p-4 bg-slate-100 text-slate-500 hover:bg-tocantins-blue hover:text-white rounded-2xl transition-all shadow-sm"> <Printer size={24}/> </button>
                        <button onClick={() => setViewingLessonPlan(null)} className="p-4 bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm"> <X size={24}/> </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-10 space-y-12 bg-white print:p-0">
                    <section className="space-y-4">
                        <h4 className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest"> <Layers size={16}/> Objetivos de Aprendizagem</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {viewingLessonPlan.objectives.map((obj, i) => (
                                <li key={i} className="bg-slate-50 p-4 rounded-2xl text-sm font-bold text-slate-700 border border-slate-100 flex gap-3">
                                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] text-amber-500 shadow-sm shrink-0">{i+1}</span>
                                    {obj}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="space-y-6">
                        <h4 className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest"> <BookOpen size={16}/> Conteúdo Teórico Aprofundado</h4>
                        <div className="prose prose-slate max-w-none bg-amber-50/30 p-10 rounded-[40px] border border-amber-100/50 text-slate-700 leading-relaxed text-lg italic font-serif">
                            {viewingLessonPlan.theory}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h4 className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest"> <Clock size={16}/> Metodologia e Divisão do Tempo</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="text-[10px] font-black text-tocantins-blue uppercase mb-2">Introdução (10 min)</div>
                                <p className="text-sm font-medium text-slate-600">{viewingLessonPlan.methodology.introduction}</p>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                                <div className="text-[10px] font-black text-tocantins-blue uppercase mb-2">Desenvolvimento (30 min)</div>
                                <p className="text-sm font-medium text-slate-600">{viewingLessonPlan.methodology.development}</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="text-[10px] font-black text-tocantins-blue uppercase mb-2">Fechamento (10 min)</div>
                                <p className="text-sm font-medium text-slate-600">{viewingLessonPlan.methodology.conclusion}</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h4 className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest"> <Wand2 size={16}/> Sugestão de Atividade Prática</h4>
                        <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10"> <Sparkles size={80}/> </div>
                            <p className="text-lg font-bold leading-relaxed relative z-10">{viewingLessonPlan.suggestedActivity}</p>
                        </div>
                    </section>
                </div>
                <div className="p-6 border-t bg-slate-50 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Este roteiro foi gerado por IA para apoio docente • Customize conforme sua realidade local.</p>
                </div>
            </div>
        </div>
      )}

      {/* MODAL CRIAR ESTUDANTE (SUPER ADMIN) */}
      {isCreatingStudent && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <h3 className="font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2"> <UserPlus size={20} className="text-tocantins-blue"/> Novo Estudante</h3>
                    <button onClick={() => setIsCreatingStudent(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={24}/></button>
                </div>
                <form onSubmit={handleCreateStudent} className="p-8 space-y-4">
                    <input required placeholder="Nome Completo" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-tocantins-blue/20" value={newStudentData.name} onChange={e => setNewStudentData({...newStudentData, name: e.target.value})} />
                    <input required type="email" placeholder="E-mail de Acesso" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-tocantins-blue/20" value={newStudentData.email} onChange={e => setNewStudentData({...newStudentData, email: e.target.value})} />
                    <input required type="password" placeholder="Senha Inicial" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-tocantins-blue/20" value={newStudentData.password} onChange={e => setNewStudentData({...newStudentData, password: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                        <select className="p-4 bg-slate-50 border rounded-2xl outline-none" value={newStudentData.grade} onChange={e => setNewStudentData({...newStudentData, grade: e.target.value})}>
                            <option value="1">1ª Série</option>
                            <option value="2">2ª Série</option>
                            <option value="3">3ª Série</option>
                        </select>
                        <select required className="p-4 bg-slate-50 border rounded-2xl outline-none" value={newStudentData.school_class} onChange={e => setNewStudentData({...newStudentData, school_class: e.target.value})}>
                            <option value="">Turma</option>
                            {newStudentData.grade === '1' && Array.from({length: 7}, (_, i) => `13.0${i+1}`).map(c => <option key={c} value={c}>{c}</option>)}
                            {newStudentData.grade === '2' && Array.from({length: 8}, (_, i) => `23.0${i+1}`).map(c => <option key={c} value={c}>{c}</option>)}
                            {newStudentData.grade === '3' && Array.from({length: 9}, (_, i) => `33.0${i+1}`).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <button type="submit" disabled={isSavingNewStudent} className="w-full bg-tocantins-blue text-white p-5 rounded-2xl font-black uppercase text-xs shadow-xl flex items-center justify-center gap-2">
                        {isSavingNewStudent ? <Loader2 className="animate-spin"/> : <Save size={20}/>} Criar Cadastro
                    </button>
                </form>
            </div>
        </div>
      )}

      {/* MODAL DETALHES DA SUBMISSÃO */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="font-black text-slate-800 uppercase tracking-tighter">Detalhes do Envio</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{viewingSubmission.student_name} • {viewingSubmission.lesson_title}</p>
                    </div>
                    <button onClick={() => setViewingSubmission(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={24}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div className="space-y-6">
                        <h4 className="font-black text-slate-800 text-sm uppercase flex items-center gap-2"> <ListChecks size={18} className="text-tocantins-blue"/> Respostas do Estudante </h4>
                        <div className="grid grid-cols-1 gap-4">
                            {viewingSubmission.content?.map((item: any, i: number) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Pergunta {i+1}: {item.question}</p>
                                    <p className="text-sm font-bold text-slate-700 italic">R: "{item.answer}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-black text-slate-800 text-sm uppercase flex items-center gap-2"> <Sparkles size={18} className="text-purple-500"/> Análise Automática (IA) </h4>
                            <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 text-xs text-purple-900 leading-relaxed italic">
                                "{viewingSubmission.ai_feedback?.generalComment || 'Análise não disponível.'}"
                                <div className="mt-4 pt-4 border-t border-purple-200 font-black uppercase text-[10px]">Nota Sugerida: {viewingSubmission.score?.toFixed(1)}</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-slate-800 text-sm uppercase flex items-center gap-2"> <MessageSquareQuote size={18} className="text-amber-500"/> Seu Feedback (Manual) </h4>
                            <div className="space-y-3">
                                <textarea value={manualFeedback} onChange={e => setManualFeedback(e.target.value)} placeholder="Escreva orientações pedagógicas..." className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm h-32 focus:border-tocantins-blue outline-none transition-all" />
                                <button onClick={handleSaveManualFeedback} disabled={isSavingManualFeedback || !manualFeedback.trim()} className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                                    {isSavingManualFeedback ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Salvar e Enviar p/ Aluno
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* MODAL FICHA DO ESTUDANTE (CARÔMETRO) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                    <h3 className="font-black text-slate-800 uppercase tracking-tighter">Ficha do Estudante</h3>
                    <button onClick={() => setSelectedStudent(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={24}/></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div className="flex items-center gap-6">
                        <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-slate-100">
                            <StudentAvatar studentId={selectedStudent.id} studentName={selectedStudent.name} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{selectedStudent.name}</h4>
                            <p className="text-indigo-600 font-black text-xs uppercase tracking-widest">{selectedStudent.grade}ª Série • Turma {selectedStudent.school_class}</p>
                            <p className="text-slate-400 text-xs font-bold mt-1">E-mail: {selectedStudent.email}</p>
                            <div className="flex wrap gap-2 mt-4">
                                <button onClick={() => { setActiveTab('messages'); setSelectedChatStudentId(selectedStudent.id); setSelectedStudent(null); }} className="flex items-center gap-2 bg-tocantins-blue text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg"> <MessageSquare size={16}/> Chat </button>
                                {isSuper && (
                                    <>
                                        <button onClick={handleResetPassword} className="flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg"> <Key size={16}/> Resetar Senha </button>
                                        <button onClick={handleDeleteStudent} className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg"> <UserMinus size={16}/> Excluir Conta </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest flex items-center gap-2"> <ClipboardEdit size={14}/> Anotações Pedagógicas </h5>
                        <div className="flex gap-2">
                            <textarea value={studentNote} onChange={e => setStudentNote(e.target.value)} placeholder="Registre observações..." className="flex-1 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-tocantins-blue outline-none text-sm h-24" />
                            <button onClick={handleSaveNote} disabled={isSavingNote || !studentNote.trim()} className="bg-slate-900 text-white px-6 rounded-2xl font-black text-[10px] uppercase"> {isSavingNote ? <Loader2 className="animate-spin"/> : <Save size={18}/>} Salvar </button>
                        </div>
                        <div className="space-y-3 mt-6">
                            {studentNotesHistory.map((n: any) => ( 
                                <div key={n.id} className="bg-amber-50 p-4 rounded-2xl border border-amber-100 relative group/note"> 
                                    {editingNoteId === n.id ? (
                                        <div className="space-y-2">
                                            <textarea value={editingNoteContent} onChange={e => setEditingNoteContent(e.target.value)} className="w-full p-3 bg-white rounded-xl border-2 border-amber-200 outline-none text-sm focus:border-tocantins-blue" />
                                            <div className="flex gap-2">
                                                <button onClick={handleUpdateNote} className="text-[10px] bg-tocantins-blue text-white px-4 py-1.5 rounded-lg font-black uppercase shadow-sm">Salvar</button>
                                                <button onClick={() => { setEditingNoteId(null); setEditingNoteContent(''); }} className="text-[10px] bg-slate-200 text-slate-600 px-4 py-1.5 rounded-lg font-black uppercase">Cancelar</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm text-slate-700 italic">"{n.content}"</p> 
                                            <p className="text-[8px] font-black text-amber-600 uppercase mt-2">{n.created_at?.toDate ? n.created_at.toDate().toLocaleString() : new Date(n.created_at).toLocaleString()}</p>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover/note:opacity-100 transition-opacity flex gap-1">
                                                <button onClick={() => { setEditingNoteId(n.id); setEditingNoteContent(n.content); }} className="p-1.5 bg-white rounded-lg shadow-sm text-slate-400 hover:text-tocantins-blue transition-colors" title="Editar"><Pencil size={12}/></button>
                                                <button onClick={() => handleDeleteNote(n.id)} className="p-1.5 bg-white rounded-lg shadow-sm text-slate-400 hover:text-red-500 transition-colors" title="Excluir"><Trash2 size={12}/></button>
                                            </div>
                                        </>
                                    )}
                                </div> 
                            ))}
                        </div>
                    </div>

                    {/* HISTÓRICO DE ATIVIDADES */}
                    <div className="space-y-6 pt-6 border-t">
                        <h5 className="font-black text-slate-400 text-[10px] uppercase tracking-widest flex items-center gap-2"> <Layers size={14}/> Histórico de Atividades </h5>
                        
                        {(() => {
                          const studentSubs = submissions.filter(s => s.student_id === selectedStudent.id);
                          if (studentSubs.length === 0) return <p className="text-[10px] text-slate-400 uppercase font-bold text-center py-4">Nenhuma atividade enviada ainda.</p>;

                          const bimesters = ['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre', 'Atividades Extras'];
                          const groupedSubs: Record<string, any[]> = {};
                          
                          studentSubs.forEach(sub => {
                            const bim = getLessonBimester(sub.lesson_title);
                            if (!groupedSubs[bim]) groupedSubs[bim] = [];
                            groupedSubs[bim].push(sub);
                          });

                          return bimesters.map(bim => {
                            const subs = groupedSubs[bim];
                            if (!subs || subs.length === 0) return null;

                            return (
                              <div key={bim} className="space-y-3">
                                <h6 className="text-[9px] font-black text-tocantins-blue uppercase bg-blue-50 px-3 py-1 rounded-lg w-fit">{bim}</h6>
                                <div className="space-y-2">
                                  {subs.map(sub => (
                                    <div key={sub.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center hover:border-tocantins-blue transition-colors group">
                                      <div>
                                        <p className="text-xs font-bold text-slate-800">{sub.lesson_title}</p>
                                        <p className="text-[8px] text-slate-400 font-black uppercase mt-1">
                                          {sub.submitted_at?.toDate ? sub.submitted_at.toDate().toLocaleDateString() : new Date(sub.submitted_at).toLocaleDateString()}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="text-right">
                                          <p className="text-[7px] font-black text-slate-400 uppercase">Nota</p>
                                          <p className="text-xs font-black text-tocantins-blue">{sub.score?.toFixed(1)}</p>
                                        </div>
                                        <button 
                                          onClick={() => { setViewingSubmission(sub); setManualFeedback(sub.teacher_feedback || ''); }}
                                          className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover:bg-tocantins-blue group-hover:text-white transition-all"
                                        >
                                          <Eye size={14}/>
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          });
                        })()}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-full lg:w-72 bg-slate-900 text-white p-6 flex flex-col shrink-0 border-r border-white/5">
        <div className="mb-10 text-center">
           <div className={`w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center text-3xl shadow-2xl overflow-hidden border-2 border-white/10 ${isSuper ? 'bg-amber-500' : currentSubInfo?.color}`}>
             {teacherPhoto ? <img src={teacherPhoto} className="w-full h-full object-cover"/> : (isSuper ? '👑' : currentSubInfo?.icon)}
           </div>
           <h2 className="font-black text-sm uppercase tracking-tight">{isSuper ? 'Super Admin' : `Prof. ${currentSubInfo?.name}`}</h2>
           {!isSuper && <button onClick={() => setActiveTab('teacher_profile')} className="mt-2 text-[8px] font-black text-slate-500 uppercase tracking-widest hover:text-tocantins-yellow transition-colors">Editar Minha Foto</button>}
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          <button onClick={() => setActiveTab('submissions')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'submissions' ? 'bg-tocantins-blue text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <BookOpen size={18}/> Atividades Diárias </button>
          <button onClick={() => setActiveTab('lessons_list')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'lessons_list' ? 'bg-amber-500 text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <Library size={18}/> Plano de Aulas </button>
          <button onClick={() => setActiveTab('question_bank')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'question_bank' ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <Database size={18}/> Banco de Questões </button>
          {!isSuper && ( <button onClick={() => setActiveTab('exam_generator')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'exam_generator' ? 'bg-purple-600 text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <BrainCircuit size={18}/> Gerar Avaliação </button> )}
          <button onClick={() => setActiveTab('students')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'students' ? 'bg-tocantins-blue text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <Users size={18}/> Carômetro </button>
          <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'reports' ? 'bg-tocantins-blue text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <BarChart3 size={18}/> Relatórios (IA) </button>
          <button onClick={() => setActiveTab('evaluations')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'evaluations' ? 'bg-tocantins-blue text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <Award size={18}/> Notas Bimestrais </button>
          <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 p-4 rounded-2xl text-xs font-black uppercase transition-all ${activeTab === 'messages' ? 'bg-tocantins-blue text-white shadow-xl' : 'text-slate-400 hover:bg-white/5'}`}> <MessageSquare size={18}/> Chat e Alertas </button>
        </nav>
        
        <button onClick={handleExitAdmin} className="w-full flex items-center justify-center gap-2 p-5 text-slate-300 bg-white/5 hover:bg-red-500/20 hover:text-red-300 rounded-2xl transition-all text-xs font-black uppercase mt-8 border border-white/10"> <Home size={18}/> Sair do Painel </button>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b p-6 flex justify-between items-center z-10 shadow-sm no-print">
           <h1 className="text-xl font-black text-slate-800 uppercase tracking-tighter">
             {activeTab === 'teacher_profile' ? 'Perfil' : activeTab === 'reports' ? 'Relatórios IA' : activeTab === 'lessons_list' ? 'Plano de Aulas' : activeTab === 'messages' ? 'Chat' : activeTab === 'exam_generator' ? 'Gerador de Provas' : 'Gestão'}
           </h1>
           <div className="flex gap-2">
             {activeTab === 'students' && isSuper && (
                <button onClick={() => setIsCreatingStudent(true)} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase shadow-lg shadow-green-100 hover:scale-105 transition-all"> <UserPlus size={18}/> Novo Aluno </button>
             )}
             <button onClick={loadData} className="p-3 text-slate-400 hover:text-tocantins-blue bg-slate-100 rounded-xl transition-all"> <RefreshCw size={20} className={loading ? 'animate-spin' : ''}/> </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50">
           
           {/* ABA: PERFIL */}
           {activeTab === 'teacher_profile' && (
              <div className="max-w-md mx-auto bg-white p-8 rounded-[40px] shadow-xl border border-slate-100 animate-in zoom-in-95">
                  <div className="text-center space-y-6">
                      <div className={`w-40 h-40 rounded-[48px] overflow-hidden border-4 border-tocantins-blue shadow-2xl bg-slate-100 mx-auto`}>
                          {teacherPhoto ? <img src={teacherPhoto} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-4xl">👨‍🏫</div>}
                      </div>
                      <h3 className="text-xl font-black text-slate-800 uppercase">Prof. de {subjectsInfo[teacherSubject as Subject]?.name || 'Área'}</h3>
                      <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-tocantins-blue transition-all cursor-pointer text-[10px] font-black uppercase">
                              <Upload size={18}/> Arquivo
                              <input type="file" accept="image/*" className="hidden" onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => setTeacherPhoto(reader.result as string);
                                      reader.readAsDataURL(file);
                                  }
                              }}/>
                          </label>
                          <button onClick={() => setShowCamera(true)} className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-tocantins-blue transition-all text-[10px] font-black uppercase"> <Camera size={18}/> Câmera </button>
                      </div>
                      <button onClick={handleSaveTeacherProfile} disabled={isSavingProfile || !teacherPhoto} className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black uppercase text-xs shadow-xl flex items-center justify-center gap-2">
                          {isSavingProfile ? <Loader2 className="animate-spin"/> : <Save size={20}/>} Salvar Alterações
                      </button>
                  </div>
              </div>
           )}

           {/* FILTROS */}
           {activeTab !== 'exam_generator' && activeTab !== 'lessons_list' && activeTab !== 'messages' && activeTab !== 'teacher_profile' && activeTab !== 'reports' && (
              <div className="mb-8 bg-white p-6 rounded-[32px] shadow-sm border border-slate-200 flex flex-wrap gap-4 items-end animate-in fade-in no-print">
                 <div className="flex-1 min-w-[200px]">
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2 mb-1 block">Buscar por Nome</label>
                    <div className="relative">
                       <Search className="absolute left-4 top-3.5 text-slate-300" size={18}/>
                       <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Nome do aluno..." className="w-full pl-12 p-3.5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-tocantins-blue/20 text-sm font-medium" />
                    </div>
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2 mb-1 block">Série</label>
                    <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)} className="p-3.5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-tocantins-blue/20 text-sm font-bold min-w-[120px]">
                       <option value="all">Todas</option>
                       <option value="1">1ª Série</option>
                       <option value="2">2ª Série</option>
                       <option value="3">3ª Série</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase ml-2 mb-1 block">Turma</label>
                    <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="p-3.5 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-tocantins-blue/20 text-sm font-bold min-w-[120px]">
                       <option value="all">Todas</option>
                       {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                 </div>
              </div>
           )}

           {/* ABAS: BANCO DE QUESTÕES */}
           {activeTab === 'question_bank' && (
              <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in">
                 <div className="bg-white p-6 rounded-[32px] border shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Banco de Questões</h2>
                        <p className="text-sm text-slate-500 mt-1">Aqui estão todas as questões geradas e salvas no banco de dados. Elas podem ser reutilizadas em avaliações futuras.</p>
                      </div>
                      <button 
                        onClick={handleSeedDatabase}
                        disabled={loading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
                      >
                        {loading ? <Loader2 className="animate-spin" size={18}/> : <Database size={18}/>}
                        Popular Banco Automaticamente
                      </button>
                    </div>
                    
                    {questionBank.length === 0 ? (
                      <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 font-bold">Nenhuma questão no banco. Clique no botão acima para gerar atividades para todas as aulas.</div>
                    ) : (
                      <div className="space-y-4">
                        {questionBank.map((q) => (
                          <div key={q.id} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3 mb-3">
                               <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${q.type === 'objective' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                                 {q.type === 'objective' ? 'Objetiva' : 'Discursiva'}
                               </span>
                               <span className="text-xs font-bold text-slate-500 uppercase">{q.subject} • {q.topic}</span>
                            </div>
                            <p className="text-slate-800 font-medium">{q.question_text}</p>
                            
                            {q.type === 'objective' && q.options && (
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {Object.entries(q.options).map(([key, val]) => (
                                  <div key={key} className={`p-3 rounded-xl text-sm border ${q.correct_option === key ? 'bg-green-50 border-green-200 text-green-800 font-bold' : 'bg-white border-slate-200 text-slate-600'}`}>
                                    <span className="uppercase mr-2 opacity-50">{key})</span> {String(val)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
              </div>
           )}

           {/* ABAS: SUBMISSÕES */}
           {activeTab === 'submissions' && (
              <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in">
                {studentsWithSubmissions.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200 text-slate-400 font-bold">Nenhum envio recebido.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentsWithSubmissions.map(st => (
                      <button 
                        key={st.id} 
                        onClick={() => setSelectedStudent(st)} 
                        className="bg-white rounded-[32px] border shadow-sm p-6 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all group text-left"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-md shrink-0">
                          <StudentAvatar studentId={st.id} studentName={st.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-slate-800 uppercase text-xs truncate">{st.name}</h3>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">{st.school_class}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-blue-50 text-tocantins-blue text-[8px] font-black px-2 py-1 rounded-lg uppercase">
                              {st.submissionCount} {st.submissionCount === 1 ? 'Atividade' : 'Atividades'}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="text-slate-300 group-hover:text-tocantins-blue transition-colors" size={20}/>
                      </button>
                    ))}
                  </div>
                )}
              </div>
           )}

           {/* ABAS: CARÔMETRO (ESTUDANTES) */}
           {activeTab === 'students' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-in fade-in">
                  {filteredStudents.length === 0 ? <div className="col-span-full py-20 text-center text-slate-400 font-bold uppercase text-[10px]">Nenhum estudante cadastrado.</div> : 
                    filteredStudents.map(st => (
                      <button key={st.id} onClick={() => setSelectedStudent(st)} className="bg-white p-4 rounded-[32px] border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden text-left">
                          <div className="w-full aspect-square rounded-2xl bg-slate-100 mb-4 overflow-hidden shadow-inner border-2 border-white">
                             <StudentAvatar studentId={st.id} studentName={st.name} />
                          </div>
                          <h4 className="font-black text-slate-800 text-[10px] uppercase truncate px-1">{st.name}</h4>
                          <p className="text-[8px] font-black text-tocantins-blue uppercase mt-1">Série: {st.grade}ª • Turma: {st.school_class}</p>
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow-sm border opacity-0 group-hover:opacity-100 transition-opacity"> <Settings size={12} className="text-slate-400"/> </div>
                      </button>
                    ))
                  }
              </div>
           )}

           {/* ABAS: CHAT */}
           {activeTab === 'messages' && (
              <div className="max-w-6xl mx-auto h-full flex flex-col animate-in fade-in">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden h-[calc(100vh-160px)]">
                    <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden flex flex-col shadow-sm">
                        <div className="p-5 border-b bg-slate-50"> <h3 className="font-black text-slate-800 uppercase text-xs tracking-widest">Conversas</h3> </div>
                        <div className="flex-1 overflow-y-auto divide-y">
                            {chatSessions.length === 0 ? <div className="p-10 text-center text-slate-400 text-[10px] font-bold uppercase">Sem conversas ativas.</div> : 
                                chatSessions.map(session => (
                                    <button key={session.studentId} onClick={() => setSelectedChatStudentId(session.studentId)} className={`w-full p-4 flex items-center gap-4 transition-colors text-left hover:bg-slate-50 ${selectedChatStudentId === session.studentId ? 'bg-blue-50 border-r-4 border-tocantins-blue' : ''}`}>
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden border"> 
                                            <StudentAvatar studentId={session.studentId} studentName={session.studentName} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1"> <h4 className="font-black text-slate-800 text-[10px] uppercase truncate">{session.studentName}</h4> <span className="text-[8px] text-slate-400 font-bold">{new Date(session.timestamp).toLocaleDateString()}</span> </div>
                                            <p className="text-[10px] text-slate-500 font-medium truncate">{session.lastMessage}</p>
                                        </div>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white rounded-[32px] border border-slate-200 overflow-hidden flex flex-col shadow-sm">
                        {selectedChatStudentId ? (
                            <>
                                <div className="p-4 border-b bg-slate-50 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden"> 
                                        <StudentAvatar studentId={selectedChatStudentId} studentName={students.find(s => s.id === selectedChatStudentId)?.name || ''} />
                                    </div>
                                    <h4 className="font-black text-slate-800 text-xs uppercase">{students.find(s => s.id === selectedChatStudentId)?.name}</h4>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                                    {selectedChatMessages.map(m => (
                                        <div key={m.id} className={`flex ${m.is_from_teacher ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-4 rounded-3xl shadow-sm text-sm ${m.is_from_teacher ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}`}>
                                                <p className="font-medium leading-relaxed">{m.content}</p>
                                            <p className={`text-[8px] mt-2 font-bold uppercase ${m.is_from_teacher ? 'text-slate-400' : 'text-slate-300'}`}> {m.created_at?.toDate ? m.created_at.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>
                                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
                                    <input type="text" value={teacherReplyText} onChange={e => setTeacherReplyText(e.target.value)} placeholder="Responder..." className="flex-1 p-4 bg-slate-100 rounded-2xl outline-none text-sm" disabled={isSendingReply} />
                                    <button type="submit" disabled={!teacherReplyText.trim() || isSendingReply} className="bg-tocantins-blue text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"> {isSendingReply ? <Loader2 className="animate-spin" size={20}/> : <Send size={20}/>} </button>
                                </form>
                            </>
                        ) : <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-30"> <MessageSquare size={64} className="mb-4 text-slate-300" /> <h4 className="font-black text-slate-800 uppercase text-xs">Selecione uma conversa</h4> </div> }
                    </div>
                 </div>
              </div>
           )}

           {/* ABAS: PLANO DE AULAS */}
           {activeTab === 'lessons_list' && (
              <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in">
                 {curriculumData.map(grade => (
                    <div key={grade.id} className="space-y-4">
                       <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm ml-4">{grade.title} - {grade.description}</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                          {grade.bimesters.map(b => (
                             <div key={b.id} className="bg-white p-5 rounded-[32px] border shadow-sm flex flex-col">
                                <h4 className="font-black text-tocantins-blue text-xs uppercase mb-4">{b.title}</h4>
                                <div className="space-y-2 flex-1">
                                   {b.lessons.filter(l => isSuper || l.subject === teacherSubject).map(l => (
                                      <div key={l.id} className="flex items-center gap-2">
                                        <button 
                                          onClick={() => handleViewLessonPlan(l, grade.id)}
                                          disabled={isGeneratingPlan}
                                          className="flex-1 text-left group transition-all"
                                        >
                                          <div className="text-[10px] font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2 group-hover:bg-amber-50 group-hover:border-amber-200 group-hover:-translate-y-0.5 transition-all">
                                             <div className="w-1.5 h-1.5 rounded-full bg-tocantins-blue mt-1.5 shrink-0 group-hover:bg-amber-500"></div>
                                             <span className="whitespace-normal break-words leading-tight group-hover:text-amber-900">{l.title}</span>
                                          </div>
                                        </button>
                                        <button
                                          onClick={() => handleGenerateAndSaveActivity(l)}
                                          disabled={isGeneratingActivityFor === l.id || savedActivities.includes(l.id)}
                                          className={`p-2 rounded-xl border transition-all ${savedActivities.includes(l.id) ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'}`}
                                          title={savedActivities.includes(l.id) ? 'Atividade já salva no banco' : 'Gerar Atividade com IA e Salvar'}
                                        >
                                          {isGeneratingActivityFor === l.id ? <Loader2 size={16} className="animate-spin" /> : savedActivities.includes(l.id) ? <CheckCircle2 size={16} /> : <Sparkles size={16} />}
                                        </button>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 ))}
              </div>
           )}

           {/* ABAS: GERADOR DE PROVAS */}
           {activeTab === 'exam_generator' && !isSuper && (
              <div className="max-w-4xl mx-auto animate-in zoom-in-95">
                 <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-3xl flex items-center justify-center shadow-inner"> <BrainCircuit size={32}/> </div>
                       <div> <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Simulados IA</h2> <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Criação de avaliações estilo ENEM</p> </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                       <div> <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Série</label> <select value={examGrade} onChange={e => setExamGrade(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none ring-1 ring-slate-100"> <option value="1">1ª Série</option> <option value="2">2ª Série</option> <option value="3">3ª Série</option> </select> </div>
                       <div> <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Bimestre</label> <select value={examBimester} onChange={e => setExamBimester(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none ring-1 ring-slate-100"> <option value="1">1º Bimestre</option> <option value="2">2º Bimestre</option> <option value="3">3º Bimestre</option> <option value="4">4º Bimestre</option> </select> </div>
                       <div> <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Turma</label> <select value={examClass} onChange={e => setExamClass(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none ring-1 ring-slate-100"> <option value="all">Todas</option> {classOptions.map(c => <option key={c} value={c}>{c}</option>)} </select> </div>
                    </div>
                    {!generatedExam ? (
                       <button onClick={handleGenerateExam} disabled={isGeneratingExam} className="w-full bg-purple-600 text-white p-6 rounded-3xl font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-3"> {isGeneratingExam ? <Loader2 className="animate-spin"/> : <Wand2 size={20}/>} {isGeneratingExam ? 'Gerando questões...' : 'Gerar Prova'} </button>
                    ) : (
                       <div className="space-y-6">
                          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100"> <h3 className="font-black text-slate-800 uppercase mb-4 border-b pb-2">Pré-visualização</h3> <div className="space-y-4"> {generatedExam.questions.map((q, i) => ( <div key={i} className="text-xs"> <p className="font-black text-purple-600 mb-1">Questão {i+1}</p> <p className="text-slate-600 italic">"{q.questionText}"</p> </div> ))} </div> </div>
                          <div className="flex gap-4">
                             <button onClick={handlePublishExam} disabled={isPublishingExam} className="flex-1 bg-tocantins-blue text-white p-5 rounded-3xl font-black uppercase text-xs flex items-center justify-center gap-2"> {isPublishingExam ? <Loader2 className="animate-spin"/> : <CheckCircle2 size={18}/>} Publicar </button>
                             <button onClick={() => setGeneratedExam(null)} className="flex-1 bg-slate-100 text-slate-600 p-5 rounded-3xl font-black uppercase text-xs"> Descartar </button>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           )}

           {/* ABAS: RELATÓRIOS (IA) */}
           {activeTab === 'reports' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
                 <div className="bg-white p-8 rounded-[40px] shadow-xl border border-slate-100">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center shadow-inner"> <BarChart3 size={32}/> </div>
                       <div> <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Relatórios Pedagógicos</h2> <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Análise de desempenho assistida por IA</p> </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                       <div> <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Tipo de Relatório</label> <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl"> <button onClick={() => setReportTarget('student')} className={`flex-1 p-3 rounded-xl font-black text-[10px] uppercase transition-all ${reportTarget === 'student' ? 'bg-white shadow-md text-tocantins-blue' : 'text-slate-400'}`}>Individual</button> <button onClick={() => setReportTarget('class')} className={`flex-1 p-3 rounded-xl font-black text-[10px] uppercase transition-all ${reportTarget === 'class' ? 'bg-white shadow-md text-tocantins-blue' : 'text-slate-400'}`}>Por Turma</button> </div> </div>
                       {reportTarget === 'student' ? ( <div> <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Escolher Aluno</label> <select value={selectedReportStudent} onChange={e => setSelectedReportStudent(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none ring-1 ring-slate-100"> <option value="">Selecione...</option> {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.school_class})</option>)} </select> </div> ) : ( <div> <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">Escolher Turma</label> <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none ring-1 ring-slate-100"> <option value="all">Selecione...</option> {classOptions.map(c => <option key={c} value={c}>{c}</option>)} </select> </div> )}
                    </div>
                    <button onClick={handleGenerateFullReport} disabled={isGeneratingReport} className="w-full bg-tocantins-blue text-white p-6 rounded-3xl font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-3"> {isGeneratingReport ? <Loader2 className="animate-spin"/> : <Sparkles size={20}/>} {isGeneratingReport ? 'Processando dados...' : 'Gerar Relatório'} </button>
                 </div>
                 {aiReportResult && (
                    <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100 animate-in slide-in-from-bottom-4">
                       <div className="flex justify-between items-center mb-8"> <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Parecer do Sistema</h3> <button onClick={() => window.print()} className="p-3 bg-slate-100 rounded-xl text-slate-500 hover:text-tocantins-blue transition-colors"> <Printer size={20}/> </button> </div>
                       <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-wrap"> {aiReportResult} </div>
                    </div>
                 )}
              </div>
           )}

           {/* ABAS: NOTAS BIMESTRAIS */}
           {activeTab === 'evaluations' && (
              <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in">
                 <div className="bg-white rounded-[40px] border overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50 border-b">
                          <tr> <th className="p-6 text-[10px] font-black text-slate-400 uppercase">Estudante</th> <th className="p-6 text-[10px] font-black text-slate-400 uppercase">Avaliação</th> <th className="p-6 text-[10px] font-black text-slate-400 uppercase">Turma</th> <th className="p-6 text-[10px] font-black text-slate-400 uppercase text-center">Nota</th> <th className="p-6 text-[10px] font-black text-slate-400 uppercase text-right">Ação</th> </tr>
                       </thead>
                       <tbody className="divide-y">
                          {filteredSubmissions.length === 0 ? <tr><td colSpan={5} className="p-20 text-center text-slate-300 font-bold">Nenhum resultado.</td></tr> : 
                             filteredSubmissions.map(sub => (
                                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                                   <td className="p-6"> 
                                      <div className="flex items-center gap-3"> 
                                          <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden"> 
                                              <StudentAvatar studentId={students.find(s => s.name.trim() === sub.student_name)?.id} studentName={sub.student_name} />
                                          </div> 
                                          <span className="text-xs font-bold text-slate-700 uppercase">{sub.student_name}</span> 
                                      </div> 
                                   </td>
                                   <td className="p-6"> <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">{sub.lesson_title}</span> </td>
                                   <td className="p-6 text-xs font-bold text-slate-500 uppercase">{sub.school_class}</td>
                                   <td className="p-6"> <div className="w-10 h-10 rounded-xl bg-tocantins-blue text-white flex items-center justify-center font-black mx-auto shadow-lg shadow-blue-100">{sub.score?.toFixed(1)}</div> </td>
                                   <td className="p-6 text-right"> <button onClick={() => { setViewingSubmission(sub); setManualFeedback(sub.teacher_feedback || ''); }} className="p-3 bg-slate-100 text-slate-500 hover:bg-tocantins-blue hover:text-white rounded-xl transition-all"> <Eye size={18}/> </button> </td>
                                </tr>
                             ))
                          }
                       </tbody>
                    </table>
                 </div>
              </div>
           )}

        </div>
      </main>

      {/* OVERLAY DE CARREGAMENTO DA IA */}
      {isGeneratingPlan && (
        <div className="fixed inset-0 z-[300] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center text-white animate-bounce shadow-xl">
                    <Sparkles size={32}/>
                </div>
                <div className="text-center">
                    <h3 className="font-black text-slate-800 uppercase tracking-tighter">Preparando Aula Pronta</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">A IA está escrevendo o roteiro de 50 min...</p>
                </div>
                <Loader2 className="animate-spin text-amber-500" size={24}/>
            </div>
        </div>
      )}
    </div>
  );
};