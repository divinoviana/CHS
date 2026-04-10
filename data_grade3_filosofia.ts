import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Filosofia 3ª Série: 9 aulas por bimestre (Total 36)
export const phiLessonsB1: Lesson[] = [
  createLesson('g3-phi-b1-l1', 'L1: O que é a Razão? O Logos contra o Caos', 'filosofia', 
    'A Razão (ou Logos, em grego) é a capacidade humana de organizar o pensamento de forma lógica para compreender a realidade. Enquanto o mito explica o mundo por meio de forças arbitrárias e sobrenaturais (caos), a razão busca leis universais, ordem e previsibilidade. Ter razão significa ser capaz de justificar suas crenças por meio de argumentos demonstráveis.', 
    ['Explique a transição do pensamento mítico para o pensamento racional (Logos).', 'Por que a busca pela ordem é uma característica central da razão humana?']),

  createLesson('g3-phi-b1-l2', 'L2: O Nascimento do Pensamento Científico', 'filosofia', 
    'A ciência moderna não nasceu apenas da observação, mas de uma mudança de atitude mental. No século XVII, filósofos começaram a defender que a natureza funciona como uma máquina cujas engrenagens podemos entender através da matemática. O pensamento científico exige rigor, método e a recusa de explicações baseadas apenas na autoridade da tradição ou da fé.', 
    ['O que diferencia uma explicação de senso comum de uma explicação científica?', 'Como a matemática se tornou a linguagem principal da ciência moderna?']),

  createLesson('g3-phi-b1-l3', 'L3: René Descartes: A Dúvida Metódica', 'filosofia', 
    'René Descartes, o pai do racionalismo moderno, decidiu duvidar de tudo o que não fosse absolutamente certo. Ele percebeu que nossos sentidos nos enganam e que muitas vezes confundimos sonhos com a realidade. A "Dúvida Metódica" não é o ceticismo de quem não acredita em nada, mas uma ferramenta para limpar o terreno e encontrar uma verdade inabalável.', 
    ['Por que Descartes afirma que os sentidos (visão, audição, etc.) não são fontes totalmente seguras de conhecimento?', 'Diferencie a dúvida cética (desistir da verdade) da dúvida metódica (usar a dúvida para achar a verdade).']),

  createLesson('g3-phi-b1-l4', 'L4: Cogito Ergo Sum: Penso, logo existo', 'filosofia', 
    'Ao levar a dúvida ao extremo, Descartes percebeu uma coisa: mesmo que um "gênio maligno" me engane sobre tudo, eu preciso existir para ser enganado. Se eu duvido, eu penso; se penso, eu sou um ser que existe. O "Cogito" é a primeira certeza do racionalismo, colocando o Sujeito e a Consciência no centro do conhecimento humano.', 
    ['Explique the raciocínio que levou Descartes à frase "Penso, logo existo".', 'Por que o pensamento é uma prova de existência mais sólida do que o corpo físico para Descartes?']),

  createLesson('g3-phi-b1-l5', 'L5: Racionalismo e a Geometria da Verdade', 'filosofia', 
    'Para os racionalistas, a razão possui "ideias inatas" que não dependem da experiência. O modelo de verdade ideal é a Geometria: a partir de axiomas simples e lógicos, podemos deduzir verdades complexas com total certeza. O conhecimento verdadeiro é aquele que é "claro e distinto" para a mente, independente do que os olhos veem.', 
    ['O que são ideias inatas segundo o racionalismo?', 'Por que a geometria serviu de inspiração para a construção do método filosófico de Descartes?']),

  createLesson('g3-phi-b1-l6', 'L6: Introdução à Lógica Formal e Aristóteles', 'filosofia', 
    'A Lógica é o estudo das regras do pensamento correto. Aristóteles foi o primeiro a sistematizá-la, criando princípios fundamentais: 1. Identidade (A é A); 2. Não-Contradição (A não pode ser B ao mesmo tempo); 3. Terceiro Excluído (ou algo é verdade, ou é falso, não há meio termo). A lógica não diz "o que" pensar, mas "como" organizar os pensamentos para evitar erros.', 
    ['Explique o princípio da não-contradição com um exemplo do seu dia a dia.', 'Qual a função da lógica na construção de um debate saudável?']),

  createLesson('g3-phi-b1-l7', 'L7: O Silogismo: Estrutura da Dedução', 'filosofia', 
    'O Silogismo é a forma clássica de raciocínio dedutivo. Ele é composto por duas premissas e uma conclusão (Ex: Todo homem é mortal; Sócrates é homem; logo, Sócrates é mortal). Se as premissas forem verdadeiras e a estrutura for válida, a conclusão é obrigatoriamente verdadeira. É a base da demonstração matemática e jurídica.', 
    ['Identifique as premissas e a conclusão no exemplo do texto.', 'Crie um silogismo próprio e verifique se ele é logicamente válido.']),

  createLesson('g3-phi-b1-l8', 'L8: Tipos de Argumento: Indução e Analogia', 'filosofia', 
    'Diferente da Dedução (do geral para o particular), a Indução parte de observações repetidas para criar uma lei geral (Ex: observei mil cisnes brancos, logo todos os cisnes são brancos). Já a Analogia compara semelhanças entre coisas diferentes para tirar conclusões. Embora úteis na ciência e na vida, esses argumentos são apenas prováveis e podem falhar (como encontrar um cisne negro).', 
    ['Diferencie um argumento dedutivo de um argumento indutivo.', 'Dê um exemplo de como usamos a analogia em uma conversa comum e por que ela pode ser perigosa.']),

  createLesson('g3-phi-b1-l9', 'L9: Prática: Detetives da Lógica', 'filosofia', 
    'Nesta prática, os alunos analisarão textos de jornais ou falas de políticos para encontrar falácias (erros de raciocínio). Devem classificar argumentos como dedutivos ou indutivos e verificar se existe coerência lógica entre o que foi dito e a conclusão apresentada. O objetivo é desenvolver um "filtro de mentiras" baseado na razão.', 
    ['Descreva uma falácia que você já ouviu em uma discussion ou propaganda.', 'Como o estudo da lógica te ajuda a não ser enganado por argumentos falsos na internet?']),
];

