import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Filosofia 1ª Série: 9 aulas por bimestre (Total 36)
export const phiLessonsB1: Lesson[] = [
  createLesson('g1-phi-b1-l1', 'L1: O Nascimento da Filosofia: Do Mito ao Logos', 'filosofia', 
    'A Filosofia nasceu na Grécia Antiga como uma tentativa de explicar o mundo sem recorrer exclusivamente aos mitos. Enquanto o Mito explicava a realidade através de narrativas sobre deuses e forças sobrenaturais, o Logos (razão) buscava explicações lógicas, naturais e passíveis de debate. Essa mudança marcou o início do pensamento científico e racional no Ocidente.', 
    ['Qual a principal diferença entre uma explicação mítica e uma explicação racional (Logos)?', 'Por que a liberdade de debate nas praças gregas ajudou no nascimento da Filosofia?']),

  createLesson('g1-phi-b1-l2', 'L2: A Atitude Filosófica e o Espanto', 'filosofia', 
    'A Filosofia começa com o "espanto" (thaumazein) diante da existência. Ter uma atitude filosófica significa questionar o que parece óbvio, suspender nossos pré-conceitos e perguntar o "porquê" das coisas. Não é apenas acumular informações, mas desenvolver a capacidade de duvidar e investigar a raiz dos nossos conhecimentos.', 
    ['O que significa ter uma "atitude filosófica" no dia a dia?', 'Cite algo que parece "normal" para todo mundo, mas que te causa estranheza ou curiosidade quando você para para pensar profundamente.']),

  createLesson('g1-phi-b1-l3', 'L3: Tales de Mileto e a Busca pela Arché', 'filosofia', 
    'Tales é considerado o primeiro filósofo porque foi o primeiro a buscar um princípio natural (Arché) para todas as coisas, sem usar a religião. Ele propôs que a Água era a origem de tudo, observando que onde há vida, há umidade. Embora a resposta hoje pareça simples, o mérito foi a tentativa de encontrar uma causa física e única para o universo.', 
    ['Por que Tales de Mileto é chamado de "Pai da Filosofia"?', 'Explique o conceito de Arché e sua importância para o início da ciência.']),

  createLesson('g1-phi-b1-l4', 'L4: Pitágoras e a Matemática do Universo', 'filosofia', 
    'Para Pitágoras, o universo não era feito de matéria (como a água), mas de Números. Ele acreditava que a realidade possuía uma estrutura matemática harmoniosa, que podia ser ouvida na música e vista nas estrelas. O número era a linguagem secreta da natureza, uma ideia que ainda hoje fundamenta a física moderna.', 
    ['Como a visão de Pitágoras sobre a matemática difere da forma como estudamos matemática na escola?', 'Você acredita que a natureza segue regras matemáticas ou que nós inventamos a matemática para descrevê-la?']),

  createLesson('g1-phi-b1-l5', 'L5: Heráclito: O Devir e a Mudança Constante', 'filosofia', 
    'Heráclito defendia que nada no mundo é estático. Tudo flui (Panta Rhei). Sua frase famosa diz que "não podemos entrar duas vezes no mesmo rio", pois tanto nós quanto as águas já mudamos. O mundo é um equilíbrio de tensões e o fogo é o símbolo desse movimento eterno de criação e destruição.', 
    ['Explique a metáfora do rio de Heráclito.', 'Se tudo muda o tempo todo, como podemos dizer que as coisas (ou nós mesmos) continuam sendo as mesmas?']),

  createLesson('g1-phi-b1-l6', 'L6: Ética vs. Moral: Qual a Diferença?', 'filosofia', 
    'A Moral é o conjunto de regras, costumes e valores de um grupo ou sociedade (o que devemos fazer). A Ética é o estudo filosófico dessas regras; é a reflexão crítica sobre a moral (por que devemos fazer). Enquanto a moral pode mudar de cultura para cultura, a ética busca princípios universais para a conduta humana.', 
    ['Diferencie Ética de Moral com um exemplo prático da sua vida escolar.', 'Uma pessoa pode seguir todas as leis (ser moral) e ainda assim agir de forma antiética? Justifique.']),

  createLesson('g1-phi-b1-l7', 'L7: Aristóteles: A Ética da Virtude', 'filosofia', 
    'Para Aristóteles, o objetivo da vida é a felicidade (Eudaimonia). Ela não se atinge com prazeres imediatos, mas através da Virtude. A virtude é o "justo meio" (equilíbrio) entre dois excessos. Por exemplo, a coragem é o meio-termo entre a covardia (falta) e a temeridade (excesso). Ser ético é praticar o equilíbrio diariamente.', 
    ['O que Aristóteles entende por "Justo Meio"?', 'Como a prática de bons hábitos pode levar uma pessoa a ser mais feliz, segundo a visão aristotélica?']),

  createLesson('g1-phi-b1-l8', 'L8: Maquiavel e a Ética na Política', 'filosofia', 
    'Maquiavel separou a ética privada (religiosa ou pessoal) da ética política. Ele argumentou que um governante deve buscar a estabilidade do Estado acima de tudo. Se para manter a paz ele precisar agir de forma severa, ele deve fazê-lo. A política passou a ser vista como a arte da eficácia, onde os resultados importam tanto quanto as intenções.', 
    ['No contexto da política, o que Maquiavel quis dizer ao separar a moral cristã da ação do príncipe?', 'Você concorda que na política "os fins justificam os meios"? Por quê?']),

  createLesson('g1-phi-b1-l9', 'L9: Prática: Roda de Conversa - Dilemas Éticos', 'filosofia', 
    'Nesta prática, a turma analisará dilemas clássicos (como o Dilema do Trem). O objetivo é aplicar os conceitos de virtude e responsabilidade para decidir qual a melhor ação. Os alunos devem defender seus pontos de vista respeitando a lógica e a ética do diálogo, exercitando a cidadania socrática.', 
    ['Descreva um dilema ético que você já presenciou ou ouviu falar.', 'Como os conceitos estudados neste bimestre (equilíbrio, razão, justiça) te ajudariam a resolver esse dilema?']),
];

