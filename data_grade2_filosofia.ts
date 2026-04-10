import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Filosofia 2ª Série: 9 aulas por bimestre (Total 36)
export const phiLessonsB1: Lesson[] = [
  createLesson('g2-phi-b1-l1', 'L1: Liberalismo e o Fim do Antigo Regime', 'filosofia', 
    'O Liberalismo surgiu como uma reação ao Absolutismo (Antigo Regime), onde o Rei tinha poder total. Os primeiros pensadores liberais defenderam que o indivíduo possui direitos que o Estado não pode violar, como a vida e a liberdade. Essa mudança de mentalidade colocou a Razão e a Liberdade Individual no centro da organização política da Europa no século XVIII.', 
    ['Quais as principais diferenças entre o poder de um Rei Absolutista e as ideias do Liberalismo?', 'Por que a defesa da "liberdade individual" foi revolucionária para a época?']),

  createLesson('g2-phi-b1-l2', 'L2: Thomas Hobbes: O Estado de Natureza e o Medo', 'filosofia', 
    'Para Hobbes, no "estado de natureza" (antes das leis), os homens vivem em uma guerra de todos contra todos ("o homem é o lobo do homem"). Movidos pelo medo da morte violenta, os seres humanos decidem abrir mão de sua liberdade total para entregar o poder a um soberano absoluto (o Leviatã), que em troca deve garantir a paz e a segurança.', 
    ['Explique a frase: "O homem é o lobo do homem".', 'Segundo Hobbes, por que as pessoas aceitam ser governadas por um líder com poder absoluto?']),

  createLesson('g2-phi-b1-l3', 'L3: John Locke: Propriedade e Direitos Naturais', 'filosofia', 
    ' locke divergia de Hobbes. Para ele, o estado de natureza era pacífico, mas faltava um juiz para resolver disputas. O ser humano nasce com direitos naturais inalienáveis: Vida, Liberdade e Propriedade. O Estado nasce de um contrato para proteger esses direitos; se o governo não os protege, o povo tem o direito legítimo de revolta.', 
    ['Quais são os três direitos naturais fundamentais segundo John Locke?', 'O que acontece, na visão de Locke, se um governante se torna um tirano e desrespeita a liberdade do povo?']),

  createLesson('g2-phi-b1-l4', 'L4: Jean-Jacques Rousseau: O Bom Selvagem', 'filosofia', 
    'Rousseau acreditava que "o homem nasce bom, mas a sociedade o corrompe". No estado de natureza, éramos felizes e livres (o mito do Bom Selvagem). A desigualdade começou com a invenção da propriedade privada. Para ele, o Contrato Social deve ser baseado na "Vontade Geral", onde o povo é o soberano e decide o que é melhor para o bem comum.', 
    ['O que Rousseau quis dizer com a ideia de que a sociedade corrompe o homem?', 'Diferencie a soberania do Rei (Hobbes/Antigo Regime) da soberania do Povo (Rousseau).']),

  createLesson('g2-phi-b1-l5', 'L5: Comparativo: Hobbes, Locke e Rousseau', 'filosofia', 
    'Embora todos sejam contratualistas (acreditam que o Estado nasce de um pacto), eles divergem no ponto de partida: Hobbes vê o homem como egoísta; Locke o vê como racional e dono de direitos; Rousseau o vê como naturalmente bom. Essas diferenças moldam o que cada um espera do governo: Segurança Absoluta (Hobbes), Proteção da Propriedade (Locke) ou Justiça Social e Liberdade (Rousseau).', 
    ['Qual dos três contratualistas você acha que mais influenciou a nossa democracia atual? Justifique.', 'Compare a visão de "natureza humana" de Hobbes e Rousseau.']),

  createLesson('g2-phi-b1-l6', 'L6: Montesquieu e a Separação dos Poderes', 'filosofia', 
    'Montesquieu observou que "todo homem que tem poder é tentado a abusar dele". Para evitar a tirania, ele propôs a divisão do poder in três esferas independentes: Executivo (executa as leis), Legislativo (cria as leis) e Judiciário (julga os conflitos). Um poder deve vigiar e limitar o outro, garantindo a liberdade dos cidadãos.', 
    ['Por que a divisão em três poderes ajuda a proteger a liberdade individual?', 'Dê um exemplo de como um poder pode limitar o outro no Brasil de hoje.']),

  createLesson('g2-phi-b1-l7', 'L7: Voltaire: Tolerância e Liberdade de Expressão', 'filosofia', 
    'Voltaire foi o grande defensor da tolerância religiosa e da liberdade de pensamento. Ele criticava a censura e o fanatismo. Sua ideia central é que ninguém deve ser perseguido por suas crenças e que o debate de ideias é fundamental para o progresso da civilização. É dele o espírito da frase: "Posso não concordar com o que dizes, mas defenderei até a morte o teu direito de dizê-lo".', 
    ['Qual a importância da tolerância para a convivência em uma sociedade diversa?', 'Como a liberdade de expressão defendida por Voltaire é desafiada pelas Fake News hoje?']),

  createLesson('g2-phi-b1-l8', 'L8: Os Regimes Políticos: Democracia e Autocracia', 'filosofia', 
    'A democracia baseia-se na soberania popular, na alternância de poder e no respeito às minorias. A autocracia (ou ditadura) concentra o poder em uma pessoa ou grupo, suprime a oposição e limita as liberdades. Entender essas diferenças é essencial para valorizar a participação política e o Estado de Direito como garantias de dignidade.', 
    ['O que caracteriza um regime como democrático?', 'Por que a participação dos cidadãos não deve se limitar apenas ao momento do voto?']),

  createLesson('g2-phi-b1-l9', 'L9: Prática: Contrato Social da Turma', 'filosofia', 
    'Nesta prática, a turma deve agir como se estivesse no "estado de natureza" (sem regras). O objetivo é redigir coletivamente um "Pacto de Convivência" para o semestre. Devem decidir: Quais são os nossos direitos? Quem mediará os conflitos? Qual a punição para quem quebrar o pacto? O documento final deve ser assinado por todos os "cidadãos" da sala.', 
    ['Descreva uma regra que você propôs para o Contrato Social da turma e por que ela é justa.', 'Como você se sentiu tendo o poder de decidir as regras, em vez de apenas recebê-las prontas?']),
];

