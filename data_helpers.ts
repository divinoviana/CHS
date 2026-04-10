import { Lesson, Subject } from './types';

export const createLesson = (id: string, title: string, subject: Subject, theory: string, questions: string[]): Lesson => ({
  id,
  title,
  subject,
  objectives: [`Compreender os fundamentos de ${subject}`, "Analisar processos históricos e espaciais", "Desenvolver consciência crítica"],
  theory,
  methodology: "Estudo de caso, análise de fontes primárias, debates e produção textual.",
  activities: [{
    id: `${id}-act`,
    title: "Atividade de Reflexão",
    description: "Conecte o conhecimento teórico com sua observação da realidade atual.",
    questions
  }],
  reflectionQuestions: ["Como esse conhecimento ajuda a entender o mundo hoje?", "Qual sua opinião sobre o impacto desse tema na sua comunidade?"]
});