export const phiLessonsB2: Lesson[] = [
  createLesson('g1-phi-b2-l1', 'L1: O Conceito de Ideologia e suas Origens', 'filosofia', 
    'Originalmente, ideologia significava "ciência das ideias". Hoje, na filosofia, ela descreve um conjunto de ideias que mascaram a realidade social para manter o poder de certos grupos. A ideologia nos faz acreditar que a forma como o mundo está organizado é "natural" e "imutável", quando na verdade é uma construção histórica que favorece alguns em detrimento de outros.', 
    ['O que você entende por ideologia no sentido moderno da palavra?', 'Como a ideologia pode fazer com que aceitemos injustiças como se fossem algo natural?']),

  createLesson('g1-phi-b2-l2', 'L2: Karl Marx: A Câmera Escura da Realidade', 'filosofia', 
    'Marx comparou a ideologia a uma "câmera escura" (um aparelho que projeta a imagem invertida). Para ele, a classe que domina a economia também domina as ideias. A ideologia serve para alienar o trabalhador, impedindo-o de perceber que ele está sendo explorado, fazendo com que ele adote os valores de quem o oprime.', 
    ['Explique a metáfora da "câmera escura" usada por Marx.', 'De que forma as ideias da classe dominante influenciam o que pensamos sobre o sucesso e o fracasso?']),

  createLesson('g1-phi-b2-l3', 'L3: Teorias Socialistas e a Crítica ao Capital', 'filosofia', 
    'As teorias socialistas surgiram como uma crítica à exploração gerada pelo capitalismo industrial. Filósofos socialistas propuseram que a propriedade dos meios de produção deveria ser coletiva e que o objetivo da economia não deveria ser o lucro individual, mas o bem-estar de toda a sociedade, combatendo a ideologia da meritocracia absoluta.', 
    ['Qual a principal crítica que o socialismo faz ao sistema capitalista?', 'Você acha que é possível equilibrar a busca pelo lucro com o bem-estar social? Justifique.']),

  createLesson('g1-phi-b2-l4', 'L4: Democracia: Ideal Político ou Ideologia?', 'filosofia', 
    'A democracia é apresentada como o governo do povo, mas muitas vezes funciona como uma ideologia que esconde que apenas quem tem dinheiro consegue de fato participar da política. Refletir criticamente sobre a democracia significa lutar para que ela deixe de ser apenas um discurso e se torne uma prática real de inclusão e direitos para todos.', 
    ['Quando a democracia pode ser usada como uma "ideia que esconde a realidade"?', 'Quais ações poderiam tornar a nossa democracia mais real e menos ideológica?']),

  createLesson('g1-phi-b2-l5', 'L5: Michel Serres: O Grito da Terra', 'filosofia', 
    'O filósofo Michel Serres propõe um "Contrato Natural". Ele argumentu que, assim como fizemos contratos sociais entre humanos, precisamos fazer um pacto com a Terra. A natureza não é mais um objeto passivo; ela "grita" através das mudanças climáticas e exige ser tratada como um sujeito de direitos.', 
    ['O que Michel Serres quer dizer com o "Contrato Natural"?', 'Por que precisamos ver a natureza como um "parceiro" e não apenas como um depósito de recursos?']),

  createLesson('g1-phi-b2-l6', 'L6: Ética Ambiental e o Fim do Antropocentrismo', 'filosofia', 
    'O antropocentrismo coloca o ser humano como o centro do universo. A ética ambiental desafia essa visão, propondo o biocentrismo ou ecocentrismo: a ideia de que a vida (em todas as suas formas) tem valor por si mesma. Não devemos proteger o Cerrado apenas porque ele nos dá água, mas porque ele tem o direito de existir.', 
    ['Diferencie antropocentrismo de ecocentrismo.', 'Como a mudança para uma visão ecocêntrica alteraria o modo como vivemos e consumimos?']),

  createLesson('g1-phi-b2-l7', 'L7: Saberes Indígenas: Uma Outra Razão', 'filosofia', 
    'A filosofia ocidental muitas vezes ignorou os saberes dos povos originários. Pensadores como Ailton Krenak mostram que os indígenas possuem uma racionalidade profunda baseada na alteridade (respeito ao outro) e na conexão espiritual com o território. Aprender com eles é entender que existem outras formas de "estar no mundo" que não a destruição.', 
    ['O que podemos aprender com a relação que os povos indígenas têm com a terra?', 'Por que o reconhecimento de diferentes tipos de "razão" é importante para a filosofia?']),

  createLesson('g1-phi-b2-l8', 'L8: Ética da Responsabilidade e o Futuro', 'filosofia', 
    'Hans Jonas propôs o "Princípio Responsabilidade": devemos agir de tal forma que as nossas ações não destruam a possibilidade de vida humana no futuro. Isso exige que sejamos éticos com quem ainda não nasceu. A nossa liberdade hoje não pode significar a escravidão das gerações futuras em um planeta morto.', 
    ['O que Jonas quer dizer com "agir com responsabilidade para o futuro"?', 'Cite uma ação do presente que demonstra falta de ética com as gerações que ainda virão.']),

  createLesson('g1-phi-b2-l9', 'L9: Prática: Ideologia na Timeline - O Relatório', 'filosofia', 
    'Nesta prática, os alunos devem analisar posts em redes sociais ou propagandas atuais e identificar quais ideias "escondidas" (ideologias) eles transmitem (ex: padrão de beleza impossível, consumo como felicidade). O aluno escreverá um pequeno relatório ligando a teoria de Marx e Serres com o que viu na sua tela.', 
    ['Qual ideologia você identificou na postagem ou propaganda que analisou?', 'Como essa mensagem afeta a forma como as pessoas se sentem sobre si mesmas ou sobre o planeta?']),
];

