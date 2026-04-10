import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Sociologia 3ª Série: 9 aulas por bimestre (Total 36)
export const socLessonsB1: Lesson[] = [
  createLesson('g3-soc-b1-l1', 'L1: Concepções de Evolução Social', 'sociologia', 
    'No século XIX, influenciados pelo Darwinismo biológico, sociólogos como Auguste Comte e Herbert Spencer criaram o "Darwinismo Social". Eles acreditavam que as sociedades evoluíam de estágios "primitivos" para "civilizados" (europeus). Hoje, a sociologia critica essa visão por ser eurocêntrica e racista, entendendo que cada cultura tem sua própria trajetória e complexidade, sem que uma seja superior à outra.', 
    ['O que foi o Darwinismo Social e por que ele é criticado hoje?', 'Como a ideia de "sociedade primitiva" foi usada para justificar a colonização?']),

  createLesson('g3-soc-b1-l2', 'L2: O Mito do Progresso Infinito', 'sociologia', 
    'A modernidade trouxe a crença de que a ciência e a tecnologia resolveriam todos os problemas humanos, gerando um progresso infinito. Filósofos como Walter Benjamin alertaram que o "progresso" para uns pode significar uma "catástrofe" para outros. Em um planeta com recursos finitos, a ideia de crescimento econômico sem fim torna-se um mito perigoso que ignora os limites da natureza.', 
    ['Explique a frase: "O progresso de uns é a catástrofe de outros".', 'Por que a ideia de crescimento infinito é impossível em um planeta finito?']),

  createLesson('g3-soc-b1-l3', 'L3: Desenvolvimento vs. Crescimento Econômico', 'sociologia', 
    'Crescimento Econômico refere-se apenas ao aumento de números (PIB, lucro). Desenvolvimento é um conceito qualitativo: envolve a melhoria real da vida das pessoas (saúde, educação, liberdade). Um país pode crescer o seu PIB e ainda assim aumentar a desigualdade e a fome, provando que números altos não significam necessariamente uma sociedade melhor.', 
    ['Diferencie crescimento econômico de desenvolvimento social.', 'Por que o PIB (Produto Interno Bruto) é uma medida incompleta para o bem-estar de um povo?']),

  createLesson('g3-soc-b1-l4', 'L4: Teorias da Modernização', 'sociologia', 
    'As teorias da modernização sugerem que todos os países devem seguir o modelo dos países ricos (EUA/Europa) para serem "modernos". Elas pregam a industrialização acelerada e o consumo em massa. A sociologia atual questiona se esse modelo é sustentável para todos e se ignora as formas de vida tradicionais que já são funcionais e equilibradas.', 
    ['Quais as etapas propostas pelas teorias clássicas da modernização?', 'Você acredita que todos os países devem ser como os Estados Unidos para serem considerados "desenvolvidos"? Justifique.']),

  createLesson('g3-soc-b1-l5', 'L5: Desenvolvimento Sustentável: O Novo Paradigma', 'sociologia', 
    'Surgido no Relatório Brundtland (1987), o Desenvolvimento Sustentável propõe suprir as necessidades do presente sem comprometer as gerações futuras. É um novo paradigma que exige equilibrar o pilar econômico, o social e o ambiental. No Tocantins, isso significa produzir alimentos protegendo o Cerrado e as águas.', 
    ['Defina o conceito de Desenvolvimento Sustentável.', 'Como podemos conciliar a produção agrícola com a preservação ambiental no nosso estado?']),

  createLesson('g3-soc-b1-l6', 'L6: Consequências da Modernidade: O Risco', 'sociologia', 
    'Ulrich Beck afirma que vivemos na "Sociedade de Risco". Diferente das ameaças do passado (pestes, secas), os riscos de hoje são criados pela própria modernidade: radiação, mudanças climáticas, poluição química e inteligência artificial. São riscos globais que não respeitam fronteiras e que muitas vezes a ciência não consegue prever ou controlar totalmente.', 
    ['O que é a "Sociedade de Risco" segundo Ulrich Beck?', 'Dê um exemplo de um risco moderno que foi criado pela própria tecnologia humana.']),

  createLesson('g3-soc-b1-l7', 'L7: Obsolescência Programada e Consumo', 'sociologia', 
    'Obsolescência Programada é a estratégia de fabricantes de produzir bens que param de funcionar ou se tornam inúteis em pouco tempo, forçando o consumidor a comprar um novo. Isso gera um lucro rápido para as empresas, mas cria montanhas de lixo eletrônico e consome recursos naturais de forma predatória, alimentando uma cultura de descarte.', 
    ['Explique o conceito de obsolescência programada.', 'Como a moda e o marketing geram a "obsolescência perceptiva" (quando o produto ainda funciona, mas você sente que ele é velho)?']),

  createLesson('g3-soc-b1-l8', 'L8: Degradação Social e Ambiental na Modernidade', 'sociologia', 
    'A modernidade gera a "Injustiça Ambiental": os mais pobres são os que mais sofrem com a poluição e os desastres, embora sejam os que menos consomem. A degradação ambiental leva à degradação social (falta de água, doenças, migrações forçadas). Não há solução para a crise ambiental sem resolver a desigualdade social extrema.', 
    ['Por que a crise ambiental atinge mais intensamente as populações pobres?', 'Explique a relação entre a destruição da natureza e a perda de direitos sociais.']),

  createLesson('g3-soc-b1-l9', 'L9: Prática: Museu da Obsolescência', 'sociologia', 
    'Nesta prática, os alunos devem listar objetos em suas casas que pararam de funcionar nos últimos anos (ou que não podem mais ser atualizados, como celulares e tablets). Devem investigar: Por que parou? Tinha conserto? O preço do conserto era maior que um novo? O objetivo é visualizar como o sistema nos empurra para o lixo e o consumo constante.', 
    ['Qual objeto você escolheu para o seu "museu"? Por que ele se tornou obsoleto?', 'Quais alternativas poderiam existir para que as coisas durassem mais tempo?']),
];

