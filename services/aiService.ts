
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
  // Em ambientes Vite/Vercel, process.env pode não estar disponível no browser.
  // Tentamos buscar de múltiplas fontes comuns.
  const apiKey = process.env.GEMINI_API_KEY || 
                 (import.meta as any).env?.VITE_GEMINI_API_KEY || 
                 (window as any).GEMINI_API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    throw new Error("Configuração Ausente: A chave GEMINI_API_KEY não foi encontrada no ambiente. Se você estiver usando o Vercel, certifique-se de adicionar VITE_GEMINI_API_KEY às variáveis de ambiente.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateActivityImage = async (prompt: string): Promise<string> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
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

    const prompt = `Atue como um professor especialista em Ciências Humanas. Com base na aula "${lessonTitle}" e na teoria fornecida: "${theory.substring(0, 3000)}", crie uma atividade aprofundada, analítica e desafiadora para alunos do Ensino Médio.
    
    A atividade deve conter:
    1. EXATAMENTE 5 questões de múltipla escolha (objetivas) com 5 alternativas cada (A-E). As questões NÃO devem ser de mera memorização. Elas devem exigir interpretação de texto, análise crítica, relação com o contexto histórico/social atual e raciocínio lógico. Use situações-problema, casos práticos ou trechos de textos de apoio fictícios nas questões.
    2. EXATAMENTE 2 questões discursivas (abertas) complexas que exijam reflexão crítica profunda, argumentação embasada e conexão do tema com a realidade contemporânea do aluno.
    3. UM CONTEÚDO VISUAL COMPLEMENTAR (opcional, mas recomendado se o tema permitir):
       - Se for 'chart': Gere dados para um gráfico (bar, line ou pie) com 'title' e 'data' (array de {name, value}).
       - Se for 'table': Gere uma tabela com 'title', 'headers' e 'rows'.
       - Se for 'crossword': Gere uma palavra cruzada com 'grid' (array 2D de letras/espaços) e 'clues' (across/down com number, clue, answer, row, col).
    
    As questões devem ter o nível de exigência do ENEM (Exame Nacional do Ensino Médio), sendo muito bem elaboradas, contextualizadas e aprofundadas.`;

    // Run text and image generation in parallel
    const [response, imageUrlResult] = await Promise.allSettled([
      ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          systemInstruction: "Você é um professor avaliador experiente e conteudista de alto nível. Siga rigorosamente o schema JSON. Crie questões profundas e que exijam pensamento crítico.",
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

    const prompt = `Atue como um professor especialista e mentor pedagógico de alto nível. Crie um plano de aula detalhado, profundo e engajador para a disciplina de ${subject}, voltado para alunos da ${grade}ª série do Ensino Médio. O tema da aula é: "${theme}".
    
    O plano de aula deve conter:
    - title: Um título criativo e instigante para a aula.
    - objectives: 3 a 4 objetivos de aprendizagem claros, focados no desenvolvimento de habilidades cognitivas superiores (análise, síntese, avaliação).
    - theory: Uma explicação teórica aprofundada, rica em detalhes, conceitos-chave, contexto histórico/social e exemplos práticos que conectem o tema à realidade dos alunos. Inclua também pontos de resumo em tópicos (bullet points) que sejam altamente interessantes, diretos e ideais para o professor copiar na lousa (quadro negro).
    - methodology: Um roteiro passo a passo para uma aula de 50 minutos, dividido em:
        - introduction (10 min): Como engajar os alunos inicialmente (ex: uma pergunta provocadora, um dilema, uma imagem).
        - development (30 min): Como aprofundar a teoria de forma interativa e dialógica.
        - conclusion (10 min): Como sistematizar o conhecimento e fechar a aula de forma memorável.
    - suggestedActivity: Uma sugestão de atividade prática, dinâmica ou de reflexão para fixação do conteúdo.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "Você é um mentor pedagógico experiente. Crie um plano de aula de 50 minutos que seja profundo, engajador e prático. A teoria deve ser excelente, com tópicos perfeitos para a lousa.",
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

    const prompt = `Atue como um elaborador de provas do ENEM. Gere uma avaliação bimestral de alto nível para ${subjectName}, ${grade}ª Série, ${bimester}º Bimestre. 
    Tópicos a serem abordados: ${topics.join(', ')}.
    
    A avaliação deve conter:
    - 5 questões de múltipla escolha (A-E) inéditas, complexas e contextualizadas.
    - Cada questão deve conter um 'textFragment' (texto base, situação-problema, trecho de artigo ou documento histórico) que sirva de apoio para a resolução.
    - As alternativas devem ser bem elaboradas, com distratores plausíveis que exijam raciocínio crítico, e não apenas memorização.
    - Inclua um recurso visual (gráfico, tabela ou palavra cruzada) que seja fundamental para a interpretação de pelo menos uma das questões.`;

    // Run text and image generation in parallel
    const [response, imageUrlResult] = await Promise.allSettled([
      ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          systemInstruction: "Você é um especialista em avaliação educacional. Gere 5 questões no padrão ENEM, exigindo alta capacidade de leitura e interpretação. Siga rigorosamente o schema JSON.",
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

export const evaluateActivities = async (
  lessonTitle: string,
  theoryContext: string,
  questionsAndAnswers: { question: string; answer: string }[]
): Promise<AIResponse> => {
  return callAIWithRetry(async () => {
    const ai = getAIClient();
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
    
    Respostas do aluno: ${JSON.stringify(questionsAndAnswers)}
    
    Para cada questão, forneça:
    - isCorrect: true se a resposta estiver correta ou parcialmente correta com bom embasamento, false caso contrário.
    - score: Uma nota de 0 a 10 para a resposta.
    - feedback: Um feedback detalhado, explicando o porquê da nota, corrigindo possíveis erros conceituais e sugerindo pontos de melhoria ou aprofundamento.
    
    No 'generalComment', faça um balanço geral do desempenho do aluno nesta atividade, destacando pontos fortes e fracos.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "Você é um Coordenador Pedagógico experiente. Gere relatórios analíticos, bem estruturados em Markdown, focados no desenvolvimento do aluno/turma."
      }
    });
    
    return response.text || "Erro ao gerar.";
  });
};
