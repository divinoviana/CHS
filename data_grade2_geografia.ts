import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Geografia: 18 aulas por bimestre (Total 72)
export const geoLessonsB1: Lesson[] = [
  createLesson('g2-geo-b1-l1', 'L1: Do Artesanato à Manufatura', 'geografia', 
    'Antes das fábricas, a produção era artesanal: o artesão conhecia todas as etapas do trabalho e usava ferramentas simples. Com o tempo, surgiu a manufatura, onde vários trabalhadores se reuniam em oficinas e começavam a dividir as tarefas, mas ainda sem máquinas complexas. Essa transição foi fundamental para aumentar a velocidade da produção e preparar o terreno para a revolução industrial.', 
    ['Qual a principal diferença entre o trabalho de um artesão e o trabalho em uma manufatura?', 'Como a divisão de tarefas mudou a produtividade no início da industrialização?']),

  createLesson('g2-geo-b1-l2', 'L2: 1ª Rev. Industrial: Vapor', 'geografia', 
    'A Primeira Revolução Industrial começou na Inglaterra no século XVIII. O grande motor foi a máquina a vapor, movida a carvão mineral. A produção têxtil e os transportes (trens e navios a vapor) mudaram radicalmente. O campo começou a perder espaço para as cidades, que cresciam rapidamente em torno das chaminés das fábricas.', 
    ['Por que o carvão mineral foi tão importante para a 1ª Revolução Industrial?', 'Quais foram os principais impactos sociais da invenção da máquina a vapor?']),

  createLesson('g1-geo-b1-l3', 'L3: 2ª Rev. Industrial: Eletricidade', 'geografia', 
    'No final do século XIX, a Segunda Revolução Industrial introduziu a eletricidade, o petróleo e o aço. Surgiram o motor a combustão e as grandes indústrias químicas. A comunicação também evoluiu com o rádio e o telefone. Foi o período de expansão das grandes potências globais e do surgimento das linhas de montagem.', 
    ['Quais fontes de energia caracterizaram a 2ª Revolução Industrial?', 'Como a eletricidade mudou a vida das pessoas nas cidades naquele período?']),

  createLesson('g2-geo-b1-l4', 'L4: Fordismo e Massa', 'geografia', 
    'O Fordismo, criado por Henry Ford, revolucionou a indústria com a linha de montagem. O objetivo era produzir muito, de forma padronizada, para vender barato. Surgiu a "sociedade de consumo de massa": os próprios trabalhadores deveriam ganhar o suficiente para comprar o que produziam. O trabalho era repetitivo e o trabalhador não precisava pensar, apenas executar.', 
    ['Explique o conceito de "linha de montagem" do Fordismo.', 'Por que o Fordismo precisava que os produtos fossem todos iguais (padronizados)?']),

  createLesson('g2-geo-b1-l5', 'L5: 3ª Rev. Industrial: Informática', 'geografia', 
    'A Terceira Revolução Industrial (ou Técnico-Científica) começou após a 2ª Guerra Mundial. O foco mudou para a microeletrônica, a informática, a robótica e a biotecnologia. A informação passou a ser tão valiosa quanto a matéria-prima. As fábricas começaram a usar computadores para controlar máquinas, diminuindo a necessidade de mão de obra braçal.', 
    ['O que diferencia a 3ª Revolução Industrial das anteriores em relação ao papel da tecnologia?', 'Como a informática influenciou a localização das indústrias pelo mundo?']),

  createLesson('g2-geo-b1-l6', 'L6: Toyotismo e Flexibilidade', 'geografia', 
    'O Toyotismo surgiu no Japão como resposta ao Fordismo. Em vez de produzir estoques imensos, o lema é "Just-in-Time" (produzir apenas o necessário, no momento certo). A produção é flexível e variada. O trabalhador agora precisa ser multifuncional, qualificado e participar das decisões da fábrica para evitar desperdícios.', 
    ['Diferencie a lógica de estoque do Fordismo para o "Just-in-Time" do Toyotismo.', 'Por que o trabalhador toyotista precisa ser mais qualificado que o fordista?']),

  createLesson('g2-geo-b1-l7', 'L7: 4ª Rev. Industrial: 4.0', 'geografia', 
    'Vivemos hoje a Indústria 4.0. Ela une o world físico ao digital através da Inteligência Artificial, Internet das Coisas (IoT), Big Data e impressão 3D. As máquinas agora se comunicam entre si e tomam decisões em tempo real. Es a era das "fábricas inteligentes" e da conectividade total.', 
    ['O que significa dizer que as máquinas "se comunicam" na Indústria 4.0?', 'Cite um exemplo de como a Inteligência Artificial está presente na produção atual.']),

  createLesson('g2-geo-b1-l8', 'L8: Impactos Ambientais', 'geografia', 
    'As revoluções industriais trouxeram conforto, mas cobraram um preço alto do meio ambiente. O aquecimento global (pela queima de combustíveis fósseis), a poluição dos oceanos e o acúmulo de lixo eletrônico são crises urgentes. A indústria moderna precisa buscar a economia circular e fontes de energia limpa para sobreviver.', 
    ['Como a industrialização histórica contribuiu para o atual aquecimento global?', 'O que você entende por "descarte planejado" ou obsolescência programada?']),

  createLesson('g2-geo-b1-l9', 'L9: DIT: Divisão Internacional do Trabalho', 'geografia', 
    'A DIT explica como os países se dividem na produção mundial. No passado, colônias mandavam matéria-prima e metrópoles mandavam manufaturas. Hoje, a DIT é complexa: países desenvolvidos exportam tecnologia e serviços caros, enquanto países em desenvolvimento muitas vezes exportam produtos agrícolas ou montam peças de empresas multinacionais.', 
    ['Explique como funciona a Divisão Internacional do Trabalho (DIT) atualmente.', 'Qual a diferença entre exportar "commodities" e exportar "tecnologia"?']),

  createLesson('g2-geo-b1-l10', 'L10: Capitalismo: Lógica', 'geografia', 
    'O capitalismo é um sistema econômico baseado na propriedade privada dos meios de produção (fábricas, terras, máquinas) e na busca pelo lucro. Ele funciona através da lei da oferta e da procura e depende do trabalho assalariado. A concorrência entre as empresas é o motor que gera inovação tecnológica.', 
    ['Quais são os três pilares fundamentais do sistema capitalista?', 'Como a busca pelo lucro influencia a criação de novas tecnologias?']),

  createLesson('g2-geo-b1-l11', 'L11: Mercantilismo', 'geografia', 
    'A primeira fase do capitalismo foi o Mercantilismo (Capitalismo Comercial). Entre os séculos XV e XVIII, a riqueza de uma nação era medida pela quantidade de ouro e prata que ela possuía (metalismo). As potências europeias exploravam suas colônias para manter uma balança comercial favorável.', 
    ['O que era o metalismo e como ele funcionava no mercantilismo?', 'Qual era o papel das colônias para a riqueza das metrópoles europeias?']),

  createLesson('g2-geo-b1-l12', 'L12: Cap. Industrial', 'geografia', 
    'Com a 1ª Revolução Industrial, o capitalismo mudou. O lucro não vinha mais apenas do comércio, mas da produção de mercadorias em larga escala. Foi a era do Liberalismo Econômico, defendido por Adam Smith, que pregava que o Estado não deveria interferir na economia ("Laissez-faire").', 
    ['Por que a produção passou a ser mais importante que o comércio nesta fase?', 'O que defendia o liberalismo econômico clássico?']),

  createLesson('g2-geo-b1-l13', 'L13: Cap. Financeiro', 'geografia', 
    'No final do século XIX, indústrias e bancos se fundiram. O capital deixou de ser apenas produtivo e passou a ser financeiro (ações, empréstimos, investimentos). Surgiram os grandes monopólios e trustes, onde poucas empresas controlam mercados inteiros, eliminando a concorrência.', 
    ['Como os bancos passaram a ter poder sobre as indústrias no capitalismo financeiro?', 'O que é um monopólio e por que ele pode ser prejudicial ao consumidor?']),

  createLesson('g2-geo-b1-l14', 'L14: Crise de 1929', 'geografia', 
    'A Grande Depressão foi a maior crise do capitalismo. Os EUA produziam muito mais do que as pessoas podiam comprar (superprodução). A Bolsa de Valores de Nova York quebrou, gerando desemprego em massa e mostrando que o mercado não conseguia se autorregular sozinho o tempo todo.', 
    ['Quais foram as causas principais da quebra da bolsa de 1929?', 'Como uma crise nos EUA afetou a economia do Brasil na época (pense no café)?']),

  createLesson('g2-geo-b1-l15', 'L15: Keynesianismo', 'geografia', 
    'Para sair da crise de 1929, surgiu o Keynesianismo. Ele defendia que o Estado deveria intervir na economia para gerar empregos e garantir bem-estar social (Saúde, Educação). Foi a era do "New Deal" nos EUA e do Estado de Bem-Estar Social na Europa, que durou até a década de 70.', 
    ['Qual o papel do Estado na economia segundo as ideias de Keynes?', 'Como o investimento em obras públicas ajuda a combater o desemprego?']),

  createLesson('g2-geo-b1-l16', 'L16: Neoliberalismo', 'geografia', 
    'A partir dos anos 80, as ideias liberais voltaram com força. O Neoliberalismo defende o "Estado Mínimo": privatizações de empresas públicas, redução de gastos sociais e abertura total para o mercado global. O foco é a eficiência econômica e a liberdade individual de mercado.', 
    ['Cite duas características principais do modelo neoliberal.', 'O que é privatização e por que ela é um tema polêmico?']),

  createLesson('g2-geo-b1-l17', 'L17: Cap. Informacional', 'geografia', 
    'Atualmente vivemos o Capitalismo Informacional (ou Cognitivo). A riqueza não está mais apenas nas máquinas, mas no conhecimento, nas patentes, nos algoritmos e nos dados. Empresas como Google e Amazon são gigantes porque dominam a informação, que é o petróleo do século XXI.', 
    ['Por que os dados são chamados de "novo petróleo" no capitalismo atual?', 'Como o conhecimento gera valor financeiro para uma empresa hoje em dia?']),

  createLesson('g2-geo-b1-l18', 'L18: Prática: Linha do Tempo', 'geografia', 
    'Nesta atividade final, o aluno deverá construir uma linha do tempo comparativa. Ele deve relacionar as fases do capitalismo com as revoluções industriais, identificando as fontes de energia e os modelos de produção predominantes em cada época.', 
    ['Qual fase do capitalismo e qual revolução industrial você acha que trouxe a mudança mais profunda para a humanidade? Justifique.', 'Como você imagina que será a "Próxima Revolução" industrial?']),
];