export const phiLessonsB2: Lesson[] = [
  createLesson('g3-phi-b2-l1', 'L1: Estética: A Experiência do Belo', 'filosofia', 
    'A Estética é o ramo da filosofia que estuda a percepção sensorial, o belo e a arte. Enquanto Platão via o belo como algo absoluto e divino, Kant argumentou que o juízo de gosto é subjetivo ("está nos olhos de quem vê"), mas ainda assim buscamos um acordo comum sobre o que é uma obra de arte. A estética nos ajuda a entender como as formas e cores afetam nossas emoções e nossa visão de mundo.', 
    ['Você acredita que a beleza é algo que existe na coisa ou é apenas uma opinião de quem observa?', 'Por que algumas obras de arte nos causam desconforto em vez de prazer?']),

  createLesson('g3-phi-b2-l2', 'L2: A Evolução da Fotografia e a Verdade', 'filosofia', 
    'A fotografia nasceu com a promessa de ser um "espelho da realidade". No entanto, desde o ângulo escolhido até o uso de filtros e edição digital, a imagem fotográfica é sempre uma construção. Na era do Instagram, a "estética do filtro" cria uma realidade paralela onde a imperfeição é escondida, questionando o limite entre o registro fiel e a simulação artística.', 
    ['Como os filtros das redes sociais mudam nossa percepção do que é um "rosto real"?', 'Uma foto editada ainda pode ser considerada um registro da verdade? Justifique.']),

  createLesson('g3-phi-b2-l3', 'L3: O Panóptico e a Vigilância Digital', 'filosofia', 
    'O Panóptico era um projeto de prisão idealizado por Jeremy Bentham onde um único vigia poderia observar todos os presos sem ser visto. Michel Foucault usou essa ideia para explicar como a sociedade moderna nos vigia. Hoje, as redes sociais funcionam como um panóptico digital: nós mesmos nos vigiamos e exibimos, moldando nosso comportamento porque sabemos que estamos sendo observados por "curtidas" e algoritmos.', 
    ['Explique a relação entre o conceito de Panóptico e o uso das redes sociais.', 'De que forma saber que está sendo "visto" na internet muda o jeito que você age?']),

  createLesson('g3-phi-b2-l4', 'L4: Privacidade e Exposição na Rede', 'filosofia', 
    'A fronteira entre o público e o privado desapareceu na era digital. A exposição constante gera o fenômeno da "extimidade" (tornar íntimo o que é externo). Essa superexposição traz dilemas éticos: até onde vai o nosso direito à privacidade quando os algoritmos vendem nossos dados e a nossa vida pessoal vira entretenimento para estranhos?', 
    ['Qual o preço que pagamos pela "fama digital" em termos de privacidade?', 'Por que sentimos necessidade de compartilhar momentos íntimos com pessoas que mal conhecemos?']),

  createLesson('g3-phi-b2-l5', 'L5: Estética do Consumo: Nós somos Mercadorias?', 'filosofia', 
    'Na estética do consumo, a imagem pessoal torna-se um produto. Influenciadores digitais gerenciam sua vida como se fosse uma marca, vendendo um estilo de vida padronizado. Isso gera a "coisificação" do sujeito: deixamos de ser pessoas com profundidade para nos tornarmos perfis que precisam gerar engajamento e lucro, transformando a própria existência em uma mercadoria visual.', 
    ['O que significa dizer que uma pessoa se tornou uma "marca pessoal"?', 'Como a busca por engajamento pode esvaziar a autenticidade de alguém?']),

  createLesson('g3-phi-b2-l6', 'L6: Existencialismo: Existência precede a Essência', 'filosofia', 
    'Jean-Paul Sartre revolucionou a filosofia ao afirmar que, no ser humano, a existência vem antes da essência. Diferente de uma tesoura, que é fabricada com um fim definido, o homem primeiro existe, aparece no mundo e só depois se define através de suas escolhas. Não há um destino pronto ou uma natureza humana pré-determinada; somos o que fazemos de nós mesmos.', 
    ['Explique a frase fundamental de Sartre: "A existência precede a essência".', 'Se não temos uma essência pronta ao nascer, quem é o responsável pelo que nos tornamos?']),

  createLesson('g3-phi-b2-l7', 'L7: Sartre: Condenados a ser Livres', 'filosofia', 
    'Para Sartre, a liberdade não é um presente, mas um peso. Estamos "condenados à liberdade" porque, uma vez lançados no mundo, somos responsáveis por tudo o que fazemos. Fugir dessa responsabilidade é agir com "Má-Fé" (fingir que não tivemos escolha). A liberdade gera angústia, pois cada escolha nossa ajuda a definir o que é ser humano para toda a sociedade.', 
    ['O que Sartre define como "Má-Fé"?', 'Por que a liberdade absoluta causa o sentimento de angústia nas pessoas?']),

  createLesson('g3-phi-b2-l8', 'L8: Kierkegaard: Angústia e o Salto da Fé', 'filosofia', 
    'Søren Kierkegaard, o pai do existencialismo cristão, foca na individualidade e na dor de escolher. Para ele, a angústia é a "vertigem da liberdade". Diante do absurdo da vida e da impossibilidade de ter certezas racionais totais, o indivíduo deve dar um "salto da fé" – uma escolha radical e subjetiva que dá sentido à sua existência pessoal.', 
    ['Qual a diferença entre a angústia em Sartre (ateu) e em Kierkegaard (cristão)?', 'O que significa dar um "salto da fé" em uma decisão importante da vida?']),

  createLesson('g3-phi-b2-l9', 'L9: Prática: Minha Imagem na Rede', 'filosofia', 
    'Nesta prática, os alunos farão uma "arqueologia" de seus próprios perfis digitais. Devem analisar: Quais filtros costumam usar? Que tipo de "eu" estão tentando vender? O que é real e o que é encenação? O objetivo é aplicar os conceitos de Estética e Existencialismo para refletir sobre a própria construção da identidade no mundo virtual.', 
    ['Ao olhar para o seu perfil, você vê a sua "essência" ou apenas uma "aparência" construída para os outros?', 'Como você pode exercer sua liberdade de forma autêntica em um ambiente controlado por algoritmos?']),
];

