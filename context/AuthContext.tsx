
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

interface AuthContextType {
  student: any | null;
  teacherSubject: string | null;
  loginStudent: (data: any) => void;
  logoutStudent: () => void;
  updateStudentData: (newData: any) => void;
  loginTeacher: (subject: string) => void;
  logoutTeacher: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<any | null>(null);
  const [teacherSubject, setTeacherSubject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        try {
          const studentDoc = await getDoc(doc(db, 'students', user.uid));
          if (studentDoc.exists()) {
            setStudent({ id: user.uid, ...studentDoc.data() });
          } else {
            // Se o usuário existe no Auth mas não no Firestore (ex: admin logado via Google)
            setStudent({ id: user.uid, email: user.email, name: user.displayName || 'Usuário' });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `students/${user.uid}`);
          setStudent({ id: user.uid, email: user.email, name: user.displayName || 'Usuário' });
        }
      } else {
        setStudent(null);
      }
      
      const savedTeacher = sessionStorage.getItem('CHSA_TEACHER_SESSION');
      if (savedTeacher) {
        setTeacherSubject(savedTeacher);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginStudent = (data: any) => {
    // No Firebase, o login é tratado pelo onAuthStateChanged
    // Mas mantemos a função para compatibilidade se necessário passar dados extras
    setStudent(data);
  };

  const updateStudentData = (newData: any) => {
    const updated = { ...student, ...newData };
    setStudent(updated);
  };

  const logoutStudent = async () => {
    await signOut(auth);
    setStudent(null);
  };

  const loginTeacher = (subject: string) => {
    sessionStorage.setItem('CHSA_TEACHER_SESSION', subject);
    setTeacherSubject(subject);
  };

  const logoutTeacher = () => {
    sessionStorage.removeItem('CHSA_TEACHER_SESSION');
    setTeacherSubject(null);
  };

  return (
    <AuthContext.Provider value={{ 
      student, 
      teacherSubject, 
      loginStudent, 
      logoutStudent, 
      updateStudentData,
      loginTeacher, 
      logoutTeacher,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};
