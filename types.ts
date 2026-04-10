export type Subject = 'filosofia' | 'geografia' | 'historia' | 'sociologia';

export interface ChartData {
  type: 'bar' | 'line' | 'pie';
  data: { name: string; value: number }[];
  title: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
  title: string;
}

export interface CrosswordData {
  grid: string[][]; // Empty cells as null or space
  clues: {
    across: { number: number; clue: string; answer: string; row: number; col: number }[];
    down: { number: number; clue: string; answer: string; row: number; col: number }[];
  };
}

export interface ActivityImage {
  url: string;
  caption: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  questions?: string[];
  image?: ActivityImage;
  chart?: ChartData;
  table?: TableData;
  crossword?: CrosswordData;
}

export interface Lesson {
  id: string;
  title: string;
  subject: Subject;
  objectives: string[];
  theory: string;
  methodology: string;
  activities: Activity[];
  reflectionQuestions: string[];
}

export interface Bimester {
  id: number;
  title: string; // Título padrão/genérico
  subjectTitles?: Record<string, string>; // Títulos específicos por matéria
  lessons: Lesson[];
}

export interface Grade {
  id: number;
  title: string;
  description: string;
  color: string;
  bimesters: Bimester[];
}

export interface Question {
  id: string;
  subject: string;
  topic: string;
  type: 'objective' | 'discursive';
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  question_text: string;
  options?: { a: string; b: string; c: string; d: string; e: string };
  correct_option?: string;
  explanation?: string;
  created_at: string;
}

export interface DBActivity {
  id: string;
  lesson_id: string;
  title: string;
  created_at: string;
  questions?: Question[];
}

export interface ActivitySubmission {
  id: string;
  student_id: string;
  activity_id: string;
  status: 'pending' | 'completed' | 'graded';
  score?: number;
  submitted_at: string;
}

export interface ActivityAnswer {
  id: string;
  submission_id: string;
  question_id: string;
  answer_text: string;
  is_correct?: boolean;
  score?: number;
  feedback?: string;
}