export const geoLessonsB2: Lesson[] = [
  createLesson('g2-geo-b2-l1', 'L1: Industrialização e Migrações Internas', 'geografia', 
    'A industrialização do Brasil, concentrada no Sudeste, gerou grandes ondas de migração interna. Pessoas de todo o país, especialmente do Nordeste e de áreas rurais do Centro-Oeste e Norte, partiram em busca de empregos nas fábricas. Esse movimento moldou a cara das nossas cidades e a distribuição da população no território.', 
    ['Como a industrialização influenciou a migração no Brasil no século XX?', 'Qual o papel do Tocantins (antigo norte de Goiás) nessas migrações históricas?']),

  createLesson('g2-geo-b2-l2', 'L2: Zonas de Atração: As Grandes Metrópoles', 'geografia', 
    'Metrópoles como São Paulo e Rio de Janeiro são "zonas de atração" devido à oferta de empregos, serviços e oportunidades educacionais. Mais recentemente, Palmas também se tornou uma zona de atração regional no Tocantins, atraindo pessoas do interior do estado e de estados vizinhos que buscam serviços públicos e comércio.', 
    ['O que torna uma cidade uma "zona de atração"?', 'Por que Palmas atrai tantas pessoas de outras regiões do Tocantins?']),

  createLesson('g2-geo-b2-l3', 'L3: Zonas de Repulsão: Conflitos e Crises', 'geografia', 
    'Zonas de repulsão são lugares onde fatores negativos (como guerras, secas extremas, falta de emprego ou crises políticas) forçam as pessoas a sair. O desemprego causado pela mecanização no campo, por exemplo, é um fator de repulsão que alimenta o êxodo rural.', 
    ['Explique o conceito de "zona de repulsão" e dê um exemplo.', 'Como a falta de infraestrutura pode tornar um bairro ou cidade uma zona de repulsão?']),

  createLesson('g2-geo-b2-l4', 'L4: Fluxos Econômicos Globais', 'geografia', 
    'A economia global funciona como uma rede de fluxos: dinheiro (investimentos), mercadorias (importação e exportação) e serviços circulam entre os países. O Tocantins participa intensamente desse fluxo através da exportação de soja e carne, conectando o cerrado tocantinense aos mercados da China e Europa.', 
    ['O que são fluxos econômicos e como eles conectam os países?', 'Qual o principal produto que o Tocantins "envia" para o fluxo econômico mundial?']),

  createLesson('g2-geo-b2-l5', 'L5: O Fluxo da Informação: A Era Digital', 'geografia', 
    'Hoje, a informação circula instantaneamente. Notícias, tendências e dados financeiros atravessam o globo em segundos via fibra óptica e satélites. Esse fluxo digital permite que pessoas trabalhem de casa (home office) e que empresas controlem filiais em outros continentes em tempo real.', 
    ['Como a velocidade da informação mudou a economia mundial?', 'Quais as vantagens e perigos de vivermos em uma era de fluxo de informação total?']),

  createLesson('g2-geo-b2-l6', 'L6: Fluxos Humanos e Diásporas Modernas', 'geografia', 
    'Diásporas são deslocamentos em massa de povos de suas terras de origem. Hoje, vemos diásporas causadas por conflitos no Oriente Médio e crises na América Latina. Esses fluxos humanos desafiam as fronteiras e exigem políticas de acolhimento e respeito aos direitos humanos.', 
    ['O que é uma diáspora?', 'Como a migração forçada afeta a identidade cultural de um povo?']),

  createLesson('g2-geo-b2-l7', 'L7: Empresas Transnacionais e Território', 'geografia', 
    'Empresas transnacionais (ou multinacionais) operam em vários países. Elas buscam lugares com mão de obra barata, impostos baixos ou matérias-primas abundantes. No Tocantins, grandes empresas do agronegócio e logística ditam o ritmo de crescimento de cidades como Porto Nacional e Gurupi.', 
    ['O que buscam as empresas transnacionais ao se instalarem em diferentes países?', 'Como uma grande empresa pode mudar a geografia de uma pequena cidade?']),

  createLesson('g2-geo-b2-l8', 'L8: Globalização vs. Identidades Locais', 'geografia', 
    'A globalização tende a padronizar o consumo (mesmas músicas, comidas e marcas em todo lugar). No entanto, isso gera uma reação de valorização do que é local. No Tocantins, enquanto consumimos tecnologia global, valorizamos o capim dourado, o peixe na telha e o chambari como símbolos de nossa identidade única.', 
    ['De que forma a globalização pode ameaçar as culturas regionais?', 'Cite um exemplo de como a cultura tocantinense resiste à padronização global.']),

  createLesson('g2-geo-b2-l9', 'L9: Impactos Ambientais dos Fluxos Globais', 'geografia', 
    'O transporte de mercadorias por longas distâncias consome imensas quantidades de combustível e gera CO2. Além disso, a produção em larga escala para o mercado global muitas vezes ignora a regeneração da natureza local. A sustentabilidade exige que repensemos esses fluxos.', 
    ['Como o transporte internacional de mercadorias afeta o clima do planeta?', 'O que é a "pegada de carbono" de um produto importado?']),

  createLesson('g2-geo-b2-l10', 'L10: Regionalização: Os Brasis do IBGE', 'geografia', 
    'Para facilitar o estudo e a administração, o IBGE dividiu o Brasil em 5 Grandes Regiões: Norte, Nordeste, Centro-Oeste, Sudeste e Sul. Essa divisão leva em conta critérios naturais, sociais e econômicos. O Tocantins pertence à Região Norte, mas possui fortes laços econômicos com o Centro-Oeste.', 
    ['Quais os critérios usados pelo IBGE para dividir o Brasil em 5 regiões?', 'Por que é importante regionalizar o território de um país tão grande como o Brasil?']),

  createLesson('g2-geo-b2-l11', 'L11: Região Norte: Floresta e Fronteira', 'geografia', 
    'A Região Norte é marcada pela Floresta Amazônica e pela bacia hidrográfica mais rica do mundo. É uma região de fronteira agrícola e mineral, onde a preservação e o desenvolvimento sustentável são os maiores desafios. O Tocantins é a porta de entrada para essa imensa região.', 
    ['Quais as principais características naturais da Região Norte?', 'Quais os principais desafios econômicos e ambientais enfrentados pelos estados do Norte?']),

  createLesson('g2-geo-b2-l12', 'L12: Região Nordeste: Diversidade e Superação', 'geografia', 
    'O Nordeste não é apenas seca; é uma região diversa, dividida em Meio-Norte, Sertão, Agreste e Zona da Mata. É o berço cultural do Brasil e hoje se destaca pelo turismo e pela produção de energia limpa (eólica e solar). Muitos tocantinenses têm suas raízes nesta região.', 
    ['Quais são as quatro sub-regiões do Nordeste?', 'Como a imagem do Nordeste tem mudado nas últimas décadas?']),

  createLesson('g2-geo-b2-l13', 'L13: Região Centro-Oeste: O Coração Agrícola', 'geografia', 
    'O Centro-Oeste cresceu com a construção de Brasília e a expansão da soja. É o coração do agronegócio brasileiro. A paisagem do Cerrado domina a região. O Tocantins compartilha com o Centro-Oeste a vocação agrícola e o bioma Cerrado.', 
    ['Qual a importância política e econômica do Centro-Oeste para o Brasil?', 'Como a construção de Brasília mudou a ocupação do interior do país?']),

  createLesson('g2-geo-b2-l14', 'L14: Região Sudeste: Comando e Complexidade', 'geografia', 
    'O Sudeste é o centro econômico do país, concentrando a maioria das indústrias, bancos e sedes de empresas. É a região mais populosa e urbanizada, exercendo o papel de "comando" sobre as outras regiões brasileiras devido à sua força financeira.', 
    ['Por que o Sudeste é considerado a região de "comando" da economia brasileira?', 'Quais os principais problemas urbanos enfrentados pelas metrópoles do Sudeste?']),

  createLesson('g2-geo-b2-l15', 'L15: Região Sul: Herança e Dinamismo', 'geografia', 
    'O Sul foi marcado pela colonização europeia e possui um clima subtropical. É uma região com indicadores sociais elevados, uma agricultura moderna e cooperativismo forte. Suas cidades são conhecidas pela organização e integração com a agroindústria.', 
    ['Como a herança da colonização europeia influenciou a paisagem do Sul?', 'Quais as principais atividades econômicas da Região Sul?']),

  createLesson('g2-geo-b2-l16', 'L16: Identidade Cultural e as Diferenças Regionais', 'geografia', 
    'O Brasil é um país continental com culturas regionais muito fortes. Sotaques, culinárias e festas (como o Círio de Nazaré no Norte ou o Carnaval no Sudeste/Nordeste) mostram que a regionalização também é humana e simbólica, não apenas estatística.', 
    ['Como a cultura ajuda a definir os limites de uma região?', 'O que você considera mais marcante na identidade cultural do Tocantins?']),

  createLesson('g2-geo-b2-l17', 'L17: Desigualdades Regionais no Século XXI', 'geografia', 
    'Apesar do crescimento, o Brasil ainda sofre com desigualdades entre as regiões. O Sudeste e o Sul geralmente possuem melhores índices de educação e renda do que o Norte e o Nordeste. Políticas públicas são necessárias para que o desenvolvimento chegue a todos os cantos do país de forma justa.', 
    ['Como podemos observar a desigualdade regional através dos dados do IDH?', 'O que o governo pode fazer para diminuir as diferenças de desenvolvimento entre as regiões brasileiras?']),

  createLesson('g2-geo-b2-l18', 'L18: Prática: Mapeamento Cultural Juvenil', 'geografia', 
    'Nesta atividade, os alunos deverão mapear as origens culturais presentes em sua turma ou bairro. De onde vieram seus pais e avós? Quais músicas e comidas de outras regiões eles trouxeram? O objetivo é perceber como os fluxos migratórios formaram a diversidade da nossa própria comunidade.', 
    ['Qual a região do Brasil mais presente nas raízes das famílias da sua turma?', 'Como essa mistura de origens enriquece a vida cultural da sua cidade?']),
];

