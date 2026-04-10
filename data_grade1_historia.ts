
import { Lesson } from './types';
import { createLesson } from './data_helpers';

// História: 18 aulas por bimestre (Total 72)
export const hisLessonsB1: Lesson[] = [
  createLesson('g1-his-b1-l1', 'L1: O que é História? Ciência e Memória', 'historia', 
    'A História é a ciência que estuda as ações humanas ao longo do tempo. Ela não é apenas o estudo do "passado morto", mas um diálogo entre o presente e o passado para entendermos como chegamos até aqui. Enquanto a memória é algo subjetivo e seletivo (o que lembramos ou esquecemos), a História busca a verdade por meio de métodos científicos e análise crítica de provas.', 
    ['Explique a diferença entre História e Memória.', 'Por que é importante estudar História para entender o presente?']),

  createLesson('g1-his-b1-l2', 'L2: Fontes Históricas: Documentos e Objetos', 'historia', 
    'O historiador é como um detetive que busca "pistas" chamadas fontes históricas. Elas podem ser escritas (cartas, leis), orais (entrevistas, lendas), visuais (fotos, pinturas) ou materiais (utensílios, ruínas). Tudo o que o ser humano produz pode servir como fonte para reconstruir o conhecimento histórico.', 
    ['O que são fontes históricas e qual sua importância?', 'Cite um exemplo de fonte histórica imaterial que você conhece.']),

  createLesson('g1-his-b1-l3', 'L3: Fato Histórico vs. Opinião', 'historia', 
    'Um fato histórico é um evento verificado e comprovado por meio de fontes. A interpretação desse fato pelo historiador deve ser embasada em evidências. Já a opinião sem provas não é História. A construção do conhecimento histórico exige rigor e honestidade com os dados encontrados.', 
    ['Diferencie um fato histórico de uma opinião pessoal.', 'Por que o historiador deve analisar criticamente suas fontes?']),

  createLesson('g1-his-b1-l4', 'L4: Tempo Cronológico e Tempo Histórico', 'historia', 
    'O tempo cronológico é o tempo do relógio e do calendário (linear). O tempo histórico é medido pelas mudanças e permanências na sociedade. Por exemplo: a invenção da internet marca o início de um novo tempo histórico devido às transformações sociais que gerou, independentemente do ano exato no calendário.', 
    ['Diferencie tempo cronológico de tempo histórico.', 'Dê um exemplo de uma "permanência" (algo que não mudou muito) na história da sua cidade.']),

  createLesson('g1-his-b1-l5', 'L5: Arqueologia e a Pré-História no TO', 'historia', 
    'A arqueologia estuda sociedades antigas por meio de restos materiais enterrados. No Tocantins, temos sítios arqueológicos riquíssimos, como em Lajeado e Dianópolis, com pinturas rupestres que datam de milhares de anos, provando que o cerrado já era habitado por grupos humanos muito antes da chegada dos europeus.', 
    ['O que estuda a arqueologia?', 'O que as pinturas rupestres podem nos contar sobre os primeiros habitantes do Tocantins?']),

  createLesson('g1-his-b1-l6', 'L6: Oralidade e Tradição: A História Contada', 'historia', 
    'Muitas culturas não usam a escrita para preservar o passado, mas sim a fala. Griôs na África e anciãos em comunidades indígenas e quilombolas do Tocantins são "bibliotecas vivas". A oralidade é uma fonte científica fundamental para entender povos que tiveram sua história oficial silenciada por muito tempo.', 
    ['Qual a importância da tradição oral para os povos indígenas e quilombolas?', 'Quem são os guardiões da memória em sua família ou comunidade?']),

  createLesson('g1-his-b1-l7', 'L7: O Berço da Humanidade: A África', 'historia', 
    'Evidências biológicas e arqueológicas provam que a espécie humana (Homo sapiens) surgiu no continente africano. De lá, grupos migraram para o resto do mundo. Portanto, a África é a "mãe" de todas as civilizações, com uma diversidade cultural e tecnológica que existia muito antes da colonização europeia.', 
    ['Por que a África é chamada de berço da humanidade?', 'Como as primeiras migrações humanas moldaram a ocupação do globo?']),

  createLesson('g1-his-b1-l8', 'L8: Civilizações do Oriente Médio e Ásia', 'historia', 
    'Mesopotâmia, Egito, Índia e China desenvolveram os primeiros Estados, sistemas de escrita e leis complexas. Essas sociedades eram frequentemente "hidráulicas", pois dependiam do controle de grandes rios (Nilo, Tigre, Eufrates) para a agricultura e sobrevivência das cidades.', 
    ['Qual a relação entre os rios e o surgimento das primeiras civilizações?', 'Qual a importância da invenção da escrita para a administração desses impérios?']),

  createLesson('g1-his-b1-l9', 'L9: Impérios Africanos: Mali e Gana', 'historia', 
    'A África medieval teve impérios riquíssimos e organizados. O Império do Mali, liderado por Mansa Musa, foi um centro mundial de comércio de ouro e conhecimento (Universidade de Timbuktu). Isso quebra o preconceito de que a África era "atrasada" antes do contato com os europeus.', 
    ['Cite características que mostram o poder e a riqueza do Império do Mali.', 'Por que é importante estudar impérios africanos na escola?']),

  createLesson('g1-his-b1-l10', 'L10: O Povoamento da América', 'historia', 
    'Existem várias teorias sobre como o homem chegou à América: pelo Estreito de Bering (ponte de terra/gelo) ou por navegações pelo Oceano Pacífico. Achados arqueológicos no Brasil, como o crânio de Luzia (em Minas Gerais), sugerem que o povoamento pode ser muito mais antigo do que se pensava.', 
    ['Quais as principais teorias sobre a chegada do homem à América?', 'Quem foi "Luzia" e por que ela mudou o que sabíamos sobre a pré-história brasileira?']),

  createLesson('g1-his-b1-l11', 'L11: Civilizações Pré-Colombianas: Incas e Maias', 'historia', 
    'Antes de Colombo, a América abrigava impérios sofisticados. Os Maias dominavam a astronomia e matemática. Os Incas, nos Andes, criaram um sistema administrativo gigante com estradas e os "quipus" (cordas de nós para contagem). Eram sociedades urbanas com conhecimentos avançados de engenharia.', 
    ['Cite um avanço científico dos Maias.', 'Como os Incas organizavam seu vasto território nas montanhas?']),

  createLesson('g1-his-b1-l12', 'L12: A Diversidade Indígena no Brasil Pré-Cabral', 'historia', 
    'Em 1500, o Brasil era habitado por milhões de pessoas divididas em milhares de povos (Tupis, Macro-Jê, etc). Eles possuíam organizações sociais complexas, faziam o manejo da floresta e não eram "primitivos", mas sim sociedades com culturas e tecnologias adaptadas ao seu meio.', 
    ['Descreva a diversidade linguística e cultural do Brasil antes de 1500.', 'Como os povos indígenas se relacionavam com a natureza sem destruí-la?']),

  createLesson('g1-his-b1-l13', 'L13: O Século das Luzes: O Iluminismo', 'historia', 
    'Movimento intelectual do século XVIII que valorizava a Razão e a Ciência em oposição ao dogma religioso e ao Absolutismo. Os iluministas acreditavam que a luz da razão poderia iluminar a humanidade, combatendo a ignorância e a tirania dos reis.', 
    ['O que os iluministas queriam dizer com "luz" em oposição às "trevas"?', 'Qual o papel da razão na busca pela liberdade individual?']),

  createLesson('g1-his-b1-l14', 'L14: John Locke e o Liberalismo Político', 'historia', 
    'Locke defendia que todo ser humano nasce com direitos naturais: vida, liberdade e propriedade. Para ele, o governo é um contrato para proteger esses direitos; se o governante não os protege, o povo tem o direito (e dever) de se revoltar e mudar o governo.', 
    ['Quais são os direitos naturais defendidos por Locke?', 'Explique a ideia de "contrato social" segundo o pensamento liberal.']),

  createLesson('g1-his-b1-l15', 'L15: Montesquieu e a Divisão dos Poderes', 'historia', 
    'Para evitar a tirania (onde um homem manda em tudo), Montesquieu propôs dividir o poder do State em três: Executivo, Legislativo e Judiciário. Um poder deve limitar o outro ("o poder freia o poder"). Essa é a base de quase todas as democracias modernas, inclusive a do Brasil.', 
    ['Por que a divisão em três poderes é importante para evitar a ditadura?', 'Qual a função de cada um dos três poderes em nosso país?']),

  createLesson('g1-his-b1-l16', 'L16: Rousseau e o Contrato Social', 'historia', 
    'Rousseau defendia que a soberania reside no Povo, e não no Rei. A "Vontade Geral" deve guiar o Estado para o bem comum. Ele criticava a desigualdade social e acreditava que a educação e a participação direta eram fundamentais para uma sociedade justa.', 
    ['O que Rousseau entende por "Vontade Geral"?', 'Por que para Rousseau o povo é o verdadeiro soberano?']),

  createLesson('g1-his-b1-l17', 'L17: Voltaire e a Liberdade de Pensamento', 'historia', 
    'Voltaire foi um grande defensor da liberdade de expressão e da tolerância religiosa. Ele criticava duramente a aliança entre a Igreja e o Estado Absolutista, defendendo que ninguém deveria ser perseguido por suas ideias ou crenças.', 
    ['Qual a importância da tolerância religiosa para a paz social?', 'Como a liberdade de expressão defendida por Voltaire se aplica nos dias de hoje?']),

  createLesson('g1-his-b1-l18', 'L18: Do Iluminismo à Democracia Atual', 'historia', 
    'Os ideais iluministas inspiraram grandes revoluções (Americana, Francesa e a Inconfidência Mineira no Brasil). Nossos Direitos Humanos e as constituições democráticas atuais são frutos diretos desse pensamento que colocou a liberdade e a razão no centro da política.', 
    ['Como o iluminismo influenciou as leis que temos hoje no Brasil?', 'Qual a relação entre "Razão" e "Democracia" no mundo contemporâneo?']),
];