export const socLessonsB2: Lesson[] = [
  createLesson('g3-soc-b2-l1', 'L1: Leitura Crítica da Imagem na Era Digital', 'sociologia', 
    'Na era da informação, somos bombardeados por imagens que parecem apenas "mostrar a realidade", mas que são construções poderosas. Uma imagem pode ser editada, tirada de contexto ou gerada por IA para transmitir uma ideologia ou vender um desejo. A leitura crítica exige que perguntemos: Quem produziu esta imagem? Com qual intenção? O que ela está escondendo?', 
    ['Por que uma imagem nunca é totalmente neutra?', 'Como o uso de filtros nas redes sociais altera a nossa percepção sobre o que é um corpo real?']),

  createLesson('g3-soc-b2-l2', 'L2: O Fenômeno das Fake News e Desinformação', 'sociologia', 
    'Fake news não são apenas mentiras, são ferramentas de controle e polarização. Elas se espalham 70% mais rápido que notícias verdadeiras porque apelam para as nossas emoções e preconceitos. A desinformação enfraquece a democracia, pois impede que o cidadão tome decisões baseadas em fatos, gerando ódio e descrédito nas instituições.', 
    ['Por que notícias falsas costumam gerar mais engajamento do que as verdadeiras?', 'Quais os perigos das fake news para a saúde pública (ex: campanhas de vacinação)?']),

  createLesson('g3-soc-b2-l3', 'L3: A Sociedade do Algoritmo e a Coleta de Dados', 'sociologia', 
    'Vivemos sob o "Capitalismo de Vigilância". Cada clique, curtida ou tempo de tela é transformado em dado para alimentar algoritmos. Essas fórmulas matemáticas decidem o que você compra, o que assiste e até em quem vota. O produto na internet não é apenas o app, é o comportamento humano que é previsto e vendido para grandes corporações.', 
    ['O que você entende por "Capitalismo de Vigilância"?', 'De que forma os seus dados pessoais são usados como "moeda de troca" na internet?']),

  createLesson('g3-soc-b2-l4', 'L4: Bolhas Digitais e Câmaras de Eco', 'sociologia', 
    'Algoritmos nos mostram apenas o que eles acham que gostamos, criando as "Bolhas Digitais". Isso gera o isolamento ideológico: paramos de ouvir quem pensa diferente e passamos a viver em "Câmaras de Eco", onde nossas opiniões são apenas reforçadas. O resultado é a intolerância e a incapacidade de diálogo na sociedade física.', 
    ['Explique o conceito de "Bolha Digital".', 'Como o isolamento em bolhas ideológicas pode levar ao aumento da violência política?']),

  createLesson('g3-soc-b2-l5', 'L5: Cidadania Digital e Ética nas Redes', 'sociologia', 
    'Ser cidadão digital é ter o direito de acesso à rede, mas também o dever ético de agir nela com respeito. A internet não é um "território sem leis". Atitudes como o cyberbullying ou o cancelamento ferem a dignidade humana. A ética digital exige responsabilidade: entender que por trás de cada perfil existe uma pessoa real com direitos.', 
    ['O que significa exercer a cidadania no mundo virtual?', 'Você acredita que as redes sociais deveriam ter regras mais rígidas contra o discurso de ódio? Justifique.']),

  createLesson('g3-soc-b2-l6', 'L6: A Produção Social do Espaço Urbano', 'sociologia', 
    'O espaço urbano não é apenas concreto; é um produto social. Henri Lefebvre e Milton Santos mostram que a cidade é moldada pelo conflito entre o "valor de uso" (moradia, lazer) e o "valor de troca" (lucro imobiliário). Áreas centrais recebem investimentos, enquanto periferias são esquecidas, criando a segregação que organiza o poder nas cidades.', 
    ['Diferencie "valor de uso" de "valor de troca" no contexto de uma casa.', 'Como o planejamento urbano pode ser usado para excluir certos grupos sociais?']),

  createLesson('g3-soc-b2-l7', 'L7: Federalismo: A Organização do Poder no Brasil', 'sociologia', 
    'O Brasil é uma República Federativa. O poder é dividido entre União, Estados e Municípios para garantir autonomia regional. No entanto, o federalismo brasileiro é marcado pela desigualdade de recursos: municípios pequenos muitas vezes dependem totalmente de verbas federais, o que gera tensões políticas e dificuldades na gestão do território.', 
    ['O que caracteriza o sistema federalista de governo?', 'Por que a autonomia dos municípios é importante para o atendimento das necessidades locais?']),

  createLesson('g3-soc-b2-l8', 'L8: Desafios da Gestão Territorial e Políticas Públicas', 'sociologia', 
    'Gerir o território exige planejar saúde, segurança e educação conforme a realidade de cada lugar. No Tocantins, os desafios envolvem integrar o interior ao centro e garantir serviços para populações rurais e tradicionais. Políticas públicas eficazes são aquelas que consideram a geografia e as necessidades sociais reais da população.', 
    ['Por que uma política pública que funciona em São Paulo pode não funcionar no Tocantins?', 'Qual a importância de dados geográficos (como o Censo) para a gestão de uma cidade?']),

  createLesson('g3-soc-b2-l9', 'L9: Prática: Caça ao Algoritmo', 'sociologia', 
    'Nesta prática, os alunos devem analisar suas próprias redes sociais por 5 minutos e anotar: 1. Quais os 3 primeiros anúncios que aparecem? 2. Quais opiniões políticas aparecem? 3. Os posts são de pessoas parecidas com você? O objetivo é "visualizar" o algoritmo trabalhando e perceber como ele tenta moldar o seu consumo e o seu pensamento.', 
    ['Quais padrões você identificou nas sugestões que o algoritmo te deu?', 'Após essa observação, você se sente mais ou menos livre para escolher o que consome na rede?']),
];

