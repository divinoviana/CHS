
import { GoogleGenAI, Type } from "@google/genai";
import { ChartData, TableData, CrosswordData, ActivityImage } from "../types";

export interface CorrectionResult {
  question: string;
  studentAnswer: string;
  isCorrect: boolean;
  score: number; 
  feedback: string;
}

export interface AIResponse {
  generalComment: string;
  corrections: CorrectionResult[];
}

export interface EvaluationQuestion {
  id: number;
  textFragment: string;
  questionText: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
    e: string;
  };
  correctOption: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  explanation: string;
}

export interface GeneratedEvaluation {
  subject: string;
  grade: string;
  bimester: string;
  questions: EvaluationQuestion[];
  visualContent?: {
    type: 'image' | 'chart' | 'table' | 'crossword';
    data: any;
  };
}

export interface LessonPlan {
  title: string;
  objectives: string[];
  theory: string;
  methodology: {
    introduction: string; // 10 min
    development: string; // 30 min
    conclusion: string; // 10 min
  };
  suggestedActivity: string;
}

// Novo: Estrutura para atividade de aula do aluno
export interface ObjectiveQuestion {
  id: string;
  question: string;
  options: { a: string; b: string; c: string; d: string; e: string; };
  correctOption: string;
}

export interface DiscursiveQuestion {
  id: string;
  question: string;
}

export interface LessonActivity {
  objectives: ObjectiveQuestion[];
  discursives: DiscursiveQuestion[];
  visualContent?: {
    type: 'image' | 'chart' | 'table' | 'crossword';
    data: any; // Will be cast to specific type
  };
}

/**
 * Função utilitária para pausar a execução (usada no Retry)
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Wrapper para chamadas da IA com tentativa de reenvio automático em caso de erro 429.
 */