export const phiLessonsB2: Lesson[] = [
  createLesson('g2-phi-b2-l1', 'L1: Zygmunt Bauman e a Modernidade Líquida', 'filosofia', 
    'O sociólogo e filósofo Zygmunt Bauman usa a metáfora do "líquido" para descrever a nossa época. Enquanto a modernidade "sólida" era focada em instituições estáveis e laços duradouros, a modernidade "líquida" é marcada pela fluidez, incerteza e pela rapidez com que as coisas e relações mudam. Nada é feito para durar, e isso gera uma sensação constante de ansiedade.', 
    ['Explique a diferença entre uma "instituição sólida" e uma "instituição líquida".', 'Dê um exemplo de como os relacionamentos humanos se tornaram mais "líquidos" na era das redes sociais.']),

  createLesson('g2-phi-b2-l2', 'L2: A Lógica do Consumo e o Descarte Humano', 'filosofia', 
    'Na modernidade líquida, o consumo torna-se o centro da identidade. O problema é que essa lógica de "usar e descartar" produtos acaba sendo aplicada às pessoas. Bauman alerta que as relações podem se tornar mercadorias: quando alguém não nos "serve" mais ou nos traz algum incômodo, simplesmente a descartamos como um celular velho.', 
    ['Como a mentalidade de "consumidor" afeta a forma como tratamos nossos amigos ou familiares?', 'O que Bauman quer dizer com a ideia de "descarte humano"?']),

  createLesson('g2-phi-b2-l3', 'L3: Emmanuel Levinas: O Rosto e a Alteridade', 'filosofia', 
    'Para Levinas, a ética não começa em leis escritas, mas no encontro com o "Rosto" do outro. Alteridade significa reconhecer que o outro é radicalmente diferente de mim e que eu não posso controlá-lo ou reduzi-lo aos meus desejos. O "Rosto" é um apelo mudo que nos diz: "não me mates", exigindo respeito e acolhimento.', 
    ['O que significa o conceito de alteridade?', 'Por que Levinas afirma que a ética nasce no encontro com o rosto de outra pessoa?']),

  createLesson('g2-phi-b2-l4', 'L4: Ética como Responsabilidade Infinita', 'filosofia', 
    'Levinas defende que somos "reféns" do outro. Isso significa que tenho uma responsabilidade infinita pela vida do próximo, antes mesmo de qualquer contrato social. Para ele, eu sou responsável até mesmo pelas faltas que eu não cometi, se essas faltas afetam a dignidade do outro. A ética é, portanto, o cuidado com a vulnerabilidade alheia.', 
    ['Explique a frase de Levinas: "Eu sou responsável pelo outro".', 'Você concorda que temos uma responsabilidade pelo sofrimento de pessoas que nem conhecemos? Justifique.']),

  createLesson('g2-phi-b2-l5', 'L5: O Medo do Outro e a Construção de Muros', 'filosofia', 
    'Bauman discute o "Medo Líquido": o medo do estranho, do imigrante ou de quem é diferente. Esse medo nos leva a construir muros reais e digitais (bolhas sociais). Em vez de conviver com a diferença, buscamos apenas quem pensa igual a nós, o que destrói a possibilidade de uma ética da alteridade verdadeira.', 
    ['Por que o medo do "estranho" é tão forte na sociedade atual?', 'Como as "bolhas" das redes sociais funcionam como muros invisíveis que impedem o diálogo?']),

  createLesson('g2-phi-b2-l6', 'L6: Ética vs. Moral: Fundamentos do Agir', 'filosofia', 
    'A Moral é o conjunto de normas e costumes de uma sociedade (o que é proibido ou permitido). A Ética é a reflexão crítica sobre essas normas. Uma ação ética é aquela decidida de forma autônoma: eu não sigo a regra apenas por medo da punição, mas porque entendo racionalmente que aquilo é o correto a se fazer.', 
    ['Diferencie uma ação moral de uma reflexão ética.', 'Dê um exemplo de uma situação em que seguir a moral do grupo pode ser antiético.']),

  createLesson('g2-phi-b2-l7', 'L7: Nietzsche: A Genealogia da Moral', 'filosofia', 
    'Nietzsche critica a moral tradicional, chamando-a de "moral de escravos" (baseada no ressentimento e na negação da vida). Ele propõe a "transvaloração dos valores" e a busca pela "moral de senhores" (afirmativa e criativa). Para ele, o indivíduo deve criar seus próprios valores e superar as imposições de rebanho da sociedade.', 
    ['O que Nietzsche entende por "moral de escravos"?', 'O que significa para Nietzsche ser um "espírito livre" capaz de criar seus próprios valores?']),

  createLesson('g2-phi-b2-l8', 'L8: Jean-Paul Sartre: Liberdade e Má-Fé', 'filosofia', 
    'Sartre afirma que o ser humano é "condenado a ser livre". Não temos uma essência pronta; somos o resultado de nossas escolhas. "Má-fé" ocorre quando tentamos fugir dessa responsabilidade, fingindo que não temos escolha ou culpando o destino, a genética ou a sociedade pelas nossas ações.', 
    ['O que Sartre define como "Má-Fé"?', 'Se somos totalmente livres para escolher, por que muitas pessoas sentem angústia diante da liberdade?']),

  createLesson('g2-phi-b2-l9', 'L9: Prática: Diário da Liquidez', 'filosofia', 
    'Nesta prática, os alunos devem registrar durante 24 horas as suas interações sociais e hábitos de consumo. Ao final, devem identificar: O que foi uma troca "sólida" (profunda, duradoura) e o que foi "líquido" (superficial, rápido). O objetivo é aplicar os conceitos de Bauman e Levinas à sua própria rotina.', 
    ['Ao analisar seu dia, você se sentiu mais um "consumidor" ou um "cidadão ético"? Por quê?', 'Descreva um momento do seu dia em que você praticou a alteridade (respeito à diferença do outro).']),
];

