
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2, User, Lock, Camera, Upload, X, Check, Chrome, Eye, EyeOff } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

import { TEACHER_EMAILS, ADMIN_PASSWORDS } from '../data_admin';
import { Subject } from '../types';

export const Login: React.FC<{ adminMode?: boolean }> = ({ adminMode = false }) => {
  const { student, loginStudent, loginTeacher } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(adminMode);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();

  const [photo, setPhoto] = useState<string | null>(null);
  const [googleUserPending, setGoogleUserPending] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async () => {
    if (!formData.email) {
      alert("Por favor, digite seu e-mail para solicitar a redefinição de senha.");
      return;
    }
    try {
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, formData.email);
      alert("Um link de redefinição de senha foi enviado para o seu e-mail. Verifique também a pasta de spam.");
    } catch (err: any) {
      alert("Erro ao enviar redefinição: " + err.message);
    }
  };

  // Redirect if already logged in and profile is complete
  React.useEffect(() => {
    if (student && !googleUserPending && student.grade && !isAdminLogin) {
      navigate('/');
    }
  }, [student, googleUserPending, navigate, isAdminLogin]);

  const [adminData, setAdminData] = useState({
    email: '',
    password: ''
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    school_class: '',
    grade: '1'
  });

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Check if it's the super admin
    if (adminData.email === 'admin@admin.com' && adminData.password === 'admin123') {
       // This is a mock super admin for demo, in real case would use Firebase Auth
       // But for now let's just use the teacher login logic
       loginTeacher('filosofia' as Subject); // Default to one subject for super admin mock
       navigate('/admin');
       setLoading(false);
       return;
    }

    // Check subjects
    let foundSubject: Subject | null = null;
    Object.entries(TEACHER_EMAILS).forEach(([subject, email]) => {
      if (email === adminData.email) {
        foundSubject = subject as Subject;
      }
    });

    if (foundSubject && ADMIN_PASSWORDS[foundSubject] === adminData.password) {
      loginTeacher(foundSubject);
      navigate('/admin');
    } else {
      alert("Credenciais de administrador inválidas.");
    }
    setLoading(false);
  };
  
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Não foi possível acessar a câmera.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPhoto(dataUrl);
      stopCamera();
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Verifica se o aluno já existe no Firestore
      const studentDoc = await getDoc(doc(db, 'students', user.uid));
      if (studentDoc.exists()) {
        loginStudent({ id: user.uid, ...studentDoc.data() });
        navigate('/');
      } else {
        // Novo usuário, precisa escolher série e turma
        setGoogleUserPending(user);
      }
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        console.error("Google Login Error:", err);
        alert("Erro no acesso com Google: " + (err.message || "Erro desconhecido"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteGoogleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleUserPending || !formData.school_class) return;
    setLoading(true);
    try {
      const studentData = {
        name: googleUserPending.displayName || 'Aluno',
        email: googleUserPending.email,
        grade: formData.grade,
        school_class: formData.school_class,
        photo_url: googleUserPending.photoURL,
        role: 'student',
        created_at: serverTimestamp()
      };
      
      await setDoc(doc(db, 'students', googleUserPending.uid), studentData);
      
      // Update context state immediately to avoid race conditions
      loginStudent({ id: googleUserPending.uid, ...studentData });
      
      navigate('/');
    } catch (err: any) {
      console.error("Complete registration error:", err);
      alert("Erro ao concluir cadastro: " + (err.message || "Tente novamente."));
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        if (!photo) throw new Error("A foto é obrigatória para o cadastro.");
        
        // 1. Criar usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const studentData = {
          name: formData.name,
          email: formData.email,
          school_class: formData.school_class,
          grade: formData.grade,
          photo_url: photo,
          role: 'student',
          created_at: serverTimestamp()
        };

        // 2. Salvar dados no Firestore
        await setDoc(doc(db, 'students', user.uid), studentData);
        
        // Update context state immediately
        loginStudent({ id: user.uid, ...studentData });
        
        alert("Cadastro realizado com sucesso!");
        navigate('/');
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        // signIn handles redirection via AuthContext + onAuthStateChanged
        // but we keep the manual navigate as back up
        navigate('/');
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        alert("E-mail ou senha incorretos. Por favor, verifique seus dados ou use o botão 'Esqueceu a senha?'.");
      } else if (err.code === 'auth/email-already-in-use') {
        alert("Este e-mail já está em uso. Se você já tem uma conta, faça login.");
      } else {
        alert(err.message || "Ocorreu um erro no acesso.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getClassesByGrade = (grade: string) => {
    if (grade === '1') return Array.from({length: 7}, (_, i) => `13.0${i+1}`);
    if (grade === '2') return Array.from({length: 8}, (_, i) => `23.0${i+1}`);
    if (grade === '3') return Array.from({length: 9}, (_, i) => `33.0${i+1}`);
    return [];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="text-center mb-8">
          <div className="bg-tocantins-blue dark:bg-tocantins-yellow w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100 dark:shadow-none">
            <GraduationCap className="w-10 h-10 text-white dark:text-slate-950" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
            {googleUserPending ? 'Completar Perfil' : isAdminLogin ? 'Acesso Administrativo' : isRegistering ? 'Novo Cadastro' : 'Portal do Aluno'}
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Ciências Humanas - Tocantins</p>
        </div>

        {googleUserPending ? (
          <form onSubmit={handleCompleteGoogleRegistration} className="space-y-6">
            <div className="text-center mb-6">
              <img src={googleUserPending.photoURL} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-tocantins-blue dark:border-tocantins-yellow shadow-lg" alt="Google Profile" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Olá, {googleUserPending.displayName}!</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-1">Selecione sua turma para continuar</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl text-sm outline-none dark:text-white transition-colors" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                  <option value="1">1ª Série</option>
                  <option value="2">2ª Série</option>
                  <option value="3">3ª Série</option>
                </select>
                <select required className="w-full p-4 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl text-sm outline-none dark:text-white transition-colors" value={formData.school_class} onChange={e => setFormData({...formData, school_class: e.target.value})}>
                  <option value="">Turma</option>
                  {getClassesByGrade(formData.grade).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <button disabled={loading} className="w-full bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 p-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-100 dark:shadow-none flex justify-center items-center gap-2 cursor-pointer active:scale-95 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : 'Concluir Cadastro'}
            </button>
            
            <button type="button" onClick={() => setGoogleUserPending(null)} className="w-full text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-4 hover:text-red-500 transition-colors">
              Cancelar e voltar
            </button>
          </form>
        ) : isAdminLogin ? (
          <form onSubmit={handleAdminAuth} className="space-y-4">
             <div className="space-y-3">
                <div className="relative">
                  <input required type="email" placeholder="E-mail do Professor" className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue transition-colors" value={adminData.email} onChange={e => setAdminData({...adminData, email: e.target.value})} />
                  <User className="absolute left-4 top-4 text-slate-300 dark:text-slate-600" size={18} />
                </div>
                <div className="relative">
                  <input required type={showPassword ? "text" : "password"} placeholder="Senha de Acesso" className="w-full p-4 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue transition-colors" value={adminData.password} onChange={e => setAdminData({...adminData, password: e.target.value})} />
                  <Lock className="absolute left-4 top-4 text-slate-300 dark:text-slate-600" size={18} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 hover:text-tocantins-blue transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button disabled={loading} className="w-full bg-slate-900 dark:bg-tocantins-yellow text-white dark:text-slate-950 p-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl flex justify-center items-center gap-2 cursor-pointer active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" /> : 'Acessar Painel'}
              </button>

              <div className="mt-8 text-center border-t dark:border-slate-800 pt-6">
                <button type="button" onClick={() => setIsAdminLogin(false)} className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-tocantins-blue dark:hover:text-tocantins-yellow uppercase tracking-widest transition-colors cursor-pointer">
                  Voltar para Portal do Aluno
                </button>
              </div>
          </form>
        ) : (
          <>
            <div className="mb-6">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 p-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
              >
                <Chrome className="w-5 h-5 text-tocantins-blue dark:text-tocantins-yellow" />
                Entrar com Google
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300 dark:text-slate-600"><span className="bg-white dark:bg-slate-900 px-4 transition-colors">ou use seu e-mail</span></div>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isRegistering && (
                 <div className="space-y-3">
                    <input required placeholder="Nome Completo" className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue transition-colors" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                        <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none transition-colors" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                          <option value="1">1ª Série</option>
                          <option value="2">2ª Série</option>
                          <option value="3">3ª Série</option>
                        </select>
                        <select required className="w-full p-4 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none transition-colors" value={formData.school_class} onChange={e => setFormData({...formData, school_class: e.target.value})}>
                          <option value="">Turma</option>
                          {getClassesByGrade(formData.grade).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">
                          <Upload size={16} /> Arquivo
                          <input type="file" accept="image/*" className="hidden" onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => setPhoto(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                        <button type="button" onClick={startCamera} className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase">
                          <Camera size={16} /> Câmera
                        </button>
                      </div>
                      
                      {photo && !showCamera && (
                        <div className="relative w-20 h-20 mx-auto group">
                          <img src={photo} className="w-full h-full object-cover rounded-2xl border-2 border-tocantins-blue dark:border-tocantins-yellow" />
                          <button type="button" onClick={() => setPhoto(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg">
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>

                    {showCamera && (
                      <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center p-4">
                        <div className="relative w-full max-w-sm aspect-square bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                          <canvas ref={canvasRef} className="hidden" />
                        </div>
                        <div className="mt-8 flex gap-4">
                          <button type="button" onClick={stopCamera} className="bg-white/10 text-white p-4 rounded-full hover:bg-white/20">
                            <X size={24} />
                          </button>
                          <button type="button" onClick={takePhoto} className="bg-tocantins-blue text-white p-6 rounded-full shadow-2xl scale-110 active:scale-95 transition-transform">
                            <Camera size={32} />
                          </button>
                        </div>
                        <p className="text-white/50 text-[10px] font-black uppercase mt-6 tracking-widest">Aponte para seu rosto</p>
                      </div>
                    )}
                 </div>
              )}

              <div className="space-y-3">
                <div className="relative">
                  <input required type="email" placeholder="E-mail" className="w-full p-4 pl-12 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <User className="absolute left-4 top-4 text-slate-300 dark:text-slate-600" size={18} />
                </div>
                <div className="relative">
                  <input required type={showPassword ? "text" : "password"} placeholder="Senha" className="w-full p-4 pl-12 pr-12 bg-slate-50 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue transition-colors" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <Lock className="absolute left-4 top-4 text-slate-300 dark:text-slate-600" size={18} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-slate-400 hover:text-tocantins-blue transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {!isRegistering && (
                  <div className="flex justify-end px-1">
                    <button type="button" onClick={handleResetPassword} className="text-[9px] font-black uppercase text-slate-400 hover:text-tocantins-blue dark:hover:text-tocantins-yellow transition-colors tracking-widest">
                      Esqueceu a senha?
                    </button>
                  </div>
                )}
              </div>

              <button disabled={loading} className="w-full bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 p-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-100 dark:shadow-none flex justify-center items-center gap-2 cursor-pointer active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" /> : isRegistering ? 'Criar Minha Conta' : 'Entrar no Portal'}
              </button>
            </form>

            <div className="mt-8 text-center border-t dark:border-slate-800 pt-6 flex flex-col gap-4">
              <button onClick={() => setIsRegistering(!isRegistering)} className="text-[10px] font-black text-slate-400 dark:text-slate-500 hover:text-tocantins-blue dark:hover:text-tocantins-yellow uppercase tracking-widest transition-colors cursor-pointer">
                {isRegistering ? 'Já tenho uma conta? Fazer Login' : 'Não tem conta? Registre-se aqui'}
              </button>
              
              {!isRegistering && (
                <button onClick={() => setIsAdminLogin(true)} className="text-[10px] font-black text-tocantins-blue dark:text-tocantins-yellow opacity-60 hover:opacity-100 uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Lock size={12} /> ÁREA DO PROFESSOR
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