const callAIWithRetry = async (fn: () => Promise<any>, retries = 3, delay = 2000): Promise<any> => {
  try {
    return await fn();
  } catch (error: any) {
    const isQuotaError = error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED");
    
    if (isQuotaError && retries > 0) {
      console.warn(`Limite de cota atingido. Tentando novamente em ${delay/1000}s... (${retries} tentativas restantes)`);
      await sleep(delay);
      return callAIWithRetry(fn, retries - 1, delay * 2); 
    }
    throw error;
  }
};

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || 
                 (import.meta as any).env?.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateActivityImage = async (prompt: string): Promise<string> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    if (!ai) throw new Error("IA Desabilitada: Chave API não configurada.");
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: {
        parts: [
          {
            text: `Gere uma ilustração didática e séria para uma aula de Ciências Humanas sobre: ${prompt}. Estilo: Ilustração vetorial limpa, cores sóbrias, adequada para material escolar.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Falha ao gerar imagem.");
  });
};

// Nova função para gerar a atividade 5+2 para o aluno
export const generateFallbackActivity = (title: string, theory: string, defaultQuestions?: string[]): LessonActivity => {
  const q1 = defaultQuestions && defaultQuestions[0] ? defaultQuestions[0] : `Explique com suas palavras o conceito principal de: ${title.split(':')[0]}.`;
  const q2 = defaultQuestions && defaultQuestions[1] ? defaultQuestions[1] : `Como o tema "${title}" se relaciona com a sociedade atual?`;

  return {
    objectives: [
      {
        id: "obj1",
        question: `Sobre o tema "${title}", qual das alternativas abaixo melhor resume o conceito principal abordado na teoria?`,
        options: {
          a: "A teoria destaca a importância de analisar criticamente os fatos e contextos apresentados.",
          b: "O tema abordado não possui relevância prática para a compreensão da sociedade.",
          c: "A teoria se limita a descrever eventos isolados sem conexão com o presente.",
          d: "Os conceitos apresentados são exclusivos de outras áreas do conhecimento.",
          e: "A análise do tema deve ser feita de forma superficial e sem embasamento."
        },
        correctOption: "a"
      },
      {
        id: "obj2",
        question: "De acordo com os conceitos fundamentais desta aula, é correto afirmar que:",
        options: {
          a: "As mudanças sociais ocorrem de forma isolada e sem influência do passado.",
          b: "A compreensão do tema exige uma visão ampla e conectada com diferentes realidades.",
          c: "O estudo deste assunto serve apenas para memorização de dados históricos ou geográficos.",
          d: "Não há evidências que comprovem a importância deste tema na atualidade.",
          e: "A teoria apresentada contraria os princípios básicos das Ciências Humanas."
        },
        correctOption: "b"
      },
      {
        id: "obj3",
        question: "Qual a principal importância de compreender os conceitos discutidos nesta aula?",
        options: {
          a: "Permitir a repetição de informações sem necessidade de reflexão crítica.",
          b: "Desconsiderar as diferentes perspectivas e focar em uma única visão de mundo.",
          c: "Desenvolver uma análise crítica e aprofundada sobre as dinâmicas sociais e humanas.",
          d: "Limitar o conhecimento a fatos que não interferem no nosso cotidiano.",
          e: "Ignorar as transformações históricas e focar apenas no momento presente."
        },
        correctOption: "c"
      }
    ],
    discursives: [
      { id: "disc1", question: q1 },
      { id: "disc2", question: q2 }
    ]
  };
};

export const generateLessonActivity = async (lessonTitle: string, theory: string): Promise<LessonActivity> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    if (!ai) throw new Error("IA Desabilitada: Chave API não configurada.");
    const schema = {
      type: Type.OBJECT,
      properties: {
        objectives: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: {
                type: Type.OBJECT,
                properties: {
                  a: { type: Type.STRING }, b: { type: Type.STRING },
                  c: { type: Type.STRING }, d: { type: Type.STRING },
                  e: { type: Type.STRING }
                },
                required: ["a", "b", "c", "d", "e"]
              },
              correctOption: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctOption"]
          }
        },
        discursives: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING }
            },
            required: ["id", "question"]
          }
        },
        visualContent: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, description: "Tipo de conteúdo visual: 'chart', 'table' ou 'crossword'" },
            data: { 
              type: Type.OBJECT, 
              description: "Dados estruturados para o componente visual",
              properties: {
                title: { type: Type.STRING },
                type: { type: Type.STRING },
                data: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } } } },
                headers: { type: Type.ARRAY, items: { type: Type.STRING } },
                rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
                grid: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
                clues: {
                  type: Type.OBJECT,
                  properties: {
                    across: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { number: { type: Type.NUMBER }, clue: { type: Type.STRING }, answer: { type: Type.STRING }, row: { type: Type.NUMBER }, col: { type: Type.NUMBER } } } },
                    down: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { number: { type: Type.NUMBER }, clue: { type: Type.STRING }, answer: { type: Type.STRING }, row: { type: Type.NUMBER }, col: { type: Type.NUMBER } } } }
                  }
                }
              }
            }
          },
          required: ["type", "data"]
        }
      },
      required: ["objectives", "discursives"]
    };

    const prompt = `Atue como um Professor Doutor e Especialista em Ciências Humanas (Filosofia, História, Geografia e Sociologia) com vasta experiência acadêmica. 
    Com base na aula "${lessonTitle}" e no referencial teórico fornecido: "${theory.substring(0, 3000)}", sua missão é consolidar uma atividade de EXTREMA PROFUNDIDADE Intelectual, voltada para o desenvolvimento do pensamento complexo e dialético em alunos do Ensino Médio de alto rendimento.
    
    A atividade deve ser composta por:
    1. EXATAMENTE 5 QUESTÕES OBJETIVAS (múltipla escolha, A-E). Estas questões devem simular os vestibulares mais exigentes (como UNICAMP, USP, UNESP) e o ENEM em seu nível máximo de dificuldade. 
       Requisitos das questões:
       - Utilizar textos-base densos (fragmentos de autores clássicos, artigos científicos recentes ou documentos históricos primários).
       - Exigir o domínio de categorias teóricas específicas (ex: "mais-valia", "imperativo categórico", "estratificação social", "territorialidade").
       - Propor distratores plausíveis que exijam a superação do senso comum e da interpretação literal.
       - Focar em relações de causa e efeito, contradições sociais e análises conjunturais.
    2. EXATAMENTE 2 QUESTÕES DISCURSIVAS de nível universitário, que exijam:
       - Produção textual argumentativa e fundamentada a partir da síntese da teoria.
       - Posicionamento ético-político crítico frente a dilemas contemporâneos.
       - Capacidade de relacionar o tema com a realidade regional do Tocantins ou problemas globais.
    3. UM RECURSO VISUAL ANALÍTICO (opcional, porem recomendável):
       - Se for 'chart': Dados para análise sociológica ou demográfica.
       - Se for 'table': Confronto de perspectivas teóricas ou períodos históricos.
       - Se for 'crossword': Definições epistemológicas e conceitos de matrizes curriculares avançadas.
    
    Evite abordagens superficiais. O vocabulário deve ser técnico e acadêmico, instigando o aluno a elevar seu patamar de discussão.`;

    // Run text and image generation in parallel
    const [response, imageUrlResult] = await Promise.allSettled([
      ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: prompt,
        config: {
          systemInstruction: "Você é um professor acadêmico de alto nível, especialista em Ciências Humanas. Sua missão é produzir conteúdo intelectualmente denso, que desafie o aluno a pensar criticamente e aprofundar seu conhecimento. Evite clichês e generalizações. Siga rigorosamente o schema JSON.",
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      }),
      generateActivityImage(lessonTitle)
    ]);

    if (response.status === 'rejected') throw new Error("IA não retornou atividade.");
    if (!response.value.text) throw new Error("IA não retornou atividade.");
    
    const activity = JSON.parse(response.value.text.trim()) as LessonActivity;

    if (imageUrlResult.status === 'fulfilled' && imageUrlResult.value) {
      activity.visualContent = activity.visualContent || { type: 'image', data: { url: imageUrlResult.value, caption: `Ilustração sobre ${lessonTitle}` } };
    } else {
      console.warn("Não foi possível gerar imagem, continuando com outros conteúdos.");
    }

    return activity;
  });
};

export const generateLessonPlan = async (subject: string, theme: string, grade: string): Promise<LessonPlan> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    if (!ai) throw new Error("IA Desabilitada: Chave API não configurada.");
    const schema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
        theory: { type: Type.STRING },
        methodology: {
          type: Type.OBJECT,
          properties: {
            introduction: { type: Type.STRING },
            development: { type: Type.STRING },
            conclusion: { type: Type.STRING }
          },
          required: ["introduction", "development", "conclusion"]
        },
        suggestedActivity: { type: Type.STRING }
      },
      required: ["title", "objectives", "theory", "methodology", "suggestedActivity"]
    };

    const prompt = `Atue como um Professor Doutor e Mentor Pedagógico de excelência. Crie um plano de aula EXTREMAMENTE detalhado, profundo e epistemologicamente sólido para a disciplina de ${subject}, voltado para alunos da ${grade}ª série do Ensino Médio. O tema da aula é: "${theme}".
    
    O plano de aula deve conter:
    - title: Um título acadêmico e instigante.
    - objectives: 3 a 4 objetivos de aprendizagem ambiciosos, focados em competências da BNCC e no desenvolvimento do pensamento crítico-reflexivo.
    - theory: Uma explanação teórica densa e aprofundada (mínimo de 1000 palavras), rica em citações (reais ou parafraseadas de autores clássicos da área), conceitos-chave explicados minuciosamente, contexto histórico/social complexo e exemplos que conectem a alta teoria à práxis social. Inclua também uma seção de "Síntese para o Quadro" com tópicos estruturados, diretos e visualmente organizados para o professor transcrever.
    - methodology: Um roteiro estratégico para uma aula de 50 minutos:
        - introduction (10 min): Provocação intelectual, uso de metodologias ativas ou problematização inicial.
        - development (30 min): Exposição dialogada aprofundada, análise de fontes e debate mediado.
        - conclusion (10 min): Síntese integradora e fechamento com "gancho" para a próxima aula.
    - suggestedActivity: Uma proposta de atividade prática ou de pesquisa que exija protagonismo do aluno e aplicação dos conceitos discutidos.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      config: {
        systemInstruction: "Você é um mentor pedagógico doutor em Ciências Humanas. Crie planos de aula que sejam referências de profundidade teórica e clareza metodológica. A teoria deve ser um texto de excelência acadêmica, mas acessível ao Ensino Médio de alto nível.",
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (!response.text) throw new Error("IA retornou vazio.");
    return JSON.parse(response.text.trim()) as LessonPlan;
  });
};

export const generateBimonthlyEvaluation = async (
  subjectName: string,
  grade: string,
  bimester: string,
  topics: string[]
): Promise<GeneratedEvaluation> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    if (!ai) throw new Error("IA Desabilitada: Chave API não configurada.");
    const schema = {
      type: Type.OBJECT,
      properties: {
        subject: { type: Type.STRING },
        grade: { type: Type.STRING },
        bimester: { type: Type.STRING },
        questions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              textFragment: { type: Type.STRING },
              questionText: { type: Type.STRING },
              options: {
                type: Type.OBJECT,
                properties: {
                  a: { type: Type.STRING }, b: { type: Type.STRING },
                  c: { type: Type.STRING }, d: { type: Type.STRING },
                  e: { type: Type.STRING }
                },
                required: ["a", "b", "c", "d", "e"]
              },
              correctOption: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["id", "textFragment", "questionText", "options", "correctOption", "difficulty", "explanation"]
          }
        },
        visualContent: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, description: "Tipo de conteúdo visual: 'chart', 'table' ou 'crossword'" },
            data: { 
              type: Type.OBJECT, 
              description: "Dados estruturados para o componente visual",
              properties: {
                title: { type: Type.STRING },
                type: { type: Type.STRING },
                data: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, value: { type: Type.NUMBER } } } },
                headers: { type: Type.ARRAY, items: { type: Type.STRING } },
                rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
                grid: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
                clues: {
                  type: Type.OBJECT,
                  properties: {
                    across: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { number: { type: Type.NUMBER }, clue: { type: Type.STRING }, answer: { type: Type.STRING }, row: { type: Type.NUMBER }, col: { type: Type.NUMBER } } } },
                    down: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { number: { type: Type.NUMBER }, clue: { type: Type.STRING }, answer: { type: Type.STRING }, row: { type: Type.NUMBER }, col: { type: Type.NUMBER } } } }
                  }
                }
              }
            }
          },
          required: ["type", "data"]
        }
      },
      required: ["subject", "grade", "bimester", "questions"]
    };

    const prompt = `Atue como um Especialista em Avaliação Educacional e Elaborador de Provas de Alto Nível (padrão ENEM e Vestibulares de Elite). Gere uma avaliação bimestral EXTREMAMENTE sofisticada para ${subjectName}, ${grade}ª Série, ${bimester}º Bimestre. 
    Tópicos a serem abordados: ${topics.join(', ')}.
    
    A avaliação deve conter:
    - 5 questões de múltipla escolha (A-E) inéditas, densas e interdisciplinares.
    - Cada questão deve ser precedida por um 'textFragment' (texto-base) de alta qualidade: trechos de obras clássicas, artigos científicos, documentos históricos, notícias contemporâneas ou infográficos.
    - As questões devem exigir competências complexas: análise de discurso, identificação de contradições, relação entre teoria e prática, e síntese de informações.
    - Os distratores (alternativas incorretas) devem ser "inteligentes", baseados em erros comuns de raciocínio ou interpretações superficiais, exigindo que o aluno realmente domine o conceito para acertar.
    - Inclua um recurso visual (gráfico, tabela ou palavra cruzada) que seja INDISPENSÁVEL para a resolução de pelo menos uma das questões, exigindo literacia visual.`;

    // Run text and image generation in parallel
    const [response, imageUrlResult] = await Promise.allSettled([
      ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: prompt,
        config: {
          systemInstruction: "Você é um especialista em avaliação educacional de alto nível. Gere questões que testem a profundidade do conhecimento e a capacidade analítica do aluno, seguindo o rigor acadêmico das Ciências Humanas. Siga rigorosamente o schema JSON.",
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      }),
      generateActivityImage(`Avaliação de ${subjectName}: ${topics[0]}`)
    ]);

    if (response.status === 'rejected') throw new Error("IA retornou vazio.");
    if (!response.value.text) throw new Error("IA retornou vazio.");
    
    const evaluation = JSON.parse(response.value.text.trim()) as GeneratedEvaluation;

    if (imageUrlResult.status === 'fulfilled' && imageUrlResult.value) {
      evaluation.visualContent = evaluation.visualContent || { type: 'image', data: { url: imageUrlResult.value, caption: `Contexto para a avaliação de ${subjectName}` } };
    } else {
      console.warn("Não foi possível gerar imagem para avaliação.");
    }

    return evaluation;
  });
};