export const hisLessonsB2: Lesson[] = [
  createLesson('g1-his-b2-l1', 'L1: O Conceito de Migração na História', 'historia', 
    'Migração é o deslocamento de pessoas de um lugar para outro, atravessando fronteiras geográficas ou administrativas. Na História, os seres humanos sempre se moveram por necessidade (comida, segurança) ou desejo (melhores oportunidades). As migrações são responsáveis pela mistura de línguas, religiões e tecnologias que formam o mundo atual.', 
    ['Diferencie migração voluntária de migração forçada.', 'Como as migrações influenciam a cultura de um lugar?']),

  createLesson('g1-his-b2-l2', 'L2: A Grande Imigração Europeia (1850-1920)', 'historia', 
    'Entre meados do século XIX e início do XX, milhões de europeus (italianos, alemães, poloneses, espanhóis) migraram para as Américas. Fugindo da pobreza, das guerras e da falta de terras na Europa, eles buscavam no Brasil uma nova vida, especialmente nas fazendas de café do Sul e Sudeste.', 
    ['Quais foram os principais "fatores de repulsão" que fizeram os europeus saírem de seus países?', 'Por que o Brasil era visto como uma terra de oportunidades para esses imigrantes?']),

  createLesson('g1-his-b2-l3', 'L3: Imigração e a Substituição do Trabalho Escravo', 'historia', 
    'Com a proibição do tráfico negreiro (1850) e a abolição da escravidão (1888), os fazendeiros de café buscaram o imigrante europeu para substituir a mão de obra escravizada. O governo brasileiro incentivou essa vinda também com uma ideologia racista de "branqueamento" da população.', 
    ['Qual a relação entre o fim da escravidão e o incentivo à imigração europeia no Brasil?', 'O que se entendia por política de "branqueamento" no século XIX?']),

  createLesson('g1-his-b2-l4', 'L4: Imigração Asiática: Japoneses e Libaneses', 'historia', 
    'Além de europeus, o Brasil recebeu fluxos significativos de asiáticos. Os japoneses chegaram a partir de 1908, focando na agricultura de alimentos. Já os árabes (libaneses e sírios) destacaram-se no comércio mascate, percorrendo o interior do país e integrando regiões distantes através das trocas comerciais.', 
    ['Como a imigração japonesa contribuiu para the agricultura brasileira?', 'Qual o papel dos imigrantes sírio-libaneses na formação do comércio no interior do Brasil?']),

  createLesson('g1-his-b2-l5', 'L5: Migrações Internas: O Êxodo Rural', 'historia', 
    'No século XX, o Brasil viveu uma explosão de migração interna. Milhões de pessoas saíram do campo, especialmente do Nordeste e Minas Gerais, rumo às cidades do Rio de Janeiro e São Paulo. A industrialização e a mecanização do campo foram os grandes motores desse deslocamento em massa.', 
    ['O que é o êxodo rural e por que ele ocorreu de forma tão intensa no Brasil?', 'Quais as consequências desse movimento para as grandes cidades brasileiras?']),

  createLesson('g1-his-b2-l6', 'L6: Imigração e Movimentos Operários', 'historia', 
    'Muitos imigrantes europeus que chegaram às fábricas brasileiras já tinham experiência política. Eles trouxeram ideias anarquistas e socialistas da Europa, organizando as primeiras greves e fundando os primeiros sindicatos no Brasil para lutar por direitos como a jornada de 8 horas.', 
    ['Como os imigrantes influenciaram o surgimento dos sindicatos no Brasil?', 'Quais eram as principais pautas de luta dos primeiros movimentos operários brasileiros?']),

  createLesson('g1-his-b2-l7', 'L7: Migrações no Pós-Guerra e Ditaduras', 'historia', 
    'Após a 2ª Guerra Mundial e durante as ditaduras militares na América Latina (anos 60/70/80), novos fluxos migratórios ocorreram. Pessoas fugiam da perseguição política em países vizinhos e buscavam refúgio no Brasil, enquanto brasileiros também saíam para o exílio.', 
    ['Qual o impacto das ditaduras militares nos fluxos migratórios da América Latina?', 'O que significa o termo "exilado político"?']),

  createLesson('g1-his-b2-l8', 'L8: Xenofobia e Identidade Nacional', 'historia', 
    'A xenofobia (preconceito contra estrangeiros) sempre esteve presente na história. Muitas vezes, o imigrante é usado como "bode expiatório" para crises econômicas. A construção da identidade nacional brasileira tentou criar o mito da "democracia racial", mas na prática, grupos diferentes enfrentaram barreiras e exclusões.', 
    ['Por que o preconceito contra imigrantes tende a crescer em momentos de crise econômica?', 'Como a xenofobia fere os princípios dos Direitos Humanos?']),

  createLesson('g1-his-b2-l9', 'L9: O Capitalismo Global e a Fuga de Cérebros', 'historia', 
    'Na era da globalização, observamos a "fuga de cérebros": a migração de profissionais altamente qualificados (médicos, engenheiros, cientistas) de países em desenvolvimento para países ricos. Isso gera um prejuízo enorme para o país de origem, que investiu na educação mas perde o profissional para o mercado externo.', 
    ['O que é o fenômeno da "fuga de cérebros"?', 'Como a desigualdade econômica global incentiva esse tipo de migração?']),

  createLesson('g1-his-b2-l10', 'L10: História da Urbanização Brasileira', 'historia', 
    'O Brasil deixou de ser um país majoritariamente rural para ser urbano em menos de 40 anos (entre 1940 e 1980). Esse processo foi tão rápido que o Estado não conseguiu planejar moradia e transporte para todos, resultando no surgimento de favelas e periferias sem infraestrutura básica.', 
    ['Por que a urbanização brasileira é descrita como "tardia e acelerada"?', 'Cite um problema urbano atual que tem suas raízes no crescimento desordenado do século XX.']),

  createLesson('g1-his-b2-l11', 'L11: A Marcha para o Oeste (Era Vargas)', 'historia', 
    'Na década de 1940, o governo de Getúlio Vargas lançou a "Marcha para o Oeste", uma política para ocupar e integrar o Centro-Oeste e o Norte ao resto do país. Foram criadas colônias agrícolas e infraestruturas que abriram caminho para a ocupação definitiva do interior do Brasil.', 
    ['Qual era o objetivo estratégico da "Marcha para o Oeste"?', 'Como essa política afetou a vida dos povos indígenas que já viviam no interior do país?']),

  createLesson('g1-his-b2-l12', 'L12: Brasília e a Integração Nacional', 'historia', 
    'A construção de Brasília por Juscelino Kubitschek (1960) foi o auge da interiorização do Brasil. A nova capital no centro do país visava transferir o eixo de poder do litoral para o interior e incentivar o desenvolvimento econômico de regiões até então esquecidas pelo governo.', 
    ['Por que o governo decidiu mudar a capital do Rio de Janeiro para Brasília?', 'Qual a importância de Brasília para a integração regional do Brasil?']),

  createLesson('g1-his-b2-l13', 'L13: A Luta pela Criação do Tocantins', 'historia', 
    'O Tocantins nasceu de um desejo antigo de separação do norte de Goiás, que se sentia abandonado pelo governo estadual em Goiânia. Líderes como Siqueira Campos mobilizaram a população em uma luta política que durou décadas e culminou na criação do estado pela Constituição de 1988.', 
    ['Quais eram as principais queixas da população do norte de Goiás que levaram à criação do Tocantins?', 'Em que ano o estado do Tocantins foi oficialmente criado?']),

  createLesson('g1-his-b2-l14', 'L14: Palmas: Planejamento e Poder', 'historia', 
    'Palmas foi construída para ser a sede administrativa do novo estado. Sendo uma cidade planejada em 1989, ela reflete ideais de modernidade e ordem. No entanto, sua história também é marcada pela exclusão de quem não tinha dinheiro para morar no centro planejado, gerando segregação desde o início.', 
    ['Quais os símbolos de poder e modernidade presentes no planejamento original de Palmas?', 'Como se deu a ocupação das áreas fora do Plano Diretor original de Palmas?']),

  createLesson('g1-his-b2-l15', 'L15: Ética Socioambiental e Desenvolvimento', 'historia', 
    'O desenvolvimento da humanidade não pode ignorar os limites do planeta. A ética socioambiental defende que o crescimento econômico deve vir acompanhado de justiça social e preservação da natureza. Na história do Brasil, muitas vezes o lucro rápido veio à custa de grandes desastres ambientais.', 
    ['O que significa ter uma visão "socioambiental" do desenvolvimento?', 'Cite um conflito histórico entre exploração econômica e preservação ambiental no Brasil.']),

  createLesson('g1-his-b2-l16', 'L16: Políticas de Saneamento e Saúde Pública', 'historia', 
    'A saúde pública evoluiu desde as campanhas de vacinação obrigatória (Revolta da Vacina, 1904) até a criação do SUS (1988). No entanto, o saneamento básico (esgoto e água tratada) ainda é o maior desafio histórico das cidades brasileiras para evitar doenças e garantir dignidade.', 
    ['Qual a importância do saneamento básico para a saúde preventiva da população?', 'O que foi a Revolta da Vacina e o que ela nos ensina sobre a relação entre governo e povo?']),

  createLesson('g1-his-b2-l17', 'L17: Prática: Conduzindo a Entrevista', 'historia', 
    'Nesta prática, o aluno deverá entrevistar um familiar ou vizinho que tenha migrado para o Tocantins ou mudado de cidade. O objetivo é coletar uma história oral sobre as motivações da mudança, as dificuldades de adaptação e as memórias do lugar de origem.', 
    ['Prepare 3 perguntas que você fará ao seu entrevistado sobre sua jornada migratória.', 'Qual a importância de ouvir as histórias das pessoas comuns para entender a História de um estado?']),

  createLesson('g1-his-b2-l18', 'L18: Prática: Relatório e Conclusão', 'historia', 
    'Após a entrevista, o aluno escreverá um pequeno relatório sintetizando o que aprendeu. Ele deve relacionar a história individual coletada com os conceitos estudados (êxodo rural, migração interna, busca por oportunidades) e concluir sobre a diversidade do povo tocantinense.', 
    ['Como a história da pessoa que você entrevistou se conecta com a história maior do Brasil ou do Tocantins?', 'O que mais te surpreendeu no relato que você ouviu?']),
];

