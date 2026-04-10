
import React, { useState, useEffect } from 'react';
import { BookOpen, Home, History, MessageCircle, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, logoutStudent } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (student) {
      fetchUnreadCount(student.id);
    }
  }, [student, location.pathname]);

  const fetchUnreadCount = async (studentId: string) => {
    try {
      const { data } = await supabase
        .from('messages')
        .select('id')
        .eq('sender_id', studentId)
        .eq('is_from_teacher', true)
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (data && data.length > 0 && location.pathname !== '/contact') {
        setUnreadCount(1);
      } else {
        setUnreadCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExit = () => {
    logoutStudent();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-[100]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
          <BookOpen className="w-7 h-7 text-tocantins-yellow" />
          <div className="hidden xs:block">
            <h1 className="text-lg font-bold leading-tight">Ciências Humanas</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Ensino Médio</p>
          </div>
        </Link>

        {student && (
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              to="/contact" 
              className={`relative p-2 rounded-lg transition-colors ${location.pathname === '/contact' ? 'bg-tocantins-blue text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
            >
              <MessageCircle size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-black flex items-center justify-center rounded-full border-2 border-slate-900">
                  !
                </span>
              )}
            </Link>

            <Link 
              to="/my-activities" 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-xs font-bold"
            >
              <History size={16} />
              <span className="hidden md:inline">Histórico</span>
            </Link>

            <div className="flex items-center gap-2 border-l border-white/10 pl-2 sm:pl-4">
              <Link to="/profile" className="flex items-center gap-2 group">
                <div className="hidden sm:flex flex-col items-end mr-1">
                  <span className="text-[10px] font-bold text-white group-hover:text-tocantins-yellow transition-colors truncate max-w-[100px]">{student.name.split(' ')[0]}</span>
                  <span className="text-[8px] text-slate-500">{student.school_class}</span>
                </div>
                <img src={student.photo_url} className="w-8 h-8 rounded-full border border-tocantins-yellow object-cover shadow-sm group-hover:ring-2 group-hover:ring-tocantins-yellow transition-all" alt="Perfil" />
              </Link>
              
              <button 
                onClick={handleExit}
                className="p-2 ml-1 hover:bg-red-500/20 rounded-lg transition-all text-slate-400 hover:text-red-400 flex items-center justify-center cursor-pointer"
                title="Sair"
              >
                <Home size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