export interface EvaluationQuestionItem {
  question: string;
  answer: string;
  correctAnswer?: string;
}

export const evaluateActivities = async (
  lessonTitle: string,
  theoryContext: string,
  questionsAndAnswers: EvaluationQuestionItem[]
): Promise<AIResponse> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    if (!ai) throw new Error("IA Desabilitada: Chave API não configurada.");
    const schema = {
      type: Type.OBJECT,
      properties: {
        generalComment: { type: Type.STRING },
        corrections: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              studentAnswer: { type: Type.STRING },
              isCorrect: { type: Type.BOOLEAN },
              score: { type: Type.NUMBER },
              feedback: { type: Type.STRING }
            },
            required: ["question", "studentAnswer", "isCorrect", "score", "feedback"]
          }
        }
      },
      required: ["generalComment", "corrections"]
    };

    const prompt = `Atue como um tutor acadêmico rigoroso e construtivo. Avalie as respostas do aluno para a aula "${lessonTitle}".
    
    Contexto teórico da aula: "${theoryContext.substring(0, 2000)}"
    
    Respostas do aluno (contendo pergunta, resposta do aluno e resposta correta esperada se disponível): ${JSON.stringify(questionsAndAnswers)}
    
    Para cada questão, forneça:
    - isCorrect: true se a resposta estiver correta ou parcialmente correta com bom embasamento, false caso contrário. SE HOUVER 'correctAnswer' NO JSON PARA A QUESTÃO, USE-A COMO CRITÉRIO ABSOLUTO.
    - score: Uma nota de 0 a 10 para a resposta. (Se 'correctAnswer' estiver presente e a resposta do aluno for igual, a nota deve ser 10. Se for diferente, 0).
    - feedback: Um feedback detalhado, explicando o porquê da nota, corrigindo possíveis erros conceituais e sugerindo pontos de melhoria ou aprofundamento.
    
    No 'generalComment', faça um balanço geral do desempenho do aluno nesta atividade, destacando pontos fortes e fracos.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um tutor acadêmico experiente. Forneça feedbacks construtivos, detalhados e que estimulem o aprendizado do aluno.",
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    
    if (!response.text) throw new Error("Sem resposta.");
    return JSON.parse(response.text) as AIResponse;
  });
};

export const generatePedagogicalSummary = async (
  context: "INDIVIDUAL" | "TURMA",
  data: {
    subject: string,
    grades: number[],
    notes: string[],
    studentName?: string,
    schoolClass: string
  }
): Promise<string> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    if (!ai) throw new Error("IA Desabilitada: Chave API não configurada.");
    const prompt = `Atue como um Coordenador Pedagógico especialista em análise de dados educacionais. 
    Gere um relatório analítico e estratégico em formato Markdown para o contexto: ${context === 'INDIVIDUAL' ? `Aluno: ${data.studentName}` : `Turma: ${data.schoolClass}`}.
    Disciplina: ${data.subject}.
    
    Dados disponíveis:
    - Notas obtidas: ${JSON.stringify(data.grades)}
    - Observações/Anotações do professor: ${JSON.stringify(data.notes)}
    
    O relatório deve conter:
    1. **Análise de Desempenho:** Interpretação das notas (média, evolução, pontos de atenção).
    2. **Síntese Qualitativa:** O que as anotações do professor revelam sobre o engajamento, dificuldades e potencialidades.
    3. **Plano de Ação:** 3 a 5 recomendações pedagógicas práticas e acionáveis para melhorar o aprendizado (seja para o aluno específico ou para a turma como um todo).
    
    Seja profissional, empático e focado em soluções.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: prompt,
      config: {
        systemInstruction: "Você é um Coordenador Pedagógico experiente. Gere relatórios analíticos, bem estruturados em Markdown, focados no desenvolvimento do aluno/turma."
      }
    });
    
    return response.text || "Erro ao gerar.";
  });
};