export const socLessonsB3: Lesson[] = [
  createLesson('g3-soc-b3-l1', 'L1: A Sociedade do Descarte e o Ciclo do Consumo', 'sociologia', 
    'Vivemos em uma economia linear: extrair, fabricar, consumir e descartar. A sociologia analisa como o consumo deixou de ser sobre "ter o que é necessário" para ser sobre "substituir o que ainda funciona". O descarte acelerado é o motor do lucro industrial, mas gera um passivo ambiental gigantesco que a sociedade como um todo precisa pagar.', 
    ['O que diferencia a necessidade real do desejo de consumo induzido?', 'Por que a sociedade do descarte é insustentável a longo prazo?']),

  createLesson('g3-soc-b3-l2', 'L2: Lixões vs. Aterros: Impactos Socioambientais', 'sociologia', 
    'Lixões são depósitos de resíduos a céu aberto que contaminam solo e água, atraindo doenças. Aterros sanitários são obras de engenharia que tentam minimizar o impacto. No entanto, mesmo o melhor aterro é o fim de um ciclo de desperdício. A sociologia estuda como o lixo é empurrado para as áreas mais pobres das cidades, revelando a injustiça ambiental.', 
    ['Explique a diferença entre um lixão e um aterro sanitário.', 'Por que os depósitos de lixo costumam ser instalados perto de bairros periféricos?']),

  createLesson('g3-soc-b3-l3', 'L3: Catadores de Recicláveis: Trabalho e Invisibilidade', 'sociologia', 
    'Os catadores são os verdadeiros agentes ambientais das cidades, mas sofrem com o preconceito e a invisibilidade social. Eles realizam um trabalho essencial para a economia circular, reduzindo o volume nos aterros, porém trabalham em condições precárias e muitas vezes sem reconhecimento profissional ou proteção do Estado.', 
    ['Qual a importância social e ambiental do trabalho dos catadores?', 'Por que, apesar de essencial, esse trabalho é tão desvalorizado pela sociedade?']),

  createLesson('g3-soc-b3-l4', 'L4: A Vida nos Resíduos e a Exclusão Social', 'sociologia', 
    'Nas franjas dos grandes lixões (ou onde eles existiram), formam-se comunidades que sobrevivem do que a classe média descarta. É a face mais cruel da exclusão social: seres humanos disputando espaço com urubus e lixo. Esse cenário questiona a eficácia das nossas políticas de assistência e a nossa própria humanidade diante da miséria extrema.', 
    ['O que a existência de pessoas vivendo em lixões revela sobre a desigualdade brasileira?', 'Como o lixo pode ser, ao mesmo tempo, um risco e a única fonte de renda para alguns?']),

  createLesson('g3-soc-b3-l5', 'L5: A Precarização do Trabalho e a "Uberização"', 'sociologia', 
    'A uberização é o modelo onde o trabalhador é gerido por um algoritmo. Ele não tem patrão físico, mas é monitorado por metas digitais. Sem férias, sem seguro contra acidentes e sem aposentadoria garantida, o trabalhador assume todos os riscos do negócio. É a flexibilidade extrema que se transforma em insegurança total de vida.', 
    ['Explique por que o motorista ou entregador de app não é um "chefe de si mesmo".', 'Quais os riscos sociais de um mercado de trabalho baseado apenas em aplicativos?']),

  createLesson('g3-soc-b3-l6', 'L6: Trabalho Escravo Contemporâneo: Cadeias Produtivas', 'sociologia', 
    'O trabalho escravo moderno não usa correntes de ferro, mas sim a servidão por dívida e a degradação humana. Ele está escondido em roupas baratas, no carvão para o aço ou na soja. Muitas vezes, grandes marcas globais utilizam trabalho escravo em suas cadeias sem que o consumidor saiba, priorizando o lucro sobre a dignidade.', 
    ['O que define o trabalho análogo à escravidão no século XXI?', 'Como o consumidor pode identificar e evitar produtos que usam trabalho escravo?']),

  createLesson('g3-soc-b3-l7', 'L7: Infância Roubada: O Combate ao Trabalho Infantil', 'sociologia', 
    'O trabalho infantil retira da criança o direito de brincar e de estudar, perpetuando o ciclo da pobreza. No Brasil, ele é comum no trabalho doméstico, na agricultura e nas ruas. A sociologia mostra que a criança que trabalha para ajudar a família raramente conseguirá um emprego qualificado no futuro, mantendo-se na base da pirâmide.', 
    ['Quais as consequências de longo prazo para uma criança que trabalha em vez de estudar?', 'Por que o trabalho infantil é considerado uma violação grave dos direitos humanos?']),

  createLesson('g3-soc-b3-l8', 'L8: Violências no Trabalho: Assédio Moral e Sexual', 'sociologia', 
    'O ambiente de trabalho pode ser local de graves violências psicológicas e físicas. O assédio moral (humilhações repetidas) e o assédio sexual (abuso de poder para fins sexuais) são formas de controle que destroem a saúde mental do trabalhador. Denunciar essas práticas é fundamental para garantir um trabalho digno e ético.', 
    ['Diferencie assédio moral de assédio sexual no ambiente de trabalho.', 'Por que as vítimas muitas vezes têm medo de denunciar os abusos dos superiores?']),

  createLesson('g3-soc-b3-l9', 'L9: Prática: Auditoria de Direitos', 'sociologia', 
    'Nesta prática, os alunos devem pesquisar o "Termo de Uso" de um aplicativo popular de entrega ou transporte. Devem identificar: 1. O que acontece se o trabalhador sofrer um acidente? 2. Existe garantia de valor mínimo por hora? 3. Como o trabalhador pode reclamar de injustiças? O objetivo é perceber o abismo jurídico entre o emprego formal e o digital.', 
    ['Qual app você analisou e qual cláusula você achou mais injusta para o trabalhador?', 'Se você fosse criar uma lei para proteger os trabalhadores de aplicativos, o que ela garantiria?']),
];

