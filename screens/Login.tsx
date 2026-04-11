
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2, User, Lock, Camera, Upload, X, Check, Chrome } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const { loginStudent } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    school_class: '',
    grade: '1'
  });
  
  const [photo, setPhoto] = useState<string | null>(null);
  const [googleUserPending, setGoogleUserPending] = useState<any>(null);

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
        navigate('/');
      } else {
        // Novo usuário, precisa escolher série e turma
        setGoogleUserPending(user);
      }
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        handleFirestoreError(err, OperationType.WRITE, 'auth/google');
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
      await setDoc(doc(db, 'students', googleUserPending.uid), {
        name: googleUserPending.displayName || 'Aluno',
        email: googleUserPending.email,
        grade: formData.grade,
        school_class: formData.school_class,
        photo_url: googleUserPending.photoURL,
        created_at: serverTimestamp()
      });
      navigate('/');
    } catch (err: any) {
      alert(err.message);
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

        // 2. Salvar dados no Firestore
        await setDoc(doc(db, 'students', user.uid), {
          name: formData.name,
          email: formData.email,
          school_class: formData.school_class,
          grade: formData.grade,
          photo_url: photo,
          created_at: serverTimestamp()
        });
        
        alert("Cadastro realizado com sucesso!");
        navigate('/');
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      }
    } catch (err: any) {
      alert(err.message);
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-tocantins-blue w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
            {googleUserPending ? 'Completar Perfil' : isRegistering ? 'Novo Cadastro' : 'Portal do Aluno'}
          </h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Ciências Humanas - Tocantins</p>
        </div>

        {googleUserPending ? (
          <form onSubmit={handleCompleteGoogleRegistration} className="space-y-6">
            <div className="text-center mb-6">
              <img src={googleUserPending.photoURL} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-tocantins-blue shadow-lg" alt="Google Profile" />
              <p className="text-sm font-bold text-slate-700">Olá, {googleUserPending.displayName}!</p>
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Selecione sua turma para continuar</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <select className="w-full p-4 bg-slate-50 border rounded-2xl text-sm outline-none" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                  <option value="1">1ª Série</option>
                  <option value="2">2ª Série</option>
                  <option value="3">3ª Série</option>
                </select>
                <select required className="w-full p-4 bg-slate-50 border rounded-2xl text-sm outline-none" value={formData.school_class} onChange={e => setFormData({...formData, school_class: e.target.value})}>
                  <option value="">Turma</option>
                  {getClassesByGrade(formData.grade).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <button disabled={loading} className="w-full bg-tocantins-blue text-white p-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-100 flex justify-center items-center gap-2 cursor-pointer active:scale-95 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : 'Concluir Cadastro'}
            </button>
            
            <button type="button" onClick={() => setGoogleUserPending(null)} className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4 hover:text-red-500 transition-colors">
              Cancelar e voltar
            </button>
          </form>
        ) : (
          <>
            <div className="mb-6">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 p-4 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
              >
                <Chrome className="w-5 h-5 text-tocantins-blue" />
                Entrar com Google
              </button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-[10px] uppercase font-black text-slate-300"><span className="bg-white px-4">ou use seu e-mail</span></div>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {isRegistering && (
                 <div className="space-y-3">
                    <input required placeholder="Nome Completo" className="w-full p-4 bg-slate-50 border rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <div className="grid grid-cols-2 gap-3">
                        <select className="w-full p-4 bg-slate-50 border rounded-2xl text-sm outline-none" value={formData.grade} onChange={e => setFormData({...formData, grade: e.target.value})}>
                          <option value="1">1ª Série</option>
                          <option value="2">2ª Série</option>
                          <option value="3">3ª Série</option>
                        </select>
                        <select required className="w-full p-4 bg-slate-50 border rounded-2xl text-sm outline-none" value={formData.school_class} onChange={e => setFormData({...formData, school_class: e.target.value})}>
                          <option value="">Turma</option>
                          {getClassesByGrade(formData.grade).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <label className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-2xl border-dashed border-2 border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer text-[10px] font-black text-slate-500 uppercase">
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
                        <button type="button" onClick={startCamera} className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-50 rounded-2xl border-dashed border-2 border-slate-200 hover:bg-slate-100 transition-colors text-[10px] font-black text-slate-500 uppercase">
                          <Camera size={16} /> Câmera
                        </button>
                      </div>
                      
                      {photo && !showCamera && (
                        <div className="relative w-20 h-20 mx-auto group">
                          <img src={photo} className="w-full h-full object-cover rounded-2xl border-2 border-tocantins-blue" />
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
                  <input required type="email" placeholder="E-mail" className="w-full p-4 pl-12 bg-slate-50 border rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <User className="absolute left-4 top-4 text-slate-300" size={18} />
                </div>
                <div className="relative">
                  <input required type="password" placeholder="Senha" className="w-full p-4 pl-12 bg-slate-50 border rounded-2xl text-sm outline-none focus:ring-1 focus:ring-tocantins-blue" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
                </div>
              </div>

              <button disabled={loading} className="w-full bg-tocantins-blue text-white p-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-100 flex justify-center items-center gap-2 cursor-pointer active:scale-95 transition-all">
                {loading ? <Loader2 className="animate-spin" /> : isRegistering ? 'Criar Minha Conta' : 'Entrar no Portal'}
              </button>
            </form>

            <div className="mt-8 text-center border-t pt-6">
              <button onClick={() => setIsRegistering(!isRegistering)} className="text-[10px] font-black text-slate-400 hover:text-tocantins-blue uppercase tracking-widest transition-colors cursor-pointer">
                {isRegistering ? 'Já tenho uma conta? Fazer Login' : 'Não tem conta? Registre-se aqui'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