export const phiLessonsB3: Lesson[] = [
  createLesson('g2-phi-b3-l1', 'L1: Essência e Aparência: Além da Imagem', 'filosofia', 
    'A distinção entre essência (o que a coisa é de fato) e aparência (como ela se mostra aos sentidos) é um dos pilares da filosofia. No mundo atual, dominado por filtros e redes sociais, muitas vezes confundimos a imagem que projetamos com quem realmente somos. A filosofia nos convida a "furar" essa superfície e buscar a verdade que as aparências muitas vezes escondem.', 
    ['Explique a diferença entre essência e aparência usando o exemplo de uma rede social.', 'Como a busca excessiva pela aparência perfeita pode afetar a nossa percepção da realidade?']),

  createLesson('g2-phi-b3-l2', 'L2: O Conceito de Ideologia e Distorção', 'filosofia', 
    'Na filosofia, ideologia não é apenas "ter ideias", mas um conjunto de ideias que mascara a realidade social para favorecer quem tem o poder. Ela funciona como um par de óculos que distorce a visão, fazendo-nos acreditar que a exploração ou a desigualdade são "naturais" ou "certas". O objetivo da ideologia é impedir que percebamos como o mundo realmente funciona.', 
    ['Como a ideologia pode fazer com que pessoas defendam interesses que, na verdade, as prejudicam?', 'Dê um exemplo de uma ideia que parece "natural" para todos, mas que na verdade é uma construção ideológica.']),

  createLesson('g2-phi-b3-l3', 'L3: Adorno e Horkheimer: A Indústria Cultural', 'filosofia', 
    'Os filósofos da Escola de Frankfurt criaram o conceito de Indústria Cultural. Eles perceberam que o cinema, a música e a televisão se tornaram mercadorias feitas para gerar lucro e passividade. Em vez de a arte nos fazer pensar e questionar, a indústria cultural nos oferece diversão "mastigada" para nos manter dóceis e integrados ao sistema de consumo.', 
    ['O que é a Indústria Cultural e qual o seu principal objetivo segundo a Escola de Frankfurt?', 'Por que a diversão rápida e fácil pode ser uma forma de controle social?']),

  createLesson('g2-phi-b3-l4', 'L4: Walter Benjamin: Arte e Reprodutibilidade', 'filosofia', 
    'Walter Benjamin discutiu como a técnica de reproduzir a arte (fotos, cópias, gravações) retirou a "aura" das obras originais. Se por um lado a arte se tornou mais acessível a todos, por outro, ela perdeu seu caráter único e sagrado. Benjamin viu nisso uma oportunidade de usar a imagem para a política e a conscientização das massas.', 
    ['O que Walter Benjamin entende por "aura" de uma obra de arte?', 'Hoje, com a internet, tudo é copiado instantaneamente. Isso valoriza ou desvaloriza a arte? Justifique.']),

  createLesson('g2-phi-b3-l5', 'L5: Dominação, Consumo e Manipulação', 'filosofia', 
    'O consumo não serve apenas para satisfazer necessidades, mas também para exercer domínio sobre as pessoas. Através da publicidade, somos convencidos de que só seremos felizes se comprarmos a "marca X". Isso cria uma forma de manipulação onde o desejo do cidadão é moldado pelo mercado, transformando sujeitos livres em consumidores dependentes.', 
    ['Como a publicidade manipula nossos desejos e sentimentos?', 'Em sua opinião, o consumo pode ser uma forma de prisão psicológica? Por quê?']),

  createLesson('g2-phi-b3-l6', 'L6: Hegel: A Dialética do Senhor e do Escravo', 'filosofia', 
    'Hegel descreve uma luta por reconhecimento entre duas pessoas. Uma prefere a vida à liberdade e se torna escrava; a outra prefere a liberdade e se torna senhor. Ironicamente, o escravo, ao trabalhar a natureza, descobre sua própria capacidade criativa e se torna independente, enquanto o senhor se torna dependente do trabalho alheio para sobreviver.', 
    ['Explique por que, na visão de Hegel, o trabalho é a chave para a liberdade do escravo.', 'Como a dependência do senhor em relação ao escravo inverte as posições de poder?']),

  createLesson('g2-phi-b3-l7', 'L7: Marx: O Trabalho como Alienação', 'filosofia', 
    'Para Marx, no sistema capitalista, o trabalho deixa de ser a realização do homem e vira alienação. O trabalhador não é dono do que produz, não controla o processo e não se reconhece no seu esforço. Ele se sente "em casa" quando não está trabalhando (nas funções biológicas) e se sente "um animal" quando está no trabalho.', 
    ['O que Marx define como "trabalho alienado"?', 'Dê um exemplo de como a divisão excessiva de tarefas em uma fábrica ou escritório gera alienação.']),

  createLesson('g2-phi-b3-l8', 'L8: Max Weber: A Ética Protestante e o Trabalho', 'filosofia', 
    'Weber observou que a mentalidade capitalista (focada em lucro, disciplina e poupança) teve uma raiz religiosa. Certas correntes do protestantismo viam o sucesso no trabalho como um sinal de salvação divina. Isso transformou o trabalho em uma "vocação" sagrada, criando a base moral para o desenvolvimento da economia moderna ocidental.', 
    ['Qual a relação que Weber estabelece entre religião e o surgimento do capitalismo?', 'Como a visão do trabalho como "vocação" mudou a forma como as pessoas encaram o sucesso pessoal?']),

  createLesson('g2-phi-b3-l9', 'L9: Prática: Ideologia na Música', 'filosofia', 
    'Nesta prática, os alunos devem escolher uma letra de música que faça sucesso atualmente. Devem analisar: Quais valores ela transmite? Existe alguma "promessa" de felicidade ligada ao consumo? Ela desafia ou reforça a ideologia dominante? O objetivo é aplicar a teoria da Indústria Cultural em algo que eles ouvem todos os dias.', 
    ['Analise um trecho da música escolhida sob o olhar da Escola de Frankfurt.', 'A música que você escolheu estimula o pensamento crítico ou é apenas um produto de entretenimento passageiro?']),
];