export const socLessonsB4: Lesson[] = [
  createLesson('g3-soc-b4-l1', 'L1: Os Sentidos do Trabalho e a Identidade Social', 'sociologia', 
    'Historicamente, o trabalho foi visto como castigo (tripalium) ou como vocação. Na sociologia, o trabalho é o grande organizador da identidade: quando conhecemos alguém, perguntamos "o que você faz?". No entanto, em um mundo de crises, o trabalho está perdendo seu caráter de permanência, gerando crises de identidade e a necessidade de nos definirmos por outros valores além da profissão.', 
    ['Como o trabalho ajuda a definir quem somos na sociedade?', 'Por que o desemprego afeta não apenas a renda, mas também a autoestima do indivíduo?']),

  createLesson('g3-soc-b4-l2', 'L2: Revolução Tecnológica e o Desemprego Estrutural', 'sociologia', 
    'Diferente do desemprego conjuntural (causado por crises passageiras), o desemprego estrutural ocorre quando a tecnologia substitui permanentemente uma função humana. A automação e a robótica extinguiram postos de trabalho que nunca mais voltarão. Isso exige que a sociedade repense a jornada de trabalho e o sistema educacional para novas realidades.', 
    ['Diferencie desemprego estrutural de desemprego conjuntural.', 'Dê um exemplo de uma profissão que desapareceu ou está desaparecendo devido à tecnologia.']),

  createLesson('g3-soc-b4-l3', 'L3: Profissões em Risco e o Impacto da IA', 'sociologia', 
    'A Inteligência Artificial (IA) está automatizando tarefas intelectuais (escrita, diagnóstico, tradução). Profissões de nível superior, como direito e medicina, estão sendo impactadas. O diferencial humano passará a ser a criatividade, a ética e a empatia – coisas que os algoritmos ainda não conseguem simular com perfeição.', 
    ['Quais habilidades humanas você acredita que a IA terá mais dificuldade em substituir?', 'Como você se imagina trabalhando em parceria com uma IA no futuro?']),

  createLesson('g3-soc-b4-l4', 'L4: A Nova Precarização: Flexibilidade ou Insegurança?', 'sociologia', 
    'O discurso da "flexibilidade" (home office, freelancing) muitas vezes esconde uma insegurança profunda. Sem contratos estáveis, o trabalhador torna-se um "empreendedor de si mesmo" que arca com todos os riscos. A fronteira entre o tempo de trabalho e o tempo de descanso desaparece, levando a fenômenos como o burnout (esgotamento extremo).', 
    ['Por que a ideia de ser "seu próprio chefe" pode ser uma armadilha social?', 'Como as redes sociais aumentam a pressão para estarmos "sempre disponíveis" para o trabalho?']),

  createLesson('g3-soc-b4-l5', 'L5: Competências do Século XXI e o Perfil Profissional', 'sociologia', 
    'O mercado atual valoriza as "Soft Skills" (habilidades comportamentais): comunicação, resiliência, pensamento crítico e trabalho em equipe. O aprendizado ao longo da vida (lifelong learning) tornou-se obrigatório, pois o conhecimento técnico envelhece rápido. Ser um profissional hoje exige adaptação constante e inteligência emocional.', 
    ['O que são "Soft Skills" e por que elas são tão valorizadas hoje?', 'Por que não podemos parar de estudar após terminar a graduação ou curso técnico?']),

  createLesson('g3-soc-b4-l6', 'L6: Políticas Públicas de Emprego na Região Norte', 'sociologia', 
    'A Região Norte enfrenta desafios geográficos e de infraestrutura. As políticas públicas de emprego precisam considerar as distâncias e a necessidade de industrialização sustentável. Incentivos para a bioeconomia e para o polo tecnológico de Manaus são exemplos de como o Estado tenta fixar o trabalhador no Norte com salários dignos.', 
    ['Quais as maiores dificuldades para conseguir emprego qualificado na Região Norte?', 'Como o governo pode incentivar a criação de empresas que não destruam a floresta?']),

  createLesson('g3-soc-b4-l7', 'L7: O Mercado de Trabalho no Tocantins', 'sociologia', 
    'O Tocantins tem uma economia baseada no agronegócio e no setor de serviços/administração pública. O desafio é diversificar: transformar o estado em um centro logístico e tecnológico. Para o jovem tocantinense, as oportunidades estão crescendo no interior (agroindústria) e na capital (tecnologia e turismo).', 
    ['Quais os setores que mais contratam em sua cidade ou região?', 'Você pretende trabalhar no Tocantins ou buscar oportunidades em outros estados? Por quê?']),

  createLesson('g3-soc-b4-l8', 'L8: Empreendedorismo Jovem e Economia Criativa', 'sociologia', 
    'A economia criativa usa o capital intelectual para gerar renda: games, moda autoral, gastronomia regional, design e audiovisual. No Tocantins, o artesanato de capim dourado e o turismo sustentável são exemplos. Empreender de forma criativa é valorizar a cultura local para competir no mercado global digital.', 
    ['Defina o conceito de "Economia Criativa".', 'Dê uma ideia de negócio que use um recurso ou tradição do Tocantins de forma inovadora.']),

  createLesson('g3-soc-b4-l9', 'L9: Prática: Feira das Profissões do Futuro', 'sociologia', 
    'Nesta prática final, os alunos pesquisarão: 1. Uma profissão do passado que não existe mais (ex: acendedor de lampião); 2. Uma profissão do futuro que está surgindo (ex: ética de IA, minerador de asteroides). Devem apresentar como as competências mudaram. O objetivo é preparar o aluno para a incerteza e para a escolha consciente de sua carreira.', 
    ['Qual profissão do futuro você escolheu pesquisar e por que ela será necessária?', 'Como as aulas de sociologia ajudaram você a entender o mundo do trabalho que te espera?']),
];
