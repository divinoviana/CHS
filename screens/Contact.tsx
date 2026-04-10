
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle, Loader2, UserCircle, BellRing, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { subjectsInfo } from '../data';
import { Subject } from '../types';
import { useAuth } from '../context/AuthContext';

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  // Fix: useAuth provides the correctly persisted student data and manages key names
  const { student, isLoading: isAuthLoading } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthLoading && !student) {
      navigate('/login');
    }
  }, [student, isAuthLoading, navigate]);

  useEffect(() => {
    if (!selectedSubject || !student) return;
    fetchMessages();
    const channel = supabase.channel(`chat-${student.id}-${selectedSubject}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages', filter: `sender_id=eq.${student.id}` }, 
      () => fetchMessages()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedSubject, student]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    if (!selectedSubject || !student) return;
    setLoadingMessages(true);
    const { data } = await supabase.from('messages').select('*')
      .eq('sender_id', student.id).eq('subject', selectedSubject).order('created_at', { ascending: true });
    setMessages(data || []);
    setLoadingMessages(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !student || !selectedSubject) return;
    setSending(true);
    try {
      const { error } = await supabase.from('messages').insert([{
        sender_id: student.id, sender_name: student.name,
        school_class: student.school_class, grade: student.grade,
        content: newMessage.trim(), is_from_teacher: false, subject: selectedSubject
      }]);
      if (error) throw error;
      setNewMessage('');
    } finally { setSending(false); }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-tocantins-blue rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[85vh] font-sans">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-tocantins-blue font-black text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar ao Início
        </Link>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Central de Alertas</h2>
      </div>

      {!selectedSubject ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 mb-2">
                  <p className="text-sm text-slate-500 font-bold">Escolha um professor para conversar ou ver seus alertas:</p>
              </div>
              {(Object.entries(subjectsInfo) as [Subject, any][]).map(([key, info]) => (
                  <button key={key} onClick={() => setSelectedSubject(key)} className="bg-white p-6 rounded-3xl border-2 border-transparent hover:border-tocantins-blue hover:shadow-xl transition-all text-left flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${info.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>{info.icon}</div>
                        <div>
                            <h3 className="font-bold text-slate-800">Prof. de {info.name}</h3>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Clique para abrir o chat</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-200 group-hover:text-tocantins-blue transition-colors" />
                  </button>
              ))}
          </div>
      ) : (
          <div className="bg-white rounded-[40px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[70vh] animate-in zoom-in-95 duration-300">
            <div className={`${subjectsInfo[selectedSubject].color} p-5 text-white flex items-center justify-between shadow-lg`}>
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedSubject(null)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"><ArrowLeft size={18}/></button>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20 shadow-inner"><UserCircle size={24} /></div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Prof. de {subjectsInfo[selectedSubject].name}</h3>
                  <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Canal de Dúvidas e Alertas</p>
                </div>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase hidden sm:block border border-white/10">Seguro</div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
              {loadingMessages && messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full gap-2"><Loader2 className="animate-spin text-tocantins-blue" /><p className="text-[10px] font-black text-slate-400 uppercase">Conectando...</p></div>
              ) : messages.length === 0 ? (
                <div className="text-center py-10 opacity-30"><MessageCircle className="mx-auto text-slate-300 mb-4" size={64} /><p className="text-slate-500 text-sm font-bold">Mande um "Oi" para seu professor!</p></div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.is_from_teacher ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] p-4 rounded-[26px] shadow-md text-sm leading-relaxed ${
                      msg.is_from_teacher ? 'bg-white border-l-4 border-l-tocantins-blue text-slate-700 rounded-tl-none ring-1 ring-slate-200' : 'bg-tocantins-blue text-white rounded-tr-none'
                    }`}>
                      {msg.is_from_teacher && <p className="text-[8px] font-black text-tocantins-blue uppercase mb-1 tracking-widest">Aviso do Professor</p>}
                      <p className="break-words font-medium">{msg.content}</p>
                      <p className={`text-[9px] mt-2 font-bold flex justify-end ${msg.is_from_teacher ? 'text-slate-400' : 'text-blue-200'}`}>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-5 bg-white border-t border-slate-100 flex gap-2">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Tire sua dúvida aqui..." className="flex-1 p-4 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-tocantins-blue outline-none transition" disabled={sending} />
              <button type="submit" disabled={sending || !newMessage.trim()} className="bg-tocantins-blue text-white w-14 h-14 rounded-2xl hover:bg-blue-800 transition shadow-lg flex items-center justify-center disabled:opacity-50 active:scale-90">{sending ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}</button>
            </form>
          </div>
      )}
    </div>
  );
};