export const geoLessonsB3: Lesson[] = [
  createLesson('g2-geo-b3-l1', 'L1: Consumo e Ambiente', 'geografia', 
    'A sociedade atual é movida pelo consumo. Para produzir tudo o que compramos, a indústria retira recursos naturais em uma velocidade maior do que a Terra consegue repor. O resultado é o esgotamento de matérias-primas e a geração de poluição. Repensar o consumo é o primeiro passo para garantir um futuro sustentável.', 
    ['Qual a relação entre o aumento do consumo e a crise ambiental global?', 'Como as nossas escolhas individuais de compra afetam o meio ambiente?']),

  createLesson('g2-geo-b3-l2', 'L2: Obsolescência', 'geografia', 
    'A obsolescência programada ocorre quando produtos são feitos para quebrar ou parar de funcionar em pouco tempo. Já a obsolescência perceptiva é quando o marketing nos convence de que o produto que temos "saiu de moda", mesmo que ainda funcione perfeitamente. Ambas aumentam o lucro das empresas e a montanha de lixo no planeta.', 
    ['Diferencie obsolescência programada de obsolescência perceptiva.', 'Cite um exemplo de produto que você teve que trocar em pouco tempo devido à obsolescência.']),

  createLesson('g2-geo-b3-l3', 'L3: Transnacionais', 'geografia', 
    'Empresas transnacionais possuem sedes em países desenvolvidos e filiais espalhadas pelo mundo. Elas aproveitam a facilidade de transporte e comunicação para produzir onde é mais barato. Muitas vezes, essas empresas têm orçamentos maiores do que o PIB de muitos países, exercendo grande influência política.', 
    ['O que permite que uma empresa se torne transnacional na era da globalização?', 'Quais os impactos da chegada de uma grande transnacional na economia de um país em desenvolvimento?']),

  createLesson('g2-geo-b3-l4', 'L4: Terceirização', 'geografia', 
    'A terceirização é quando uma empresa contrata outra para realizar partes do seu processo produtivo (como limpeza, segurança ou até a montagem de peças). Isso reduz custos para a empresa principal, mas muitas vezes precariza o trabalho, resultando em salários menores e menos direitos para os terceirizados.', 
    ['O que é terceirização e por que as empresas a utilizam?', 'Quais as principais críticas sociais feitas ao modelo de terceirização do trabalho?']),

  createLesson('g2-geo-b3-l5', 'L5: Impactos Socioambientais', 'geografia', 
    'A produção industrial global gera "externalidades": impactos negativos que não estão no preço do produto, como a poluição de rios ou a exploração de mão de obra em condições análogas à escravidão. A justiça socioambiental busca responsabilizar as empresas por esses danos.', 
    ['O que são impactos socioambientais industriais?', 'Como podemos cobrar responsabilidade das empresas pelos danos que elas causam ao ambiente?']),

  createLesson('g2-geo-b3-l6', 'L6: Logística Global', 'geografia', 
    'Logística é a arte de movimentar coisas pelo mundo com eficiência. Portos modernos, navios gigantescos (porta-contêineres) e aeroportos de carga são os "veios" por onde corre o sangue da economia global. Sem uma logística integrada, a globalização como conhecemos pararia.', 
    ['Qual a importância dos contêineres para a logística global moderna?', 'Como a infraestrutura de transporte afeta o preço final dos produtos que consumimos?']),

  createLesson('g2-geo-b3-l7', 'L7: Lixo Eletrônico', 'geografia', 
    'O lixo eletrônico (e-waste) é um dos resíduos que mais cresce no mundo. Ele contém metais pesados tóxicos (chumbo, mercúrio) que contaminam o solo e a água. O descarte correto é um desafio, e muitas vezes esse lixo é enviado ilegalmente de países ricos para países pobres.', 
    ['Por que o lixo eletrônico é considerado mais perigoso que o lixo comum?', 'O que deve ser feito com um celular ou computador velho para que ele não polua o ambiente?']),

  createLesson('g2-geo-b3-l8', 'L8: Publicidade', 'geografia', 
    'A publicidade não serve apenas para informar sobre um produto, mas para criar necessidades e desejos. Através de algoritmos nas redes sociais, o marketing moderno é personalizado e constante, estimulando o consumo impulsivo e moldando comportamentos da juventude.', 
    ['Como a publicidade influencia os nossos hábitos de consumo?', 'Qual o papel dos algoritmos na propaganda que recebemos em nossas redes sociais?']),

  createLesson('g2-geo-b3-l9', 'L9: Economia Circular', 'geografia', 
    'Ao contrário da economia linear (extrair, produzir, descartar), a economia circular propõe que os resíduos de um processo sejam a matéria-prima de outro. O objetivo é eliminar o lixo desde o design do produto, focando em reparo, reuso e reciclagem industrial.', 
    ['Explique o conceito de "Ciclo Fechado" na economia circular.', 'Como a economia circular pode ajudar a combater o esgotamento de recursos naturais?']),

  createLesson('g2-geo-b3-l10', 'L10: Taylorismo', 'geografia', 
    'O Taylorismo, criado por Frederick Taylor, introduziu a "gerência científica": o trabalho é dividido em tarefas mínimas e repetitivas, cronometradas para máxima eficiência. O foco é a separação total entre quem pensa (gerente) e quem executa (operário).', 
    ['Qual o principal objetivo do Taylorismo na organização do trabalho?', 'Por que o Taylorismo é criticado por "desumanizar" o trabalhador?']),

  createLesson('g2-geo-b3-l11', 'L11: Fordismo', 'geografia', 
    'O Fordismo aplicou as ideias de Taylor em larga escala através da linha de montagem e esteiras rolantes. Permitiu a produção em massa de produtos idênticos. Ford também defendia que o operário deveria ganhar bem para se tornar um consumidor, alimentando o ciclo econômico.', 
    ['Como a esteira rolante mudou a velocidade da produção no Fordismo?', 'Qual a relação entre o Fordismo e o surgimento do consumo de massa?']),

  createLesson('g2-geo-b3-l12', 'L12: Crise do Fordismo', 'geografia', 
    'Nos anos 70, o modelo fordista entrou em crise devido à rigidez da produção e ao choque do petróleo. Os consumidores queriam produtos variados e o custo da energia subiu muito. O estoque imenso e o trabalho repetitivo já não garantiam lucros, exigindo um novo modelo.', 
    ['Quais fatores levaram à crise do modelo fordista na década de 1970?', 'Por que a rigidez das fábricas fordistas se tornou um problema econômico?']),

  createLesson('g2-geo-b3-l13', 'L13: Toyotismo', 'geografia', 
    'O Toyotismo trouxe a flexibilidade. Através do sistema "Just-in-Time", a fábrica só produz o que já foi vendido, eliminando estoques. O trabalhador é multifuncional e trabalha em equipe (Quality Circles), buscando a perfeição constante e a redução total de desperdícios.', 
    ['Como o sistema "Just-in-Time" aumenta a eficiência da produção?', 'Diferencie o papel do trabalhador no Fordismo versus no Toyotismo.']),

  createLesson('g2-geo-b3-l14', 'L14: Nova DIT', 'geografia', 
    'Na Nova Divisão Internacional do Trabalho, as etapas de alta tecnologia (design, pesquisa) ficam nos países desenvolvidos, enquanto as etapas de montagem e produção pesada migram para países em desenvolvimento com custos menores. O mundo se torna uma grande linha de montagem fragmentada.', 
    ['O que caracteriza a "Nova DIT" no período da globalização?', 'Como um produto (como um iPhone) pode ter partes produzidas em diversos países diferentes?']),

  createLesson('g2-geo-b3-l15', 'L15: Revolução Técnica', 'geografia', 
    'A Revolução Técnica (ou 3ª Revolução Industrial) integrou a ciência diretamente à produção. Biotecnologia, novos materiais e microinformática permitiram criar produtos mais inteligentes e processos mais rápidos, mudando a base material da sociedade global.', 
    ['Como a ciência se tornou uma "força produtiva" direta na Revolução Técnica?', 'Cite uma inovação tecnológica desta fase que mudou o seu dia a dia.']),

  createLesson('g2-geo-b3-l16', 'L16: Automação', 'geografia', 
    'A automação moderna usa sensores, robôs e inteligência artificial para realizar tarefas complexas sem intervenção humana. Se por um lado aumenta a precisão e a segurança, por outro gera o temor do fim de muitos postos de trabalho tradicionais.', 
    ['Quais as vantagens da automação para as indústrias atuais?', 'Como a sociedade deve lidar com o desemprego causado pela substituição de humanos por robôs?']),

  createLesson('g2-geo-b3-l17', 'L17: Soberania', 'geografia', 
    'Em um mundo globalizado, a soberania econômica é um desafio. Países que dependem totalmente de tecnologia estrangeira ou que só exportam matérias-primas ficam vulneráveis às crises globais. Ter autonomia tecnológica e alimentar é essencial para a segurança nacional.', 
    ['O que significa ter "soberania econômica" hoje em dia?', 'Por que a dependência excessiva de importações pode ser perigosa para um país?']),

  createLesson('g2-geo-b3-l18', 'L18: Prática: Jornada Produto', 'geografia', 
    'Nesta atividade, o aluno escolherá um objeto comum (ex: um tênis ou um chocolate) e investigará sua jornada: de onde vieram os componentes, onde foi montado, como chegou à loja e qual o seu destino após o uso. O objetivo é visualizar a rede global por trás de cada objeto.', 
    ['Ao pesquisar o seu produto, qual etapa da jornada você achou mais surpreendente?', 'Quais impactos ambientais você conseguiu identificar ao longo do ciclo de vida desse produto?']),
];