export const hisLessonsB3: Lesson[] = [
  createLesson('g1-his-b3-l1', 'L1: Revolução Industrial e o Emprego', 'historia', 
    'A Revolução Industrial (séc. XVIII) mudou a forma como o ser humano produz e trabalha. A saída da oficina artesanal para a fábrica mecanizada criou a classe operária (proletariado). O trabalho, antes guiado pelo ritmo da natureza ou do artesão, passou a ser ditado pelo ritmo da máquina e do relógio da fábrica.', 
    ['Como a Revolução Industrial alterou a relação entre o trabalhador e o produto final?', 'Quais as principais mudanças no cotidiano das pessoas que saíram do campo para trabalhar nas fábricas?']),

  createLesson('g1-his-b3-l2', 'L2: Fordismo e Taylorismo', 'historia', 
    'No início do séc. XX, Taylor propôs a gerência científica (divisão máxima de tarefas e cronometragem). Henry Ford aplicou isso na linha de montagem, criando o consumo de massa. O trabalhador fazia apenas um movimento repetitivo o dia todo, perdendo a visão do conjunto da produção em troca de maior velocidade.', 
    ['O que significa a "divisão técnica do trabalho" no Taylorismo?', 'Quais as vantagens e desvantagens do modelo fordista para o trabalhador da época?']),

  createLesson('g1-his-b3-l3', 'L3: Toyotismo e Flexibilização', 'historia', 
    'Após a década de 1970, surgiu o Toyotismo no Japão. Em vez de grandes estoques, a produção é "Just-in-Time" (apenas o necessário). O trabalhador deixa de ser repetitivo e passa a ser multifuncional, operando várias máquinas e participando do controle de qualidade.', 
    ['Diferencie a função do operário no Fordismo da função no Toyotismo.', 'O que é a produção "Just-in-Time"?']),

  createLesson('g1-his-b3-l4', 'L4: Terceirização e Precarização', 'historia', 
    'Com a globalização, as empresas passaram a terceirizar serviços (contratar outras empresas para tarefas secundárias). Isso reduz custos, mas muitas vezes leva à precarização: salários menores, menos benefícios e maior rotatividade, dificultando a organização dos trabalhadores.', 
    ['O que é terceirização e por que as empresas a utilizam?', 'Por que a terceirização é frequentemente associada à precarização do trabalho?']),

  createLesson('g1-his-b3-l5', 'L5: Uberização e Apps', 'historia', 
    'A "uberização" é o modelo de trabalho via plataformas digitais. O trabalhador é visto como um "parceiro" ou "autônomo", mas na prática depende totalmente do algoritmo do app. Não há garantias de salário mínimo, férias ou seguro em caso de acidentes, criando uma nova forma de insegurança laboral.', 
    ['Como os algoritmos controlam o trabalho na economia de aplicativos?', 'Quais os principais riscos enfrentados por trabalhadores "uberizados" hoje no Brasil?']),

  createLesson('g1-his-b3-l6', 'L6: Ocupação vs Subemprego no Brasil', 'historia', 
    'No Brasil, a diferença entre ocupação e emprego formal é grande. O subemprego (vagas com baixa remuneração, sem direitos e carga horária irregular) atinge milhões. Isso reflete uma economia que cresce sem gerar vagas de qualidade, mantendo a desigualdade social elevada.', 
    ['Diferencie emprego formal de subemprego.', 'Como o subemprego afeta o planejamento do futuro dos jovens brasileiros?']),

  createLesson('g1-his-b3-l7', 'L7: Trabalho Escravo Contemporâneo', 'historia', 
    'Infelizmente, o trabalho análogo à escravidão ainda existe. Ele se caracteriza por condições degradantes, jornada exaustiva, servidão por dívida ou cerceamento de liberdade. No Tocantins, o combate a essa prática ocorre especialmente em grandes fazendas e carvoarias.', 
    ['O que caracteriza o "trabalho análogo à escravidão" no século XXI?', 'Como a fiscalização do trabalho atua para libertar pessoas nessas condições?']),

  createLesson('g1-his-b3-l8', 'L8: Futuro e Inteligência Artificial', 'historia', 
    'A Inteligência Artificial (IA) está automatizando não apenas o trabalho braçal, mas também o intelectual (análises, textos, diagnósticos). O futuro exige que o trabalhador aprenda a usar essas ferramentas, focando em habilidades tipicamente humanas: criatividade, ética e empatia.', 
    ['Como a IA pode transformar as profissões que existem hoje?', 'Quais habilidades você considera essenciais para o trabalhador do futuro?']),

  createLesson('g1-his-b3-l9', 'L9: Constituição de 1824: O Império', 'historia', 
    'A primeira constituição brasileira foi outorgada (imposta) por D. Pedro I. Ela criou o "Poder Moderador", que dava ao imperador controle sobre os outros três poderes. O voto era censitário (baseado na renda) e a escravidão foi mantida, mostrando um país elitista e centralizador.', 
    ['O que era o Poder Moderador e por que ele era autoritário?', 'Como o voto censitário excluía a maioria da população da política imperial?']),

  createLesson('g1-his-b3-l10', 'L10: Constituição de 1891: A República', 'historia', 
    'A primeira constituição republicana trouxe o federalismo (autonomia para os estados) e o Estado Laico (separação entre Igreja e Estado). O voto passou a ser direto, mas ainda excluía mulheres, analfabetos e soldados, mantendo o poder nas mãos das elites agrárias.', 
    ['Quais as principais mudanças da monarquia para a república na CF de 1891?', 'O que significa dizer que o Brasil se tornou um "Estado Laico" em 1891?']),

  createLesson('g1-his-b3-l11', 'L11: Era Vargas: 1934 e 1937', 'historia', 
    'Em 1934, tivemos avanços como o voto feminino e as leis trabalhistas. Porém, em 1937, Vargas impôs a "Polaca", uma constituição autoritária que deu início ao Estado Novo, fechando o Congresso e centralizando todo o poder nas mãos do presidente.', 
    ['Diferencie the face democrática da CF de 1934 da face autoritária da CF de 1937.', 'Qual a importância da conquista do voto feminino na década de 30?']),

  createLesson('g1-his-b3-l12', 'L12: Constituição de 1946', 'historia', 
    'Após a 2ª Guerra e o fim da Era Vargas, o Brasil voltou à democracia. A CF de 1946 garantiu liberdades individuais, direito de greve e liberdade de expressão, tentando equilibrar a ordem social com a participação popular no período populista.', 
    ['Por que a constituição de 1946 é considerada um retorno à democracia?', 'Quais direitos civis foram restabelecidos nesta carta constitucional?']),

  createLesson('g1-his-b3-l13', 'L13: Ditadura e a CF de 1967/69', 'historia', 
    'Com o golpe de 1964, os militares criaram uma constituição que restringia os direitos políticos e centralizava o poder. Os Atos Institucionais (como o AI-5) permitiam ao governo suspender garantias fundamentais, prender sem ordem judicial e cassar mandatos políticos.', 
    ['Como os Atos Institucionais (AI) esvaziavam o poder da própria constituição?', 'Qual o impacto do AI-5 na liberdade de imprensa e na política brasileira?']),

  createLesson('g1-his-b3-l14', 'L14: A CF Cidadã de 1988', 'historia', 
    'A atual constituição brasileira é chamada de "Cidadã" porque foi escrita com grande participação popular após a ditadura. Ela garantiu direitos sociais inéditos (saúde universal via SUS, educação, proteção ao meio ambiente e aos povos indígenas), sendo a base da nossa democracia atual.', 
    ['Por que a constituição de 1988 recebeu o apelido de "Constituição Cidadã"?', 'Cite dois direitos sociais importantes garantidos por esta constituição.']),

  createLesson('g1-his-b3-l15', 'L15: Direitos e Deveres', 'historia', 
    'Viver em sociedade exige o equilíbrio entre direitos (como liberdade e saúde) e deveres (respeitar as leis, pagar impostos, votar). A constituição protege o indivíduo contra o abuso de poder do Estado, mas também cobra responsabilidade ética de cada cidadão com o bem comum.', 
    ['Explique a relação de interdependência entre direitos e deveres na cidadania.', 'Como o conhecimento da constituição ajuda a proteger o cidadão de abusos?']),

  createLesson('g1-his-b3-l16', 'L16: Evolução da Educação', 'historia', 
    'A educação brasileira evoluiu de um sistema elitista no Império para o direito universal de hoje. Constituições anteriores não garantiam vagas para todos; somente em 1988 o Estado assumiu a obrigação total de oferecer ensino gratuito e de qualidade como base da cidadania.', 
    ['Como o acesso à educação mudou nas diferentes constituições brasileiras?', 'Qual o papel da educação na formação de um cidadão consciente de seus direitos?']),

  createLesson('g1-his-b3-l17', 'L17: Prática: Constituição Jovem', 'historia', 
    'Nesta prática, a turma será dividida em grupos ("comissões constituintes"). Cada grupo deve redigir três "leis" ou artigos para uma "Constituição Escolar", focando em convivência, respeito, uso da tecnologia e preservação do ambiente da escola.', 
    ['Se você pudesse criar uma lei para melhorar sua escola, qual seria?', 'Como equilibrar os desejos individuais com o que é melhor para todo o grupo escolar?']),

  createLesson('g1-his-b3-l18', 'L18: Prática: Promulgação', 'historia', 
    'Na aula final, os grupos apresentarão suas propostas e a turma votará em uma assembleia geral. O texto final será "promulgado" simbolicamente, reforçando o valor do debate democrático e da construção coletiva de regras para a sociedade.', 
    ['Qual a importância do debate e da votação na criação de uma lei?', 'Como você se sentiu participando do processo de criação de uma "constituição" para o seu grupo?']),
];