export const phiLessonsB3: Lesson[] = [
  createLesson('g1-phi-b3-l1', 'L1: Karl Marx e o Trabalho Alienado', 'filosofia', 
    'Para Marx, a alienação acontece quando o trabalhador não se reconhece no produto que criou. No sistema industrial ou tecnológico, o ser humano torna-se uma peça da engrenagem, perdendo a conexão com sua criatividade e com o sentido do seu esforço. O trabalho, que deveria ser a realização do homem, passa a ser apenas um meio doloroso de sobrevivência.', 
    ['O que Marx entende por "trabalho alienado"?', 'Como a rotina de estudos ou trabalho pode se tornar alienante nos dias de hoje?']),

  createLesson('g1-phi-b3-l2', 'L2: Consumo e Status: O Ser vs. Ter', 'filosofia', 
    'Vivemos em uma cultura onde o "Ter" muitas vezes vale mais que o "Ser". O consumo deixou de ser uma necessidade básica para se tornar uma forma de exibir status e buscar aprovação social. A filosofia nos convida a questionar: as coisas que eu compro definem quem eu sou ou elas apenas mascaram o meu vazio interior?', 
    ['Explique a diferença entre "Ser" e "Ter" no contexto do consumo atual.', 'Por que muitas vezes sentimos necessidade de mostrar o que compramos nas redes sociais?']),

  createLesson('g1-phi-b3-l3', 'L3: Indústria Cultural: Diversão ou Controle?', 'filosofia', 
    'A Escola de Frankfurt criou o conceito de Indústria Cultural para descrever como a arte, a música e o cinema tornaram-se mercadorias feitas em série. O objetivo não é mais a reflexão, mas o entretenimento passivo que nos mantém dóceis e integrados ao sistema. A diversão passa a ser uma forma de controle que impede o pensamento crítico.', 
    ['O que é a Indústria Cultural e qual o seu principal objetivo?', 'Cite um exemplo de filme ou música que você considera "feito em série" apenas para vender.']),

  createLesson('g1-phi-b3-l4', 'L4: A Padronização do Gosto e do Estilo', 'filosofia', 
    'A indústria cultural impõe padrões de beleza, moda e comportamento que todos sentem que devem seguir. Essa padronização apaga as diferenças individuais e regionais, criando uma massa de consumidores que desejam as mesmas marcas. A autonomia do gosto é substituída por tendências ditadas por algoritmos e celebridades.', 
    ['Como a moda e as redes sociais influenciam a padronização do nosso estilo?', 'É possível ter um gosto "próprio" em um mundo tão conectado? Justifique.']),

  createLesson('g1-phi-b3-l5', 'L5: Fetiche da Mercadoria e Coisificação', 'filosofia', 
    'O "fetiche da mercadoria" é quando atribuímos poderes mágicos aos produtos (ex: "esse tênis vai me dar sucesso"). Esquecemos que por trás do objeto existe o trabalho de seres humanos. A coisificação (reificação) ocorre quando tratamos pessoas como coisas e coisas como se tivessem vida e personalidade própria.', 
    ['Explique o conceito de fetiche da mercadoria com um exemplo de marca famosa.', 'O que significa a "coisificação" das relações humanas hoje?']),

  createLesson('g1-phi-b3-l6', 'L6: Immanuel Kant: O que é Esclarecimento?', 'filosofia', 
    'Kant define esclarecimento (Aufklärung) como a saída do homem da menoridade intelectual. Menoridade é a incapaciade de usar a própria razão sem a guia de outrem. O lema de Kant é "Sapere Aude!" (Ouse saber!). Ser esclarecido é ter coragem de pensar por si mesmo, sem se deixar levar por preconceitos ou autoridades.', 
    ['Segundo Kant, o que impede as pessoas de pensarem por conta própria?', 'O que significa o lema "Sapere Aude" no contexto da escola?']),

  createLesson('g1-phi-b3-l7', 'L7: Jean-Paul Sartre: Condenados a ser Livres', 'filosofia', 
    'Sartre afirma que "a existência precede a essência": não nascemos com um destino pronto, nós nos construímos através de nossas escolhas. Por não termos um manual de instruções, estamos "condenados à liberdade". Essa liberdade gera angústia, pois somos os únicos responsáveis por quem somos e pelo mundo que ajudamos a criar.', 
    ['Explique a frase de Sartre: "Estamos condados a ser livres".', 'Se somos totalmente responsáveis por nossas escolhas, por que muitas vezes culpamos o "destino" ou os outros?']),

  createLesson('g1-phi-b3-l8', 'L8: Autonomia do Sujeito e a Construção do Eu', 'filosofia', 
    'A autonomia é a capacidade de criar as próprias leis e agir de acordo com valores que nós mesmos escolhemos racionalmente. Construir o "Eu" exige resistir à pressão do grupo e à alienação do consumo. É um processo contínuo de autoconhecimento e posicionamento ético diante da vida.', 
    ['O que diferencia uma pessoa autônoma de uma pessoa heterônoma (que segue ordens externas)?', 'Como a filosofia pode ajudar um jovem a construir sua própria identidade?']),

  createLesson('g1-phi-b3-l9', 'L9: Prática: Quanto Custa seu Look? - O Debate', 'filosofia', 
    'Nesta prática, os alunos debaterão o impacto do consumo de moda (fast fashion) na sua identidade e no planeta. Devem analisar se a escolha das roupas é um ato de expressão autêntica ou de alienação. O objetivo é conectar a teoria de Marx (alienação) e Sartre (escolha) com a realidade do guarda-roupa.', 
    ['Em sua opinião, as roupas que você usa expressam quem você é ou apenas quem a moda diz que você deve ser?', 'Qual o custo ambiental e humano escondido por trás de uma peça de roupa barata e da moda?']),
];