export const phiLessonsB4: Lesson[] = [
  createLesson('g2-phi-b4-l1', 'L1: A Experiência do Sagrado e o Pensamento Simbólico', 'filosofia', 
    'O ser humano não se relaciona com o mundo apenas racionalmente, mas também através de símbolos e do "sagrado". Enquanto o profano é o cotidiano comum, o sagrado é o que possui um significado especial, transcendente. O pensamento simbólico permite que demos sentido à morte, ao nascimento e à nossa relação com o universo, expressando o que as palavras comuns não alcançam.', 
    ['Diferencie o "sagrado" do "profano" com um exemplo da sua cultura.', 'Por que os símbolos são importantes para a união de uma comunidade ou religião?']),

  createLesson('g2-phi-b4-l2', 'L2: Epicurismo: A Ataraxia e a Busca pelo Prazer', 'filosofia', 
    'Epicuro defendia que a felicidade consiste na busca pelo prazer e na ausência de dor. No entanto, ele não falava de prazeres exagerados, mas do prazer estável de uma mente tranquila (Ataraxia) e de um corpo saudável. Para ele, devemos evitar desejos desnecessários e valorizar a amizade e a simplicidade.', 
    ['O que Epicuro define como um "prazer verdadeiro"?', 'Como a busca pela "ataraxia" (tranquilidade da alma) pode nos ajudar a lidar com a ansiedade hoje?']),

  createLesson('g2-phi-b4-l3', 'L3: Estoicismo: A Razão e a Aceitação do Destino', 'filosofia', 
    'Os estoicos acreditavam que não podemos controlar o que acontece ao nosso redor, mas podemos controlar como reagimos a isso. A sabedoria está em aceitar o destino com serenidade, focando apenas naquilo que depende de nós: nossa vontade e nossa razão. A ética estoica busca a imperturbabilidade diante das dificuldades da vida.', 
    ['Explique o conceito estoico de focar apenas no que "depende de nós".', 'Como o estoicismo pode ser útil para alguém enfrentando um grande problema pessoal?']),

  createLesson('g2-phi-b4-l4', 'L4: Poder, Autoridade e Legitimidade', 'filosofia', 
    'O poder é a capacidade de influenciar o comportamento alheio. A Autoridade é o poder reconhecido como legítimo. Max Weber definiu três tipos de dominação legítima: a Tradicional (costumes), a Carismática (líder heróico) e a Racional-Legal (baseada nas leis). Entender a legitimidade é entender por que obedecemos.', 
    ['Qual a diferença entre um líder que tem poder e um líder que tem autoridade?', 'Dê um exemplo de dominação "carismática" na história ou na atualidade.']),

  createLesson('g2-phi-b4-l5', 'L5: Maquiavel: A Realidade Crua do Poder', 'filosofia', 
    'Maquiavel foi o primeiro a analisar a política como ela "é", e não como "deveria ser". Para ele, o governante (o Príncipe) deve ter "Virtù" (habilidade) para lidar com a "Fortuna" (sorte/contexto). Ele defende que é melhor ser temido do que amado, se não for possível ser ambos, para manter a estabilidade do Estado.', 
    ['Por que Maquiavel é considerado o pai da ciência política moderna?', 'O que o autor quis dizer ao separar a moral cristã da ética do governante?']),

  createLesson('g2-phi-b4-l6', 'L6: Michel Foucault: A Microfísica do Poder', 'filosofia', 
    'Foucault argumenta que o poder não está apenas no Estado ou no Rei, mas circula em toda a sociedade. Ele chama isso de "Microfísica do Poder". O poder está nos hospitais, nas prisões e nas escolas, funcionando através da vigilância e do "adestramento" dos corpos, criando sujeitos produtivos e obedientes.', 
    ['Explique o conceito de "microfísica do poder" de Foucault.', 'Como o poder se manifesta nas relações cotidianas, como entre pais e filhos ou médicos e pacientes?']),

  createLesson('g2-phi-b4-l7', 'L7: Thomas Hobbes: O Leviatã e a Ordem Coletiva', 'filosofia', 
    'Revisitando Hobbes, focamos na ideia do Estado como um mal necessário para evitar o caos. O poder coletivo nasce de um pacto onde entregamos nossa força a um soberano (o Leviatã) para que ele mantenha a ordem. Sem um poder forte que "mantenha a todos em respeito", a sociedade desmoronaria em violência.', 
    ['Qual o papel do "medo" na construção do Estado coletivo para Hobbes?', 'Por que Hobbes acredita que o poder do soberano deve ser indivisível?']),

  createLesson('g2-phi-b4-l8', 'L8: John Locke: Propriedade e Liberdade Individual', 'filosofia', 
    'Locke defende que o poder do Estado deve ser limitado e focado na proteção dos direitos individuais. A legitimidade do governo vem do consentimento dos governados. Se o governante tenta exercer um poder absoluto ou viola a propriedade e a liberdade, ele perde o direito de mandar, e o povo tem o direito de resistência.', 
    ['O que diferencia a visão de poder de Locke da visão de Hobbes?', 'Por que, para Locke, o direito à resistência é fundamental para a democracia?']),

  createLesson('g2-phi-b4-l9', 'L9: Prática: Microfísica da Escola', 'filosofia', 
    'Nesta prática, os alunos atuarão como "observadores foucaultianos" da própria escola. Devem identificar: Quais os mecanismos de vigilância (inspetores, câmeras, filas)? Como o tempo é controlado (sinal)? Quais os prêmios e punições? O objetivo é refletir sobre como a escola molda nosso comportamento e o que é autoridade legítima nesse espaço.', 
    ['Descreva um mecanismo de poder que você identificou na escola e como ele afeta seu comportamento.', 'Em sua opinião, o poder exercido na escola é legítimo? Justifique sua resposta com base nos conceitos estudados.']),
];