export const phiLessonsB3: Lesson[] = [
  createLesson('g3-phi-b3-l1', 'L1: Imperialismo e a Ética da Dominação', 'filosofia', 
    'A expansão imperialista do século XIX foi justificada por teorias que hoje consideramos pseudo-filosóficas, como o Darwinismo Social. A ideia de que "raças" ou nações mais fortes teriam o "dever ético" de civilizar as outras serviu de máscara para a exploração econômica violenta. Refletir sobre isso é entender como o poder distorce a ética para legitimar a dominação.', 
    ['Como o Darwinismo Social foi usado para justificar o Imperialismo?', 'Qual a relação entre ética e poder no discurso de "missão civilizadora" dos europeus?']),

  createLesson('g3-phi-b3-l2', 'L2: Bioética: O Valor e a Manipulação da Vida', 'filosofia', 
    'A Bioética surgiu diante dos avanços da medicina e biologia que permitem manipular a vida. Temas como edição genética (CRISPR), clonagem e transplantes nos obrigam a perguntar: existe um limite para a intervenção humana na natureza? A vida é um valor absoluto ou pode ser "melhorada" artificialmente conforme nossos desejos?', 
    ['O que você entende por edição genética e quais os riscos éticos envolvidos?', 'Até que ponto o ser humano deve interferir nas características biológicas de um futuro bebê?']),

  createLesson('g3-phi-b3-l3', 'L3: Bioética: Morte Digna e Eutanásia', 'filosofia', 
    'A medicina moderna consegue prolongar a vida biológica por muito tempo, mas nem sempre garante a qualidade dessa vida. O debate sobre eutanásia, suicídio assistido e ortotanásia envolve o direito à autonomia individual: o ser humano deve ser livre para decidir o momento e a forma de sua própria morte em caso de sofrimento extremo?', 
    ['Diferencie eutanásia de cuidados paliativos.', 'Em sua opinião, o direito à vida deve ser uma obrigação mesmo em casos de dor incurável? Justifique.']),

  createLesson('g3-phi-b3-l4', 'L4: Ética Empresarial e Lucro Consciente', 'filosofia', 
    'No capitalismo contemporâneo, as empresas são cobradas por uma postura ética. O conceito de ESG (Ambiental, Social e Governança) propõe que o lucro não pode ser o único objetivo; a empresa deve ser socialmente responsável e transparente. Mas como diferenciar o lucro consciente da maquiagem ética (greenwashing)?', 
    ['O lucro a qualquer custo pode ser considerado ético em algum cenário?', 'Como as escolhas do consumidor podem forçar as empresas a agirem de forma mais ética?']),

  createLesson('g3-phi-b3-l5', 'L5: Ética Animal e Científica', 'filosofia', 
    'Tradicionalmente, a filosofia viu os animais como objetos ou "máquinas biológicas". Filósofos atuais defendem que animais são seres sencientes (capazes de sentir dor e prazer) e possuem direitos. O uso de animais em testes científicos e na indústria alimentícia é um dos maiores dilemas éticos da nossa época.', 
    ['O que significa dizer que um animal é um "ser senciente"?', 'Você acredita que o progresso científico justifica o sofrimento animal em laboratórios? Por quê?']),

  createLesson('g3-phi-b3-l6', 'L6: Kant: O Dever e os Direitos Universais', 'filosofia', 
    'Immanuel Kant defendia uma ética baseada na razão e no dever. Seu "Imperativo Categórico" diz que devemos agir apenas conforme regras que gostaríamos que se tornassem leis universais. Para Kant, o ser humano é um "fim em si mesmo" e nunca deve ser usado como um simples meio para atingir um objetivo ou lucro.', 
    ['Explique o conceito de Imperativo Categórico de Kant.', 'Como a ideia de que o ser humano é um "fim em si mesmo" fundamenta os Direitos Humanos?']),

  createLesson('g3-phi-b3-l7', 'L7: Wittgenstein: Linguagem e Justiça', 'filosofia', 
    'Ludwig Wittgenstein afirmou que "os limites da minha linguagem são os limites do meu mundo". Na justiça, as palavras que usamos (como "crime", "liberdade", "justiça") dependem do contexto social, os chamados "jogos de linguagem". Entender como a linguagem molda nossa visão de mundo é essencial para evitar injustiças causadas por interpretações erradas.', 
    ['O que Wittgenstein quis dizer com a frase: "Sobre aquilo de que não se pode falar, deve-se calar"?', 'Como o significado da palavra "justiça" pode mudar em diferentes situações ou culturas?']),

  createLesson('g3-phi-b3-l8', 'L8: Justiça Social e o Bem Comum', 'filosofia', 
    'A justiça não é apenas punir culpados, mas distribuir direitos e deveres de forma equitativa. Teorias modernas discutem o "Bem Comum": como garantir que o crescimento da sociedade beneficie a todos e não apenas uma minoria? A justiça social exige que olhemos para os vulneráveis e busquemos a equidade, não apenas a igualdade formal.', 
    ['Qual a diferença entre igualdade e equidade?', 'Em sua opinião, o que é mais importante para uma sociedade justa: a liberdade individual ou o bem-estar coletivo?']),

  createLesson('g3-phi-b3-l9', 'L9: Prática: Tribunal da Bioética', 'filosofia', 
    'Nesta prática, a turma realizará uma simulação de julgamento sobre um dilema real de bioética (ex: a permissão de bebês projetados ou o uso de IA para decisões médicas). Grupos representarão a acusação, a defesa e o júri. O objetivo é exercitar a argumentação lógica e os princípios éticos estudados.', 
    ['Descreva qual foi o seu papel no Tribunal da Bioética e qual o seu principal argumento.', 'Como o debate em grupo ajudou a mudar ou reforçar sua opinião sobre o tema?']),
];