export const hisLessonsB4: Lesson[] = [
  createLesson('g1-his-b4-l1', 'L1: Movimentos Sociais', 'historia', 
    'Movimentos sociais são ações coletivas organizadas que buscam mudanças na sociedade ou a preservação de direitos. Eles são fundamentais para a democracia, pois dão voz a grupos que muitas vezes são ignorados pelo poder oficial. Exemplos históricos incluem a luta pelo voto, o movimento estudantil e as lutas por terra e moradia.', 
    ['O que caracteriza um movimento social?', 'Qual a importância dos movimentos sociais para a conquista de direitos na história do Brasil?']),

  createLesson('g1-his-b4-l2', 'L2: Movimento Negro', 'historia', 
    'A luta negra no Brasil é secular, vindo desde a resistência nos Quilombos. Após a abolição (1888), o movimento negro focou na denúncia do preconceito, na valorização da cultura afro-brasileira e na luta por inclusão social, resultando em conquistas como as cotas universitárias e a lei contra o racismo.', 
    ['Destaque dois momentos importantes na história do movimento negro no Brasil.', 'Por que a luta negra continua sendo necessária mesmo após o fim da escravidão?']),

  createLesson('g1-his-b4-l3', 'L3: Racismo Estrutural', 'historia', 
    'O racismo estrutural é a ideia de que o preconceito não é apenas um ato individual, mas algo enraizado no funcionamento da sociedade (leis, economia, cultura). No Brasil, isso é visível quando observamos que negros possuem, historicamente, menores salários e menos acesso a cargos de poder, reflexo de séculos de exclusão sistemática.', 
    ['O que significa o conceito de "racismo estrutural"?', 'Como o racismo estrutural se manifesta na desigualdade econômica brasileira?']),

  createLesson('g1-his-b4-l4', 'L4: Feminismo', 'historia', 
    'O feminismo é o movimento pela igualdade de direitos entre homens e mulheres. Historicamente, as mulheres lutaram primeiro pelo direito ao estudo, depois pelo voto (conquistado no Brasil em 1932) e, mais recentemente, pelo fim da violência doméstica e igualdade salarial. É uma luta pela autonomia do corpo e da vida feminina.', 
    ['Quais foram as principais conquistas do feminismo no Brasil do século XX?', 'Por que a igualdade salarial ainda é um desafio para as mulheres hoje?']),

  createLesson('g1-his-b4-l5', 'L5: LGBTQIA+ e Cidadania', 'historia', 
    'A luta LGBTQIA+ busca o reconhecimento da diversidade sexual e de gênero como parte dos direitos civis. Historicamente marcados pela perseguição e silenciamento, esses grupos conquistaram avanços recentes no Brasil, como o reconhecimento da união estável homoafetiva e a criminalização da homofobia pelo STF.', 
    ['Quais os principais objetivos do movimento LGBTQIA+ na busca por cidadania?', 'Como o reconhecimento legal de direitos protege as pessoas contra a violência?']),

  createLesson('g1-his-b4-l6', 'L6: Juventude e Política', 'historia', 
    'Os jovens sempre foram protagonistas em mudanças históricas. Desde o movimento "Cara-pintada" em 1992 até as ocupações de escolas em 2016, a juventude usa a política para questionar o presente e projetar o futuro. Participar da política vai além de votar: envolve engajamento social e consciência crítica.', 
    ['Cite um exemplo histórico onde a juventude brasileira mudou o rumo da política.', 'De que outras formas, além do voto, o jovem pode participar da vida política do país?']),

  createLesson('g1-his-b4-l7', 'L7: Hip-Hop e Periferia', 'historia', 
    'O Hip-Hop (Rap, Break, Graffiti, DJ) surgiu nas periferias como uma ferramenta de denúncia social e autoafirmação. No Brasil, letras de Rap narram a história das quebradas, denunciando o racismo e a violência policial, ao mesmo tempo em que promovem o orgulho da identidade periférica.', 
    ['Como a cultura Hip-Hop serve como forma de resistência política?', 'Qual a importância do Rap para dar voz aos jovens das periferias brasileiras?']),

  createLesson('g1-his-b4-l8', 'L8: Movimento Indígena', 'historia', 
    'A luta indígena no Brasil foca na demarcação de terras, proteção ambiental e respeito às culturas tradicionais. A Constituição de 1988 foi um marco, reconhecendo que as terras indígenas são bens da União de uso exclusivo dos povos. O movimento luta hoje contra projetos que ameaçam esses direitos.', 
    ['Qual a principal reivindicação do movimento indígena no Brasil atual?', 'Como a proteção das terras indígenas beneficia o equilíbrio climático do planeta?']),

  createLesson('g1-his-b4-l9', 'L9: Reforma Agrária', 'historia', 
    'A luta pela terra no Brasil remonta às Ligas Camponesas e ao surgimento do MST. O objetivo é a redistribuição de latifúndios improdutivos para famílias que queiram produzir alimentos. É uma pauta histórica que busca combater a concentração de terras e a pobreza no campo.', 
    ['O que defende o movimento pela Reforma Agrária?', 'Qual a importância da agricultura familiar para a alimentação da população urbana?']),

  createLesson('g1-his-b4-l10', 'L10: Direitos Humanos Pós-1988', 'historia', 
    'Os Direitos Humanos no Brasil ganharam força com a redemocratização. Eles garantem que todo cidadão tenha direito à vida, integridade física, liberdade e dignidade. Apesar de garantidos na lei, o desafio histórico é fazer com que esses direitos cheguem de fato às populações mais vulneráveis.', 
    ['O que são Direitos Humanos e quem eles devem proteger?', 'Cite um desafio para a aplicação dos Direitos Humanos no Brasil atual.']),

  // Fixed typo 'hisotria' to 'historia'
  createLesson('g1-his-b4-l11', 'L11: Estatuto Igualdade Racial', 'historia', 
    'Promulgado em 2010, o Estatuto da Igualdade Racial é uma lei que busca corrigir desigualdades históricas. Ele prevê ações afirmativas, proteção da cultura negra e combate à discriminação em áreas como saúde, educação e mercado de trabalho, reafirmando o compromisso do Estado com a justiça racial.', 
    ['Qual o objetivo do Estatuto da Igualdade Racial?', 'O que são "ações afirmativas" e como elas funcionam na educação?']),

  createLesson('g1-his-b4-l12', 'L12: Lei 10.639/03', 'historia', 
    'Esta lei tornou obrigatório o ensino de História e Cultura Africana e Afro-Brasileira nas escolas. O objetivo é combater o eurocentrismo e mostrar a importância fundamental dos negros na formação da identidade, economia e cultura do Brasil, valorizando as raízes africanas.', 
    ['Por que é importante estudar a história da África e da cultura negra nas escolas brasileiras?', 'Como o conhecimento das raízes africanas ajuda a combater o racismo na escola?']),

  createLesson('g1-his-b4-l13', 'L13: Proteção Internacional', 'historia', 
    'O Brasil faz parte de sistemas internacionais de proteção aos direitos humanos, como a ONU e a OEA. Quando os direitos são violados internamente e o Estado não resolve, o país pode ser denunciado em cortes internacionais. Isso mostra que os direitos humanos estão acima da soberania nacional em casos de abusos graves.', 
    ['Como funcionam os tribunais internacionais de direitos humanos?', 'Dê um exemplo de um caso brasileiro levado a cortes internacionais (ex: Maria da Penha).']),

  createLesson('g1-his-b4-l14', 'L14: Quilombos TO: Jalapão', 'historia', 
    'As comunidades quilombolas do Jalapão (Mumbuca, Prata, etc.) são símbolos de resistência histórica no Tocantins. Formadas por pessoas que fugiram da escravidão ou que se estabeleceram em áreas isoladas, elas mantêm tradições como o batuque e o artesanato, lutando hoje pelo título definitivo de suas terras.', 
    ['Como os quilombos do Tocantins se originaram?', 'Qual a importância do artesanato de capim dourado para a identidade quilombola do Jalapão?']),

  createLesson('g1-his-b4-l15', 'L15: Povos TO: Identidade', 'historia', 
    'O Tocantins é um mosaico étnico: Krahô, Xerente, Karajá, Apinajé, Javaé e outros. Cada povo tem sua história de resistência contra a colonização e a expansão da fronteira agrícola. A identidade tocantinense é inseparável da presença e da luta desses povos originários pelo seu território.', 
    ['Descreva a diversidade indígena do estado do Tocantins.', 'Como a criação do estado do Tocantins afetou os povos indígenas que já viviam aqui?']),

  createLesson('g1-his-b4-l16', 'L16: Patrimônio Cerrado', 'historia', 
    'O Cerrado não é apenas um bioma, é um patrimônio histórico e cultural. Nele vivem comunidades tradicionais que detêm conhecimentos ancestrais sobre plantas medicinais e manejo do fogo. A história do Tocantins está ligada à preservação deste bioma contra a destruição acelerada.', 
    ['Por que o Cerrado é considerado um patrimônio cultural e não apenas biológico?', 'Como os saberes tradicionais podem ajudar na preservação ambiental hoje?']),

  createLesson('g1-his-b4-l17', 'L17: Prática: Mini-doc', 'historia', 
    'Nesta prática, os alunos deverão gravar um vídeo curto (3 a 5 minutos) entrevistando um líder comunitário, um idoso ou um representante de movimento social local. O objetivo é registrar uma história de luta ou uma tradição cultural da sua cidade ou bairro.', 
    ['Qual tema você escolheu para seu mini-documentário? Por quê?', 'O que você aprendeu ouvindo a história de vida da pessoa que você entrevistou?']),

  createLesson('g1-his-b4-l18', 'L18: Prática: Reflexão Final', 'historia', 
    'Como fechamento do ano, os alunos farão um círculo de conversa para refletir sobre como a História não é algo distante, mas algo que construímos todos os dias. Ser cidadão no Tocantins hoje exige conhecer o passado para transformar o futuro, respeitando a diversidade e os direitos de todos.', 
    ['Qual foi a aula de História que mais mudou sua forma de ver o mundo este ano?', 'Como você pode aplicar o que aprendeu em História para ser um cidadão mais ativo em sua comunidade?']),
];
