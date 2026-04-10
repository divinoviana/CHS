
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X, ArrowLeft, Loader2, Save, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const Profile: React.FC = () => {
  const { student, updateStudentData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [newPhoto, setNewPhoto] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Câmera indisponível.");
      setShowCamera(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
      setNewPhoto(canvas.toDataURL('image/jpeg'));
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
      setShowCamera(false);
    }
  };

  const handleSave = async () => {
    if (!newPhoto || !student) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('students')
        .update({ photo_url: newPhoto })
        .eq('id', student.id);

      if (error) throw error;
      updateStudentData({ photo_url: newPhoto });
      alert("Foto atualizada com sucesso!");
      setNewPhoto(null);
    } catch (err: any) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4">
      <div className="container mx-auto max-w-md bg-white rounded-[40px] shadow-xl border border-slate-200 overflow-hidden mt-8">
        <div className="p-6 border-b flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">Meu Perfil</h2>
          <div className="w-8" />
        </div>

        <div className="p-8 space-y-8 text-center">
          <div className="relative inline-block group">
            <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-tocantins-blue shadow-lg">
              <img src={newPhoto || student.photo_url} className="w-full h-full object-cover" />
            </div>
            {loading && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-[32px]">
                <Loader2 className="animate-spin text-tocantins-blue" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-800 uppercase">{student.name}</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.grade}ª Série • {student.school_class}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-tocantins-blue transition-all cursor-pointer text-[10px] font-black uppercase">
              <Upload size={16} /> Arquivo
              <input type="file" accept="image/*" className="hidden" onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setNewPhoto(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }} />
            </label>
            <button onClick={startCamera} className="flex items-center justify-center gap-2 p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-tocantins-blue transition-all text-[10px] font-black uppercase">
              <Camera size={16} /> Câmera
            </button>
          </div>

          {newPhoto && (
            <button onClick={handleSave} disabled={loading} className="w-full bg-green-600 text-white p-5 rounded-2xl font-black uppercase text-xs shadow-lg shadow-green-100 flex items-center justify-center gap-2 transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              Salvar Nova Foto
            </button>
          )}
        </div>

        {showCamera && (
          <div className="fixed inset-0 z-[200] bg-slate-900 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <div className="mt-8 flex gap-4">
              <button onClick={() => setShowCamera(false)} className="bg-white/10 text-white p-4 rounded-full">
                <X size={24} />
              </button>
              <button onClick={takePhoto} className="bg-tocantins-blue text-white p-6 rounded-full shadow-2xl scale-110">
                <Camera size={32} />
              </button>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}
      </div>
    </div>
  );
};