export const phiLessonsB4: Lesson[] = [
  createLesson('g1-phi-b4-l1', 'L1: Rousseau e o Bom Selvagem', 'filosofia', 
    'Jean-Jacques Rousseau imaginou o ser humano em seu "estado de natureza" como alguém livre, saudável e feliz, guiado pelo amor de si e pela piedade. Para ele, o homem nasce bom, mas a sociedade o corrompe. A metáfora do "Bom Selvagem" não é sobre ser primitivo, mas sobre uma pureza original que perdemos com a civilização artificial.', 
    ['O que Rousseau quis dizer com a ideia de que o homem nasce bom, mas a sociedade o corrompe?', 'Como a visão de Rousseau sobre a natureza humana difere da ideia de que somos naturalmente maus?']),

  createLesson('g1-phi-b4-l2', 'L2: Origem da Desigualdade', 'filosofia', 
    'Segundo Rousseau, a desigualdade começou no momento em que o primeiro homem cercou um terreno e disse "isso é meu", encontrando pessoas tolas o suficiente para acreditar. A propriedade privada criou a divisão entre ricos e pobres, gerando a inveja, a guerra e as leis feitas apenas para proteger os donos das terras.', 
    ['Qual o papel da propriedade privada no surgimento da desigualdade para Rousseau?', 'Você concorda que a desigualdade é uma construção da sociedade ou ela é natural? Justifique.']),

  createLesson('g1-phi-b4-l3', 'L3: Vontade Geral', 'filosofia', 
    'Para superar a injustiça, Rousseau propõe o Contrato Social baseado na Vontade Geral. Ela não é a simples soma das vontades individuais (egoístas), mas o que é melhor para o bem comum. No Contrato Social, cada cidadão deixa de ser um súdito para ser parte do soberano, criando leis às quais ele mesmo obedece.', 
    ['Diferencie a "Vontade de Todos" (soma de interesses) da "Vontade Geral" (bem comum).', 'Como a Vontade Geral pode garantir a liberdade em uma democracia?']),

  createLesson('g1-phi-b4-l4', 'L4: Kant e a Sociabilidade', 'filosofia', 
    'Immanuel Kant observou que o ser humano vive em uma "insociável sociabilidade". Temos o desejo de viver em grupo para nos protegermos, mas também o desejo egoísta de mandar nos outros. Esse conflito é o que nos obriga a criar leis e a desenvolver a cultura e a ética para que possamos conviver em paz.', 
    ['O que Kant quer dizer com o termo "insociável sociabilidade"?', 'Por que o conflito entre egoísmo e cooperação é importante para o progresso da humanidade?']),

  createLesson('g1-phi-b5-l5', 'L5: Exclusão e o "Outro"', 'filosofia', 
    'A história da filosofia muitas vezes ignorou quem não era o "padrão" (homem, branco, europeu). O "Outro" (mulheres, negros, indígenas, imigrantes) foi visto como inferior ou perigoso. Refletir sobre a exclusão é perceber como as nossas categorias mentais muitas vezes criam muros invisíveis que impedem a dignidade de quem é diferente.', 
    ['O que significa transformar uma pessoa no "Outro" ou no "diferente"?', 'Como a filosofia pode ajudar a combater o preconceito e a exclusão social?']),

  createLesson('g1-phi-b4-l6', 'L6: Minorias e Representatividade', 'filosofia', 
    'Na política, "minoria" não se refere apenas à quantidade, mas ao poder. Grupos que têm seus direitos negados ou vozes silenciadas são minorias políticas. A representatividade é o direito desses grupos de ocupar espaços de decisão, garantindo que suas necessidades reais sejam ouvidas e transformadas em leis.', 
    ['O que diferencia uma minoria numérica de uma minoria política?', 'Por que a presença de diferentes grupos nos governos é vital para a justiça social?']),

  createLesson('g1-phi-b4-l7', 'L7: Ética da Alteridade', 'filosofia', 
    'Filósofos como Emmanuel Lévinas defendem que a ética começa no "Rosto do Outro". Ser ético não é seguir regras frias, mas sentir-se responsável pela vida e pelo sofrimento de quem está diante de nós. A alteridade exige que eu reconheça que o outro é um mundo infinito que eu nunca poderei dominar totalmente.', 
    ['O que Lévinas quer dizer com a "responsabilidade pelo rosto do outro"?', 'Como a ética da alteridade mudaria a forma como você trata as pessoas na sua escola?']),

  createLesson('g1-phi-b4-l8', 'L8: Direitos Civis', 'filosofia', 
    'Os direitos civis são as garantias de liberdade individual: direito à vida, à expressão, à religião e à igualdade perante a lei. Eles são o escudo do cidadão contra o abuso de poder do Estado e da maioria. Sem direitos civis garantidos, a democracia se torna uma tirania da massa sobre os indivíduos.', 
    ['Cite três direitos civis que você considera fundamentais hoje.', 'Por que os direitos civis devem proteger até mesmo quem tem ideias impopulares?']),

  createLesson('g1-phi-b4-l9', 'L9: Prática: O Contrato Escolar', 'filosofia', 
    'Nesta prática final, os alunos atuarão como "legisladores". Devem redigir um "Contrato Social da Sala", definindo regras de convivência, punições justas e formas de auxílio mútuo. O pacto deve buscar a Vontade Geral e o respeito às minorias da própria turma, sendo assinado por todos.', 
    ['Qual regra do Contrato Social da sua sala você achou mais difícil de negociar?', 'Como a construção coletiva de regras muda a sua vontade de obedecê-las?']),
];