export const phiLessonsB4: Lesson[] = [
  createLesson('g3-phi-b4-l1', 'L1: Adam Smith: A Mão Invisível e o Interesse Próprio', 'filosofia', 
    'Adam Smith, o pai da economia moderna, argumentou que quando cada indivíduo busca seu próprio interesse econômico, uma "mão invisível" acaba promovendo o bem-estar de toda a sociedade. Para ele, o mercado se autorregula através da oferta e procura. No entanto, a ética smithiana exige que essa busca pelo lucro ocorra dentro de um quadro de justiça e simpatia mútua.', 
    ['Explique o conceito de "mão invisível" de Adam Smith.', 'Como a busca pelo interesse próprio pode, teoricamente, beneficiar a coletividade?']),

  createLesson('g3-phi-b4-l2', 'L2: David Ricardo: Valor, Renda e Trabalho', 'filosofia', 
    'David Ricardo aprofundou a análise econômica focando no valor das mercadorias, que para ele deriva da quantidade de trabalho necessária para produzi-las. Ele também discutiu a "Lei do Ferro dos Salários" e a renda da terra, mostrando como a economia é um sistema de distribuição de riqueza entre diferentes classes sociais (trabalhadores, capitalistas e proprietários).', 
    ['Qual a relação entre trabalho e valor de uma mercadoria para David Ricardo?', 'Explique a preocupação de Ricardo com a divisão da riqueza entre as classes sociais.']),

  createLesson('g3-phi-b4-l3', 'L3: Jeremy Bentham e o Cálculo da Utilidade', 'filosofia', 
    'O Utilitarismo de Bentham propõe que a moralidade de uma ação deve ser medida pela sua utilidade: "a maior felicidade para o maior número de pessoas". Ele criou um cálculo de prazeres e dores (felicific calculus) para guiar as leis e as decisões individuais, onde o que importa é a consequência prática da ação para o bem-estar geral.', 
    ['O que significa o princípio utilitarista da "maior felicidade"?', 'Como o cálculo de prazeres de Bentham tenta transformar a ética em uma ciência exata?']),

  createLesson('g3-phi-b4-l4', 'L4: John Stuart Mill e a Liberdade Individual', 'filosofia', 
    'Stuart Mill refinou o utilitarismo, defendendo que existem prazeres qualitativamente superiores (intelectuais e morais) aos sensoriais. Ele foi o maior defensor da liberdade individual, afirmando que o Estado só pode interferir na liberdade de alguém para evitar que esta pessoa cause dano a terceiros (Princípio do Dano).', 
    ['Diferencie prazeres superiores de prazeres inferiores segundo Stuart Mill.', 'Por que Mill acredita que a liberdade de expressão é vital mesmo quando a opinião é errada?']),

  createLesson('g3-phi-b4-l5', 'L5: Críticas ao Modelo Liberal e Utilitarista', 'filosofia', 
    'Críticos apontam que o utilitarismo pode sacrificar minorias ou direitos individuais em nome da "felicidade da maioria". Além disso, a visão liberal clássica é criticada por ignorar as desigualdades de partida e por tratar seres humanos apenas como "átomos econômicos" egoístas, esquecendo a dimensão comunitária e solidária da vida.', 
    ['Cite uma crítica comum ao utilitarismo de Bentham.', 'Por que a visão do ser humano como apenas um consumidor/produtor é considerada limitada?']),

  createLesson('g3-phi-b4-l6', 'L6: Behaviorismo: O Comportamento Moldado', 'filosofia', 
    'O Behaviorismo (Skinner/Watson) defende que o comportamento humano é resultado de estímulos e reforços do ambiente. Para essa corrente, não faz sentido falar em "mente" ou "alma" imaterial; o que importa é o comportamento observável. Através do condicionamento, a sociedade molda nossas ações, o que levanta questões éticas sobre liberdade e controle.', 
    ['Explique o conceito de "reforço positivo" no behaviorismo.', 'Se nosso comportamento é moldado pelo meio, ainda podemos falar em livre-arbítrio? Justifique.']),

  createLesson('g3-phi-b4-l7', 'L7: Freud: O Inconsciente e o Fim do Império da Razão', 'filosofia', 
    'Sigmund Freud chocou o mundo ao afirmar que não somos senhores em nossa própria casa. Grande parte de nossas ações é movida pelo Inconsciente – desejos, traumas e instintos que não controlamos racionalmente. Isso marca o fim da soberania absoluta da Razão (Logos) defendida pelos iluministas e racionalistas.', 
    ['O que Freud entende por "Inconsciente"?', 'Como a descoberta do inconsciente muda a forma como entendemos a responsabilidade pelas nossas ações?']),

  createLesson('g3-phi-b4-l8', 'L8: A Tripartição da Mente: Id, Ego e Superego', 'filosofia', 
    'Para Freud, a mente divide-se em três instâncias: o Id (instintos e busca pelo prazer imediato), o Superego (regras morais e pressões da sociedade) e o Ego (o mediador que tenta equilibrar os dois na realidade). O sofrimento humano (neurose) nasce do conflito constante entre esses três lados.', 
    ['Explique a função do Superego na formação da nossa personalidade.', 'Como o Ego trabalha para evitar que o Id ou o Superego dominem a mente?']),

  createLesson('g3-phi-b4-l9', 'L9: Prática: Mapa da Mente', 'filosofia', 
    'Nesta prática, os alunos tentarão identificar em suas próprias rotinas: 1. Um hábito que parece condicionado (Behaviorismo); 2. Um desejo puro que sentem (Id); 3. Uma regra social que os impede de realizar esse desejo (Superego). O objetivo é usar as teorias para mapear as forças que influenciam seu comportamento diário.', 
    ['Descreva um conflito entre seu desejo e uma regra social que você identificou.', 'Após estudar essas teorias, você se sente mais ou menos "livre" para decidir seu futuro? Por quê?']),
];
