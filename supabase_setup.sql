-- 1. Tabela do Banco de Questões
CREATE TABLE IF NOT EXISTS question_bank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('objective', 'discursive')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Fácil', 'Médio', 'Difícil')),
  question_text TEXT NOT NULL,
  options JSONB, -- Ex: {"a": "...", "b": "...", "c": "...", "d": "...", "e": "..."}
  correct_option TEXT, -- 'a', 'b', 'c', 'd', 'e'
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de Atividades (Pacotes de questões vinculados a uma aula)
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id TEXT NOT NULL UNIQUE, -- ID da aula hardcoded (ex: 'g1-his-b1-l1')
  title TEXT NOT NULL,
  visual_content JSONB, -- Para gráficos, tabelas ou palavras cruzadas
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Relação entre Atividades e Questões
CREATE TABLE IF NOT EXISTS activity_questions (
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  question_id UUID REFERENCES question_bank(id) ON DELETE CASCADE,
  order_num INTEGER NOT NULL,
  PRIMARY KEY (activity_id, question_id)
);

-- 4. Submissões dos Alunos (Tentativas)
CREATE TABLE IF NOT EXISTS activity_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'graded')),
  score NUMERIC,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, activity_id)
);

-- 5. Respostas Individuais dos Alunos
CREATE TABLE IF NOT EXISTS activity_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES activity_submissions(id) ON DELETE CASCADE,
  question_id UUID REFERENCES question_bank(id) ON DELETE CASCADE,
  answer_text TEXT,
  is_correct BOOLEAN,
  score NUMERIC,
  feedback TEXT,
  UNIQUE(submission_id, question_id)
);
