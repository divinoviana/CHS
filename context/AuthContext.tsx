
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const savedStudent = localStorage.getItem('CHSA_STUDENT_DATA');
    const savedTeacher = sessionStorage.getItem('CHSA_TEACHER_SESSION');

    if (savedStudent) {
      try {
        setStudent(JSON.parse(savedStudent));
      } catch (e) {
        localStorage.removeItem('CHSA_STUDENT_DATA');
      }
    }
    
    if (savedTeacher) {
      setTeacherSubject(savedTeacher);
    }
    
    setIsLoading(false);
  }, []);

  const loginStudent = (data: any) => {
    localStorage.setItem('CHSA_STUDENT_DATA', JSON.stringify(data));
    setStudent(data);
  };

  const updateStudentData = (newData: any) => {
    const updated = { ...student, ...newData };
    localStorage.setItem('CHSA_STUDENT_DATA', JSON.stringify(updated));
    setStudent(updated);
  };

  const logoutStudent = () => {
    localStorage.removeItem('CHSA_STUDENT_DATA');
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