export const geoLessonsB4: Lesson[] = [
  createLesson('g2-geo-b4-l1', 'L1: A Nova Ordem Mundial e a Multipolaridade', 'geografia', 
    'Após o fim da Guerra Fria, o mundo deixou de ser bipolar. Atualmente, vivemos em uma ordem multipolar, onde diversos centros de poder (EUA, China, União Europeia, BRICS) disputam influência econômica e geopolítica. Essa nova configuração exige diplomacia constante e novos arranjos de poder global.', 
    ['Diferencie a Ordem Bipolar da Guerra Fria da Ordem Multipolar atual.', 'Qual o papel dos países emergentes na nova ordem mundial?']),

  createLesson('g2-geo-b4-l2', 'L2: Geopolítica das Técnicas e Informação', 'geografia', 
    'A técnica e a informação são as novas armas da geopolítica. Países que dominam tecnologias de ponta, como microchips, inteligência artificial e satélites, exercem controle sobre os fluxos globais e a soberania de outras nações. A informação é poder político e econômico.', 
    ['Por que o domínio tecnológico é uma questão de segurança nacional?', 'Como a informação pode ser usada como ferramenta de poder entre países?']),

  createLesson('g2-geo-b4-l3', 'L3: Revolução Técnico-Científico-Informacional', 'geografia', 
    'Esta fase do capitalismo, descrita por Milton Santos, caracteriza-se pela união indissociável entre ciência, técnica e informação. O território agora é organizado para facilitar a circulação de dados e capital, criando espaços luminosos (conectados) e espaços opacos (isolados).', 
    ['O que caracteriza a Revolução Técnico-Científico-Informacional?', 'Explique a diferença entre "espaços luminosos" e "espaços opacos" no território.']),

  createLesson('g2-geo-b4-l4', 'L4: IDH: Índice de Desenvolvimento Humano', 'geografia', 
    'O IDH é a principal ferramenta para comparar o desenvolvimento entre os países, indo além do simples crescimento econômico. Ele considera Longevidade (Saúde), Educação e Renda. Países do Norte Global geralmente lideram o ranking, refletindo o acúmulo histórico de riqueza e bem-estar.', 
    ['Quais são as três dimensões medidas pelo IDH?', 'Por que um país pode ter um PIB alto e um IDH baixo ao mesmo tempo?']),

  createLesson('g2-geo-b4-l5', 'L5: Desigualdades Globais e o Abismo Norte-Sul', 'geografia', 
    'A divisão socioeconômica entre o Norte (desenvolvido) e o Sul (em desenvolvimento) é fruto de processos históricos de colonização e exploração. O abismo manifesta-se no acesso desigual a tecnologias, vacinas, educação de qualidade e infraestrutura básica entre as regiões do globo.', 
    ['O que explica a persistência das desigualdades entre o Norte e o Sul Global?', 'Como a globalização pode tanto diminuir quanto aumentar o abismo entre países ricos e pobres?']),

  createLesson('g2-geo-b4-l6', 'L6: A Geopolítica do Conhecimento', 'geografia', 
    'O conhecimento é hoje o principal fator de produção. A "guerra de patentes", o investimento em pesquisa e desenvolvimento (P&D) e a "fuga de cérebros" (migração de cientistas para países ricos) são temas centrais na disputa pela liderança global do século XXI.', 
    ['O que é a "fuga de cérebros" e como ela prejudica os países do Sul?', 'Por que as patentes são ferramentas de controle econômico no mundo atual?']),

  createLesson('g2-geo-b4-l7', 'L7: O Conceito de Estado e Nação', 'geografia', 
    'Estado é uma instituição política organizada com território, povo e governo soberano. Nação é um conceito cultural: um grupo de pessoas que partilha língua, história e tradições. Nem todo Estado possui apenas uma nação, e existem nações sem Estado (como os Curdos).', 
    ['Diferencie Estado de Nação com exemplos práticos.', 'O que caracteriza a soberania de um Estado sobre seu território?']),

  createLesson('g2-geo-b4-l8', 'L8: Território Nacional e Formação do Brasil', 'geografia', 
    'O território brasileiro foi formado por um longo processo de expansão, desde o Tratado de Tordesilhas até as conquistas dos bandeirantes e acordos diplomáticos no século XX. A diversidade regional do Brasil é reflexo de como cada porção do território foi ocupada e explorada.', 
    ['Como o Tratado de Tordesilhas influenciou a forma inicial do Brasil?', 'Qual o papel da diplomacia na definição das fronteiras atuais do território brasileiro?']),

  createLesson('g2-geo-b4-l9', 'L9: Sistemas de Governo e Geografia Política', 'geografia', 
    'A forma como o poder é organizado (presidencialismo, parlamentarismo, monarquia ou república) influencia a estabilidade e a gestão do território. No Brasil, o presidencialismo e a república federativa buscam equilibrar o poder central com a autonomia dos estados.', 
    ['Explique a diferença básica entre parlamentarismo e presidencialismo.', 'Como o sistema de governo influencia as decisões de política externa de um país?']),

  createLesson('g2-geo-b4-l10', 'L10: Federalismo e as Unidades da Federação', 'geografia', 
    'O federalismo é o sistema onde o poder é dividido entre o governo federal (União) e as unidades da federação (Estados e Municípios). No Tocantins, o governo estadual tem autonomia para criar leis e gerir recursos, mas deve respeitar a Constituição Federal Brasileira.', 
    ['O que caracteriza o sistema federalista brasileiro?', 'Qual a importância da autonomia dos Estados (como o Tocantins) dentro da federação?']),

  createLesson('g2-geo-b4-l11', 'L11: Geopolítica dos Recursos Estratégicos', 'geografia', 
    'Recursos estratégicos são aqueles essenciais para a economia e defesa de um país: petróleo, gás natural, água doce, terras raras e minérios. O controle desses recursos é causa frequente de tensões internacionais e alianças estratégicas entre potências.', 
    ['Cite três exemplos de recursos naturais considerados estratégicos hoje.', 'Por que a água doce está se tornando um tema central na geopolítica mundial?']),

  createLesson('g2-geo-b4-l12', 'L12: Conflitos de Fronteira e Soberania', 'geografia', 
    'Tensões territoriais ocorrem quando dois ou mais Estados disputam a mesma área ou quando minorias étnicas buscam independência. Conflitos na Ucrânia, Taiwan e Faixa de Gaza mostram como a soberania territorial ainda é o principal motivo de guerras no mundo.', 
    ['O que motiva a maioria dos conflitos de fronteira no mundo atual?', 'Como os organismos internacionais tentam mediar disputas de soberania territorial?']),

  createLesson('g2-geo-b4-l13', 'L13: Blocos Econômicos: Regionalização', 'geografia', 
    'Para competir no mercado global, países se unem em blocos econômicos. Existem níveis de integração: Zona de Livre Comércio (redução de tarifas), União Aduaneira (tarifa externa comum), Mercado Comum (livre circulação de pessoas) e União Monetária (moeda única).', 
    ['Quais são os quatro níveis de integração de um bloco econômico?', 'Por que os países preferem se unir em blocos em vez de competir isoladamente?']),

  createLesson('g2-geo-b4-l14', 'L14: MERCOSUL e a Integração Sul-Americana', 'geografia', 
    'O MERCOSUL (Mercado Comum do Sul) é o principal bloco do qual o Brasil faz parte. Seu objetivo é facilitar o comércio entre os vizinhos sul-americanos e fortalecer a região politicamente. O bloco enfrenta desafios de estabilidade política e integração física (estradas e ferrovias).', 
    ['Quais os principais objetivos do MERCOSUL?', 'Quais os maiores obstáculos para uma integração total dos países da América do Sul?']),

  createLesson('g2-geo-b4-l15', 'L15: A ONU e a Governança Global', 'geografia', 
    'A ONU (Organização das Nações Unidas) foi criada após a 2ª Guerra para manter a paz mundial. Através do Conselho de Segurança e da Assembleia Geral, ela tenta coordenar ações globais sobre direitos humanos, ambiente e segurança, apesar das críticas sobre sua efetividade.', 
    ['Qual a função principal do Conselho de Segurança da ONU?', 'Por que a ONU é criticada em relação à sua capacidade de impedir guerras?']),

  createLesson('g2-geo-b4-l16', 'L16: O FMI e a Ordem Financeira Internacional', 'geografia', 
    'O Fundo Monetário Internacional (FMI) atua como um "banco de última instância" para países em crise financeira. Em troca de empréstimos, o FMI muitas vezes exige reformas econômicas severas (como cortes de gastos), o que gera debates sobre a soberania nacional dos países devedores.', 
    ['Qual o papel do FMI na economia global?', 'Quais as principais críticas feitas às exigências do FMI para emprestar dinheiro aos países?']),

  createLesson('g2-geo-b4-l17', 'L17: A OMC e o Comércio Global', 'geografia', 
    'A Organização Mundial do Comércio (OMC) estabelece as regras do comércio entre as nações. Ela busca reduzir o protecionismo (barreiras comerciais) e mediar disputas entre países que acusam uns aos outros de práticas desleais de mercado (subsídios, dumping).', 
    ['O que é protecionismo e como ele afeta o comércio mundial?', 'Qual a função da OMC em uma disputa comercial entre Brasil e União Europeia, por exemplo?']),

  createLesson('g2-geo-b4-l18', 'L18: Prática: Jogo dos Blocos', 'geografia', 
    'Nesta atividade final, os alunos simularão negociações entre diferentes blocos econômicos e países. Eles deverão defender seus interesses comerciais (exportação de soja, tecnologia, petróleo) e tentar fechar acordos que beneficiem sua população e sua soberania.', 
    ['Em sua simulação, qual foi o maior desafio para fechar um acordo comercial?', 'Como a geografia (localização e recursos) influenciou o poder de negociação do seu país?']),
];
