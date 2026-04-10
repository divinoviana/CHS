import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Geografia: 18 aulas por bimestre (Total 72)
export const geoLessonsB1: Lesson[] = [
  createLesson('g1-geo-b1-l1', 'L1: O Espaço Geográfico como Construção Social', 'geografia', 
    'O espaço geográfico é a natureza transformada pelo trabalho humano. Diferente do espaço natural, ele é o resultado da interação entre a sociedade e o meio. Cada sociedade, em diferentes épocas, organiza o espaço de acordo com suas necessidades, tecnologias e relações de poder. Em Palmas, por exemplo, o que era cerrado virou avenidas e quadras por meio de uma decisão política e trabalho humano.', 
    ['Explique com suas palavras a diferença entre espaço natural e espaço geográfico.', 'Como o trabalho humano altera a paisagem da sua cidade?']),
  
  createLesson('g1-geo-b1-l2', 'L2: Natureza e Sociedade: Conflitos e Harmonia', 'geografia', 
    'A relation entre natureza e sociedade nem sempre é equilibrada. Enquanto a sociedade retira recursos para o desenvolvimento, a natureza sofre impactos como desmatamento e poluição. O desafio atual é o Desenvolvimento Sustentável: crescer economicamente sem destruir a base de recursos das futuras gerações. No Tocantins, o agronegócio e a preservação do cerrado são pontos constantes de debate.', 
    ['O que você entende por Desenvolvimento Sustentável?', 'Cite um exemplo de conflito entre desenvolvimento econômico e preservação ambiental no Tocantins.']),
  
  createLesson('g1-geo-b1-l3', 'L3: A Paisagem e suas Camadas de Tempo', 'geografia', 
    'A paisagem é tudo o que nossos sentidos percebem em um lugar. Ela é como um "palimpsesto" (um pergaminho escrito várias vezes): nela convivem elementos de épocas diferentes. Prédios modernos ao lado de casas antigas mostram a história da cidade. Em Palmas, por ser jovem, as camadas de tempo são rápidas, mas já podemos ver a diferença entre as primeiras construções e os novos arranha-céus da Orla.', 
    ['Olhe ao redor da sua escola. Quais elementos da paisagem parecem ser novos e quais parecem ser mais antigos?', 'Por que dizemos que a paisagem revela a história de um lugar?']),
  
  createLesson('g1-geo-b1-l4', 'L4: Território: Poder e Fronteiras', 'geografia', 
    'Território é um espaço definido por relações de poder. Não se trata apenas de limites cartográficos, mas de quem exerce controle sobre aquele lugar. Pode ser o território de um país, de um estado como o Tocantins, ou até territórios simbólicos como o de uma comunidade tradicional ou de um grupo cultural.', 
    ['Diferencie limite geográfico de território baseado na ideia de "poder".', 'Dê um exemplo de um território que não seja um país.']),
  
  createLesson('g1-geo-b1-l5', 'L5: O Lugar e a Afetividade', 'geografia', 
    'Enquanto o espaço é algo amplo, o "lugar" é a porção do espaço onde criamos laços afetivos e identidade. É a nossa casa, a nossa rua, a praça onde encontramos amigos. O lugar é onde a vida acontece de forma subjetiva e familiar.', 
    ['Qual é o seu "lugar" favorito em sua cidade? Por que ele é importante para você?', 'Como a afetividade transforma um espaço comum em um "lugar"?']),
  
  createLesson('g1-geo-b1-l6', 'L6: Meio Técnico-Científico-Informacional', 'geografia', 
    'Conceito criado por Milton Santos, o MTCI descreve o período atual onde a técnica, a ciência e a informação estão unidas na organização do território. Hoje, a produção no campo (como o plantio de soja no TO) depende de satélites, biotecnologia e internet em tempo real. O espaço se torna cada vez mais artificializado e conectado globalmente.', 
    ['Como a internet e a tecnologia mudaram a forma como as pessoas circulam no espaço hoje?', 'Explique a relação entre ciência e agricultura no meio técnico-científico-informacional.']),
  
  createLesson('g1-geo-b1-l7', 'L7: A Formação das Cidades e a Revolução Urbana', 'geografia', 
    'As cidades surgiram quando o homem deixou de ser nômade. Porém, a "Revolução Urbana" de fato aconteceu com a Revolução Industrial, que atraiu massas do campo para as fábricas. A cidade passou a ser o centro das decisões econômicas e políticas do mundo moderno.', 
    ['Qual foi o papel da Revolução Industrial no crescimento das cidades?', 'Quais são as principais funções de uma cidade hoje (ex: administrativa, industrial, turística)?']),
  
  createLesson('g1-geo-b1-l8', 'L8: Urbanização Brasileira e Desigualdades', 'geografia', 
    'A urbanização no Brasil foi tardia, mas extremamente acelerada a partir de 1950. Esse crescimento rápido e sem planejamento gerou profundas desigualdades: falta de moradia, transporte precário e falta de saneamento em áreas periféricas, enquanto os centros recebem a maior parte dos investimentos.', 
    ['Por que a urbanização brasileira é considerada "desigual"?', 'Quais problemas sociais surgem quando uma cidade cresce rápido demais sem planejamento?']),
  
  createLesson('g1-geo-b1-l9', 'L9: O Indivíduo e o Direito à Cidade', 'geografia', 
    'O "Direito à Cidade" vai além de morar nela. Significa ter acesso a serviços públicos de qualidade, lazer, cultura e participar das decisões sobre como a cidade deve crescer. É o direito de todos usufruírem do que a vida urbana oferece, sem exclusões.', 
    ['Em sua opinião, todos os cidadãos de sua cidade conseguem usufruir igualmente dela? Justifique.', 'O que você mudaria em seu bairro para que o "Direito à Cidade" fosse mais respeitado?']),
  
  createLesson('g1-geo-b1-l10', 'L10: Segregação Socioespacial', 'geografia', 
    'A segregação acontece quando diferentes grupos sociais são separados no espaço urbano. De um lado, condomínios de luxo com toda infraestrutura; de outro, bairros periféricos sem asfalto ou esgoto. Essa separação física reflete e aprofunda a desigualdade social.', 
    ['Como a segregação socioespacial pode ser observada em Palmas?', 'O que é um "condomínio fechado" sob a perspectiva da segregação?']),
  
  createLesson('g1-geo-b1-l11', 'L11: Planejamento Urbano e Palmas', 'geografia', 
    'Palmas é a última capital planejada do século XX no Brasil. Seu desenho em "grade" buscou organizar o crescimento e evitar problemas comuns de outras metrópoles. No entanto, o planejamento também enfrentou desafios, como o encarecimento dos terrenos centrais, empurrando a população mais pobre para as franjas da cidade.', 
    ['Quais as vantagens de morar em uma cidade que foi planejada?', 'Apesar do planejamento, quais problemas urbanos você percebe em Palmas atualmente?']),
  
  createLesson('g1-geo-b1-l12', 'L12: Metropolização e Redes Urbanas', 'geografia', 
    'As cidades não estão isoladas; elas formam uma "Rede Urbana" conectada por transporte e comunicação. Existe uma hierarquia: metrópoles globais (SP), capitais regionais (Palmas) e cidades locais. A metropolização é o processo de crescimento das grandes cidades que passam a exercer influência sobre as vizinhas.', 
    ['Explique o que é uma rede urbana.', 'Como Palmas exerce influência sobre as cidades vizinhas no Tocantins?']),
  
  createLesson('g1-geo-b1-l13', 'L13: A Sociedade Industrial e o Capitalismo', 'geografia', 
    'O capitalismo industrial moldou a cara das cidades. A necessidade de produção em larga escala criou grandes zonas industriais e bairros operários. O consumo passou a ser o motor da economia urbana, transformando a cidade em um grande mercado de mercadorias e serviços.', 
    ['Qual a relação entre o sistema capitalista e o modo como as cidades são construídas?', 'Como a indústria mudou o consumo da sociedade?']),
  
  createLesson('g1-geo-b1-l14', 'L14: Industrialização e Impactos no Território', 'geografia', 
    'A indústria traz empregos, mas também impactos negativos: poluição do ar, contaminação de rios pelo descarte de resíduos e desmatamento para a construção de fábricas. O planejamento ambiental é essencial para que a indústria não inviabilize a vida urbana.', 
    ['Quais são os principais impactos ambientais causados pelas indústrias?', 'Como equilibrar a necessidade de industrialização com a preservação do meio ambiente?']),
  
  createLesson('g1-geo-b1-l15', 'L15: Problemas Ambientais Urbanos em Palmas', 'geografia', 
    'Em Palmas, os principais problemas incluem: ilhas de calor (devido ao asfalto e poucos prédios sombreados), queimadas urbanas na época da seca e problemas com a drenagem de águas da chuva, que podem causar erosões em áreas periféricas.', 
    ['O que causa a sensação de calor excessivo em algumas áreas da cidade (ilhas de calor)?', 'Quais ações poderiam diminuir as queimadas urbanas em Palmas durante o período de seca?']),
  
  createLesson('g1-geo-b1-l16', 'L16: Consumo, Resíduos e Sustentabilidade', 'geografia', 
    'Nossa sociedade de consumo gera uma quantidade imensa de lixo (resíduos sólidos). A gestão correta envolve reduzir o consumo, reutilizar produtos e reciclar materiais. A falta de um aterro sanitário adequado ou de coleta seletiva é um grave problema para a sustentabilidade das cidades.', 
    ['Aplique a regra dos 5 Rs (Reduzir, Reutilizar, Reciclar, Recusar, Repensar) em sua rotina.', 'Para onde vai o lixo produzido na sua casa? Você sabe como ele é tratado?']),
  
  createLesson('g1-geo-b1-l17', 'L17: Mobilidade Urbana e Transporte no TO', 'geografia', 
    'A mobilidade urbana é a facilidade de deslocamento das pessoas na cidade. Em Palmas, as grandes distâncias entre as quadras tornam o transporte público essencial, mas também desafiador. A dependência do carro e da moto gera trânsito e poluição, reforçando a necessidade de ciclovias e ônibus eficientes.', 
    ['Como você avalia o transporte público em sua região?', 'Por que as grandes avenidas de Palmas facilitam e, ao mesmo tempo, dificultam a mobilidade de quem anda a pé?']),
  
  createLesson('g1-geo-b1-l18', 'L18: Cidades Inteligentes e o Futuro de Palmas', 'geografia', 
    'Cidades Inteligentes (Smart Cities) usam tecnologia e dados para melhorar a vida das pessoas: semáforos inteligentes, iluminação pública eficiente, Wi-Fi em parques e apps de serviços públicos. Palmas tem potencial para crescer usando essas tecnologias para economizar recursos e melhorar o atendimento ao cidadão.', 
    ['O que, para você, define uma "Cidade Inteligente"?', 'Sugira uma solução tecnológica que poderia melhorar um problema no seu bairro (ex: iluminação, lixo ou segurança).']),
];

export const geoLessonsB2: Lesson[] = [
  createLesson('g1-geo-b2-l1', 'L1: A Geografia das Grandes Guerras Mundiais', 'geografia', 
    'As Guerras Mundiais não foram apenas conflitos militares, mas grandes rearranjos territoriais. A disputa por recursos, mercados e territórios levou as potências europeias ao confronto. O fim da 1ª e 2ª Guerra resultou no surgimento de novos países e no declínio dos impérios coloniais europeus, mudando o mapa-múndi.', 
    ['Como o controle de territórios influenciou o início das Grandes Guerras?', 'Quais mudanças no mapa da Europa podem ser citadas após a 2ª Guerra Mundial?']),

  createLesson('g1-geo-b2-l2', 'L2: A Ordem Bipolar e a Guerra Fria', 'geografia', 
    'A Guerra Fria dividiu o mundo em dois blocos: o Capitalista (liderado pelos EUA) e o Socialista (liderado pela URSS). Essa disputa influenciou a economia, a tecnologia e até a exploração espacial. O mundo vivia sob a ameaça nuclear e o controle ideológico, marcando o que chamamos de Ordem Bipolar.', 
    ['Explique o que significava o termo "Cortina de Ferro".', 'Como a Ordem Bipolar afetou a geografia política dos países do "Terceiro Mundo"?']),

  createLesson('g1-geo-b2-l3', 'L3: Descolonização e Novos Estados', 'geografia', 
    'Após a 2ª Guerra, muitos países da África e Ásia lutaram por sua independência. O enfraquecimento das potências europeias permitiu o surgimento de dezenas de novos Estados. No entanto, as fronteiras traçadas pelos colonizadores muitas vezes ignoraram etnias, gerando conflitos que duram até hoje.', 
    ['O que foi a Conferência de Berlim e como ela afetou a descolonização?', 'Por que muitos novos Estados enfrentam conflitos internos após a independência?']),

  createLesson('g1-geo-b2-l4', 'L4: A Nova Ordem Mundial e Multipolaridade', 'geografia', 
    'Com a queda do Muro de Berlim (1989) e o fim da URSS (1991), o mundo entrou em uma Nova Ordem Mundial. Inicialmente unipolar (EUA), hoje caminhamos para a Multipolaridade, com potências como China, União Europeia e os BRICS (incluindo o Brasil) ganhando força econômica e política.', 
    ['Diferencie Unipolaridade de Multipolaridade no contexto atual.', 'Qual o papel da China na economia global hoje?']),

  createLesson('g1-geo-b2-l5', 'L5: Migrações Internas: O Êxodo Rural', 'geografia', 
    'O êxodo rural é o deslocamento de pessoas do campo para a cidade em busca de melhores condições de vida e trabalho. No Brasil, esse processo foi muito intenso na segunda metade do século XX devido à mecanização da agricultura. No Tocantins, muitas famílias migraram para as cidades recém-criadas, como Palmas.', 
    ['Quais os principais motivos que levam uma pessoa a sair do campo para a cidade?', 'Cite um impacto urbano causado pelo rápido êxodo rural.']),

  createLesson('g1-geo-b2-l6', 'L6: Refugiados: Conflitos e Direitos', 'geografia', 
    'Refugiados são pessoas que fogem de seus países por medo de perseguição, guerra ou violações de direitos humanos. Diferente do migrante econômico, o refugiado não tem escolha. Eles possuem direitos garantidos por tratados internacionais, mas muitas vezes enfrentam barreiras e preconceitos.', 
    ['Qual a diferença entre um migrante e um refugiado?', 'Por que o número de refugiados no mundo tem crescido nas últimas décadas?']),

  createLesson('g1-geo-b2-l7', 'L7: Migração e Xenofobia', 'geografia', 
    'Xenofobia é o medo, aversão ou preconceito contra estrangeiros. Em muitos países desenvolvidos, o aumento do fluxo migratório gerou reações xenofóbicas baseadas na falsa ideia de que os imigrantes "roubam empregos" ou ameaçam a cultura local. É um desafio para a conexão global.', 
    ['O que é xenofobia e quais suas consequências para o imigrante?', 'Como a educação pode ajudar a combater o preconceito contra estrangeiros?']),

  createLesson('g1-geo-b2-l8', 'L8: Imigração no Tocantins', 'geografia', 
    'O Tocantins é um estado de imigrantes. Desde sua criação, recebeu pessoas de todas as regiões do Brasil (especialmente do Maranhão, Bahia e Goiás) e também estrangeiros. Essa mistura de culturas moldou a culinária, as festas e a identidade tocantinense.', 
    ['De quais estados brasileiros vêm a maioria dos imigrantes que vivem no Tocantins?', 'Como a diversidade cultural beneficia o desenvolvimento do nosso estado?']),

  createLesson('g1-geo-b2-l9', 'L9: Impactos Ambientais do Modelo Urbano', 'geografia', 
    'O modelo de vida urbano é altamente consumidor de recursos e gerador de poluição. A concentração de pessoas e atividades industriais sem planejamento gera lixo, polui rios e altera o clima local. Precisamos repensar a forma como construímos e vivemos em nossas cidades.', 
    ['Quais são os principais problemas ambientais gerados pelo crescimento urbano desordenado?', 'Como o consumo excessivo nas cidades afeta o meio ambiente?']),

  createLesson('g1-geo-b2-l10', 'L10: Ilhas de Calor em Palmas', 'geografia', 
    'Palmas sofre com as ilhas de calor: áreas urbanas com temperaturas muito mais altas que o entorno natural. Isso ocorre devido ao asfalto, concreto, poucos prédios com sombreamento planejado e a retirada do cerrado. O calor é um desafio direto para a saúde e o conforto dos palmenses.', 
    ['Por que o centro de Palmas costuma ser mais quente que as áreas rurais ao redor?', 'Cite duas medidas para reduzir o efeito de ilhas de calor em uma cidade.']),

  createLesson('g1-geo-b2-l11', 'L11: Impermeabilização e Enchentes', 'geografia', 
    'Quando cobrimos o solo com asfalto e calçadas (impermeabilização), a água da chuva não consegue infiltrar na terra. Isso sobrecarrega os bueiros e causa alagamentos rápidos. Em Palmas, apesar de planejada, algumas áreas sofrem com o escoamento ineficiente das chuvas fortes.', 
    ['O que acontece com a água da chuva quando o solo está totalmente impermeabilizado?', 'Como jardins e parques podem ajudar a evitar enchentes?']),

  createLesson('g1-geo-b2-l12', 'L12: A Geopolítica da Água', 'geografia', 
    'A água doce é um recurso finito e desigual no mundo. Países que controlam nascentes e rios possuem poder político. Conflitos por acesso à água já ocorrem e podem se intensificar com as mudanças climáticas e o aumento da população global.', 
    ['Por que dizemos que a água pode ser o motivo de guerras no futuro?', 'O Brasil é um país rico em água. Como isso o coloca em uma posição estratégica no mundo?']),

  createLesson('g1-geo-b2-l13', 'L13: Ciclo da Água e Disponibilidade', 'geografia', 
    'O ciclo da água (evaporação, condensação, precipitação) é essencial para a vida. No entanto, a água disponível para consumo humano é uma pequena fração do total. O desmatamento e o aquecimento global alteram os regimes de chuva, reduzindo a água disponível em muitas regiões.', 
    ['Explique como o desmatamento pode diminuir a quantidade de chuvas em uma região.', 'Qual a porcentagem de água doce acessível para consumo humano na Terra?']),

  createLesson('g1-geo-b2-l14', 'L14: Desperdício de Água: Problema Social', 'geografia', 
    'O desperdício de água ocorre tanto no uso doméstico quanto na agricultura e indústria. Muitas vezes, perdemos água tratada em vazamentos nas redes públicas. Economizar água não é apenas uma atitude individual, mas uma necessidade social e política.', 
    ['Em quais atividades do seu dia a dia você percebe o maior desperdício de água?', 'Quais políticas públicas poderiam ajudar a reduzir o desperdício de água tratada?']),

  createLesson('g1-geo-b2-l15', 'L15: Contaminação de Rios no TO', 'geografia', 
    'Os rios do Tocantins enfrentam ameaças como o uso excessivo de agrotóxicos em plantações próximas e o descarte de esgoto doméstico e industrial sem tratamento. A contaminação afeta a vida aquática e a saúde das populações que dependem desses rios para beber ou pescar.', 
    ['Quais as principais causas da poluição dos rios em nosso estado?', 'Quais as consequências da contaminação das águas para a população ribeirinha?']),

  createLesson('g1-geo-b2-l16', 'L16: O Rio Tocantins e Lajeado', 'geografia', 
    'A usina hidrelétrica de Lajeado (UHE Luís Eduardo Magalhães) transformou o Rio Tocantins em um grande lago em frente a Palmas. Isso gerou energia e turismo, mas também mudou o ecossistema original, inundando áreas e alterando a vida dos pescadores e da fauna local.', 
    ['Quais os benefícios trazidos pela construção da Usina de Lajeado?', 'Quais foram os impactos ambientais causados pela criação do lago de Palmas?']),

  createLesson('g1-geo-b2-l17', 'L17: Consumo Consciente e Reuso', 'geografia', 
    'Consumo consciente de água significa usá-la de forma eficiente. O reuso de água (como a água da máquina de lavar para limpar a calçada) e a captação de água da chuva são práticas que ajudam a preservar esse recurso precioso.', 
    ['Dê dois exemplos de como você pode reutilizar água em sua casa.', 'Por que o consumo consciente é importante mesmo em regiões ricas em água?']),

  createLesson('g1-geo-b2-l18', 'L18: Prática: Relatório Fiscal da Água', 'geografia', 
    'Nesta atividade prática, o aluno deverá observar o uso da água em sua casa ou escola durante uma semana. O objetivo é identificar pontos de desperdício, vazamentos e propor melhorias para um uso mais sustentável.', 
    ['Durante sua observação, qual foi o maior ponto de desperdício de água que você encontrou?', 'Proponha uma mudança simples na rotina da sua família que economizaria água mensalmente.']),
];

export const geoLessonsB3: Lesson[] = [
  createLesson('g1-geo-b3-l1', 'L1: IBGE: Conhecendo a População Brasileira', 'geografia', 
    'O IBGE (Instituto Brasileiro de Geografia e Estatística) é o órgão responsável por realizar o Censo Demográfico a cada 10 anos. Através dele, sabemos quantos somos, onde moramos e como vivemos. Esses dados são fundamentais para que o governo planeje escolas, hospitais e infraestrutura. No Tocantins, o Censo 2022 revelou um crescimento populacional acima da média nacional.', 
    ['Qual a importância do Censo Demográfico para o planejamento de uma cidade?', 'Cite dois dados que o IBGE coleta sobre a população brasileira.']),

  createLesson('g1-geo-b3-l2', 'L2: PNAD: O Retrato das Mudanças', 'geografia', 
    'Diferente do Censo, a PNAD (Pesquisa Nacional por Amostra de Domicílios) é realizada com mais frequência e foca em temas como educação, trabalho e rendimento. Ela nos dá um "retrato" rápido de como a economia está afetando a vida das famílias, mostrando, por exemplo, o aumento ou a queda do desemprego ano a ano.', 
    ['Qual a principal diferença entre o Censo e a PNAD?', 'Como a PNAD ajuda a entender a situação do mercado de trabalho?']),

  createLesson('g1-geo-b3-l3', 'L3: IDH: Qualidade de Vida', 'geografia', 
    'O Índice de Desenvolvimento Humano (IDH) mede o bem-estar de uma população através de três pilares: Saúde (longevidade), Educação e Renda. O índice vai de 0 a 1. Palmas possui um dos maiores IDHs da região Norte, mas ainda existem grandes variações entre as quadras centrais e os bairros periféricos.', 
    ['Quais são os três indicadores que compõem o IDH?', 'Por que apenas o crescimento econômico (PIB) não é suficiente para medir a qualidade de vida?']),

  createLesson('g1-geo-b3-l4', 'L4: Desigualdade Global: Norte vs Sul', 'geografia', 
    'O mundo é dividido socioeconomicamente entre o "Norte Global" (países desenvolvidos e ricos) e o "Sul Global" (países em desenvolvimento ou subdesenvolvidos). Essa divisão não é apenas geográfica, mas histórica e econômica, refletindo quem detém a tecnologia e a maior parte da riqueza mundial.', 
    ['Explique o concept de "Norte" e "Sul" Global.', 'Por que alguns países localizados geograficamente no hemisfério sul podem ser considerados do Norte Global?']),

  createLesson('g1-geo-b3-l5', 'L5: Concentração de Renda no Brasil', 'geografia', 
    'O Brasil é um dos países mais desiguais do mundo. Isso significa que uma pequena parcela da população detém a maior parte da riqueza, enquanto a maioria vive com rendas baixas. O Índice de Gini é a ferramenta que usamos para medir essa concentração: quanto mais próximo de 1, mais desigual é o país.', 
    ['O que o Índice de Gini mede?', 'Quais são as consequências sociais de uma alta concentração de renda em um país?']),

  createLesson('g1-geo-b3-l6', 'L6: Geografia da Fome', 'geografia', 
    'A fome não é causada pela falta de produção de alimentos (o Brasil é um dos maiores produtores do mundo), mas pela falta de acesso à renda para comprá-los. Josué de Castro, geógrafo brasileiro, já alertava que a fome é um problema político e geográfico relacionado à má distribuição de terras e riquezas.', 
    ['Por que existe fome no Brasil se o país produz tanto alimento?', 'Como a pobreza se relaciona com a insegurança alimentar?']),

  createLesson('g1-geo-b3-l7', 'L7: Trabalho e Tecnologia: Automação', 'geografia', 
    'A tecnologia está transformando o trabalho. A automação (uso de máquinas e IA para substituir tarefas humanas) aumenta a produtividade, mas também extingue profissões tradicionais. O desafio é a requalificação dos trabalhadores para lidar com as novas ferramentas digitais.', 
    ['Como a automação está mudando as profissões que conhecemos?', 'Cite um exemplo de tarefa que era feita por humanos e hoje é feita por máquinas.']),

  createLesson('g1-geo-b3-l8', 'L8: Desemprego Estrutural vs Conjuntural', 'geografia', 
    'O desemprego conjuntural ocorre devido a crises econômicas passageiras. Já o desemprego estrutural é mais grave: ocorre quando as vagas de trabalho desaparecem para sempre devido à tecnologia ou mudanças na economia, exigindo que o trabalhador aprenda uma nova função.', 
    ['Diferencie desemprego estrutural de desemprego conjuntural.', 'Por que o desemprego estrutural é mais difícil de ser resolvido pelo governo?']),

  createLesson('g1-geo-b3-l9', 'L9: Mercado de Trabalho no Tocantins', 'geografia', 
    'O mercado de trabalho no Tocantins é movido principalmente pelo setor de serviços, administração pública e pelo agronegócio. Palmas, por ser a capital administrativa, concentra muitas vagas no serviço público e comércio, enquanto o interior do estado foca na produção agrícola.', 
    ['Quais são os principais setores da economia que geram empregos no Tocantins?', 'Como a criação de Palmas influenciou o mercado de trabalho regional?']),

  createLesson('g1-geo-b3-l10', 'L10: Informalidade e o "Corre"', 'geografia', 
    'O trabalho informal é aquele sem carteira assinada ou garantias trabalhistas (como o entregador de aplicativo ou o vendedor de rua). No Brasil, milhões vivem do "corre" diário. Embora traga flexibilidade, a informalidade gera insegurança, pois o trabalhador não tem direito a férias, 13º ou auxílio-doença.', 
    ['O que caracteriza um trabalho como informal?', 'Quais os riscos que o trabalhador enfrenta ao não ter proteção trabalhista?']),

  createLesson('g1-geo-b3-l11', 'L11: Ética Ambiental: Values', 'geografia', 
    'A ética ambiental discute como os seres humanos devem se relacionar com a natureza. Existem visões diferentes: a antropocêntrica (a natureza existe para servir ao homem) e a ecocêntrica (a natureza tem valor por si mesma e todos os seres são importantes). Qual dessas visões guiará nosso futuro?', 
    ['Qual a diferença entre a visão antropocêntrica e a ecocêntrica?', 'Por que precisamos de uma ética ambiental para enfrentar as mudanças climáticas?']),

  createLesson('g1-geo-b3-l12', 'L12: ESG e Responsabilidade Corporativa', 'geografia', 
    'ESG (Ambiental, Social e Governança) é uma sigla usada por empresas que buscam lucrar de forma responsável. Isso significa reduzir a poluição, tratar bem os funcionários e ser transparente nas decisões. Empresas que não seguem o ESG estão perdendo valor no mercado global atual.', 
    ['O que significa a sigla ESG?', 'Por que os investidores hoje preferem empresas que se preocupam com o meio ambiente?']),

  createLesson('g1-geo-b3-l13', 'L13: Indústria e Cerrado no TO', 'geografia', 
    'A indústria no Tocantins está ligada ao processamento do que vem do campo (frigoríficos, usinas de biodiesel, fábricas de ração). Isso gera riqueza, mas coloca pressão sobre o Cerrado. O desafio é industrializar o estado protegendo as nascentes e a biodiversidade desse bioma.', 
    ['Como a indústria e o agronegócio estão conectados no Tocantins?', 'Qual o principal desafio ambiental da industrialização em nosso estado?']),

  createLesson('g1-geo-b3-l14', 'L14: Marketing Verde ou Realidade?', 'geografia', 
    'Muitas empresas praticam o "Greenwashing" (maquiagem verde): dizem que são sustentáveis apenas para vender mais, mas continuam poluindo ou explorando trabalhadores. Precisamos ser consumidores críticos e verificar se as selos ambientais e promessas são verdadeiros.', 
    ['O que é Greenwashing?', 'Como podemos identificar se uma empresa é realmente sustentável ou se é apenas marketing?']),

  createLesson('g1-geo-b3-l15', 'L15: Pegada Ecológica Individual', 'geografia', 
    'A Pegada Ecológica mede quantos hectares de terra e mar seriam necessários para sustentar o estilo de vida de uma pessoa. Ela considera o que comemos, como viajamos e quanto lixo geramos. Se todos vivessem como um cidadão médio de um país rico, precisaríamos de vários planetas Terra.', 
    ['O que a Pegada Ecológica tenta medir?', 'Quais mudanças no seu consumo poderiam diminuir sua pegada ecológica?']),

  createLesson('g1-geo-b3-l16', 'L16: Consumo Consciente', 'geografia', 
    'Consumir consciente é pensar antes de comprar: Eu realmente preciso disso? De onde veio esse produto? Quem o fabricou? Ao escolher produtos duráveis e de empresas responsáveis, o consumidor usa o seu dinheiro como uma ferramenta de mudança social e ambiental.', 
    ['Quais perguntas devemos fazer antes de realizar uma compra?', 'Como o consumo consciente pode ajudar a reduzir a produção de lixo no mundo?']),

  createLesson('g1-geo-b3-l17', 'L17: Profissões Verdes no TO', 'geografia', 
    'O futuro do trabalho no Tocantins passa pelas "Profissões Verdes": técnicos em energia solar, gestores ambientais, engenheiros de bioenergia e agricultores orgânicos. O estado tem um sol forte e muita água, o que favorece carreiras voltadas para a sustentabilidade.', 
    ['Dê exemplos de profissões verdes que podem crescer no Tocantins.', 'Por que o Tocantins tem potencial para ser um líder em energias renováveis?']),

  createLesson('g1-geo-b3-l18', 'L18: Prática: Relatório Raio-X da Renda', 'geografia', 
    'Nesta prática, os alunos farão uma pesquisa simples sobre a estrutura de gastos de uma família fictícia ou real (sem revelar nomes). O objetivo é entender como o preço dos alimentos, transporte e moradia impacta diferentes faixas de renda, visualizando a desigualdade na prática.', 
    ['Ao analisar os gastos, qual item consome a maior parte da renda de uma família de baixa renda?', 'Como a inflação dos alimentos afeta mais os pobres do que os ricos?']),
];

export const geoLessonsB4: Lesson[] = [
  createLesson('g1-geo-b4-l1', 'L1: Território: Mais que Fronteiras', 'geografia', 
    'O território não é apenas um pedaço de terra com limites desenhados no mapa. Ele é um espaço de pertencimento, de vivência e de exercício de poder. Para povos tradicionais, o território é a base da sua cultura e existência. Perder o território significa perder a identidade.', 
    ['O que diferencia a visão de território de um país da visão de território de uma comunidade tradicional?', 'Por que o território é fundamental para a manutenção da cultura de um povo?']),

  createLesson('g1-geo-b4-l2', 'L2: Povos do TO: Krahô e Xerente', 'geografia', 
    'Os Krahô (região de Itacajá/Goiatins) e os Xerente (região de Tocantínia) são alguns dos principais povos originários do Tocantins. Eles mantêm tradições milenares, como a corrida de tora, e lutam constantemente para preservar seu modo de vida diante da expansão urbana e agrícola ao redor de suas terras.', 
    ['Cite uma característica cultural marcante dos povos Krahô ou Xerente.', 'Como a localização dessas terras indígenas afeta a relação desses povos com as cidades vizinhas?']),

  createLesson('g1-geo-b4-l3', 'L3: Karajá e Povos do Rio', 'geografia', 
    'Os Karajá (Iny) vivem historicamente às margens do Rio Araguaia, especialmente na Ilha do Bananal. Sua vida está profundamente ligada aos ciclos do rio (cheia e seca), à pesca e à cerâmica (as bonecas Ritxòkò). O rio não é apenas água, é o provedor de vida e espiritualidade.', 
    ['Qual a importância do Rio Araguaia para a sobrevivência e cultura do povo Karajá?', 'O que são as bonecas Ritxòkò e o que elas representam?']),

  createLesson('g1-geo-b4-l4', 'L4: Demarcação de TI', 'geografia', 
    'A demarcação de Terras Indígenas (TI) é o processo legal que garante aos indígenas o direito à terra que ocupam tradicionalmente. É um processo complexo que envolve estudos antropológicos e decisões políticas. Sem a demarcação, as terras ficam vulneráveis a invasões e conflitos.', 
    ['Explique os passos principais do processo de demarcação de uma terra indígena.', 'Por que a demarcação é importante para evitar conflitos agrários?']),

  createLesson('g1-geo-b4-l5', 'L5: Território e Espiritualidade', 'geografia', 
    'Para os povos indígenas e quilombolas, a terra é sagrada. Existem locais específicos para rituais, cemitérios ancestrais e áreas de cura. A proteção do território é, portanto, a proteção da alma do povo. Se a mata é derrubada, os espíritos protetores perdem sua casa.', 
    ['Como a religiosidade desses povos influencia sua luta pela preservação ambiental?', 'O que acontece com a espiritualidade de um povo quando seu território sagrado é destruído?']),

  createLesson('g1-geo-b4-l6', 'L6: Impactos da Soja nas TI', 'geografia', 
    'O avanço das grandes plantações de soja no Tocantins muitas vezes chega às fronteiras das terras indígenas. O uso de agrotóxicos em áreas vizinhas pode contaminar as águas e a caça dentro das terras indígenas, além de causar pressão para a redução desses territórios protegidos.', 
    ['Quais são os principais impactos que o agronegócio pode causar em uma terra indígena vizinha?', 'Como a contaminação química afeta a soberania alimentar dos povos tradicionais?']),

  createLesson('g1-geo-b4-l7', 'L7: Protagonismo Indígena', 'geografia', 
    'Os povos indígenas não são apenas vítimas; eles são protagonistas de sua história. No Tocantins, existem diversas organizações indígenas que lutam por educação bilíngue, saúde especializada e proteção territorial, ocupando espaços na política e nas universidades.', 
    ['O que significa ter "protagonismo" na luta por direitos?', 'Como a educação nas aldeias pode fortalecer a resistência cultural?']),

  createLesson('g1-geo-b4-l8', 'L8: Povos vs. Hidrelétricas no TO', 'geografia', 
    'A construção de usinas hidrelétricas no Rio Tocantins e em seus afluentes causou o deslocamento de comunidades e a inundação de terras produtivas. Povos ribeirinhos e indígenas lutam para que seus direitos sejam respeitados e para que recebam compensações justas pelos danos sofridos.', 
    ['Como uma usina hidrelétrica pode mudar o modo de vida de um povo ribeirinho?', 'Cite um exemplo de conflito entre geração de energia e preservação de comunidades tradicionais.']),

  createLesson('g1-geo-b4-l9', 'L9: Quilombolas do TO', 'geografia', 
    'Quilombolas são descendentes de africanos escravizados que formaram comunidades de resistência (Quilombos). No Tocantins, existem dezenas de comunidades certificadas que mantêm vivas tradições como o batuque e o uso comum da terra para a agricultura de subsistência.', 
    ['O que define uma comunidade como "quilombola"?', 'Qual a importância do reconhecimento oficial das comunidades quilombolas pelo governo?']),

  createLesson('g1-geo-b4-l10', 'L10: Jalapão e Quilombos', 'geografia', 
    'O Jalapão abriga comunidades quilombolas famosas, como Mumbuca e Prata. Mumbuca é conhecida mundialmente pelo artesanato em Capim Dourado. O turismo na região deve respeitar essas comunidades, garantindo que elas sejam as principais beneficiadas pelo desenvolvimento local.', 
    ['Como o artesanato de Capim Dourado mudou a economia da comunidade de Mumbuca?', 'Quais os riscos do turismo descontrolado para as comunidades tradicionais do Jalapão?']),

  createLesson('g1-geo-b4-l11', 'L11: Titulação Quilombola', 'geografia', 
    'A titulação de terras quilombolas é o direito de propriedade coletiva garantido pela Constituição. É um processo lento e difícil, que enfrenta resistência de grandes proprietários de terras. Sem o título da terra, a comunidade vive sob constante risco de expulsão.', 
    ['Por que o título de terra para quilombolas é coletivo e não individual?', 'Quais as principais dificuldades enfrentadas pelas comunidades para conseguir a titulação de suas terras?']),

  createLesson('g1-geo-b4-l12', 'L12: Conflitos Agrários no TO', 'geografia', 
    'O Tocantins tem um histórico de conflitos agrários, especialmente na região do Bico do Papagaio. A disputa por terras entre grandes fazendeiros e posseiros (agricultores familiares) gerou violência e mortes de líderes camponeses. A luta pela terra é uma marca da história do estado.', 
    ['O que causou os conflitos no Bico do Papagaio?', 'Qual o papel dos movimentos sociais na luta pela terra no Tocantins?']),

  createLesson('g1-geo-b4-l13', 'L13: MATOPIBA: Expansão', 'geografia', 
    'MATOPIBA é a sigla para a região que abrange Maranhão, Tocantins, Piauí e Bahia. É considerada a grande fronteira agrícola atual do Brasil. A expansão da soja, milho e algodão nessa região gera riqueza, mas também causa grande desmatamento do Cerrado e pressão sobre pequenos agricultores.', 
    ['O que significa a sigla MATOPIBA?', 'Como a expansão dessa fronteira agrícola afeta a biodiversidade do Cerrado?']),

  createLesson('g1-geo-b4-l14', 'L14: Grilagem e Insegurança', 'geografia', 
    'A grilagem de terras é o ato criminoso de falsificar documentos para tomar posse de terras públicas ou de terceiros. Isso gera insegurança jurídica e violência no campo. No Tocantins, a grilagem é um dos principais combustíveis para os conflitos agrários.', 
    ['Explique o termo "grilagem" e como essa prática ocorre.', 'Como a grilagem de terras prejudica o desenvolvimento sustentável do estado?']),

  createLesson('g1-geo-b4-l15', 'L15: Reforma Agrária', 'geografia', 
    'A Reforma Agrária é a redistribuição de grandes terras improdutivas para famílias de trabalhadores rurais sem terra. O objetivo é fixar o homem no campo, gerar produção de alimentos para o mercado interno e diminuir a desigualdade social no meio rural.', 
    ['Qual o principal objetivo da Reforma Agrária no Brasil?', 'Dê um exemplo de como um assentamento de reforma agrária pode beneficiar a economia local.']),

  createLesson('g1-geo-b4-l16', 'L16: Unidades de Conservação', 'geografia', 
    'Unidades de Conservação (UCs) são áreas protegidas por lei, como Parques Estaduais (ex: Cantão e Jalapão) ou Reservas Particulares. Elas são essenciais para preservar a fauna e a flora do Cerrado, protegendo nascentes e garantindo o equilíbrio ecológico regional.', 
    ['Diferencie uma Unidade de Proteção Integral de uma Unidade de Uso Sustentável.', 'Por que o Tocantins precisa de mais Unidades de Conservação?']),

  createLesson('g1-geo-b4-l17', 'L17: Prática: Mapa de Conflitos', 'geografia', 
    'Nesta atividade, os alunos pesquisarão notícias recentes sobre conflitos por terra, água ou preservação ambiental no Tocantins. Eles deverão identificar os grupos envolvidos (ex: fazendeiros, indígenas, governo) e as causas principais do problema.', 
    ['Escolha um conflito socioambiental no Tocantins e descreva quem são os envolvidos.', 'Quais as possíveis soluções pacíficas para esse conflito?']),

  createLesson('g1-geo-b4-l18', 'L18: Prática: Relatório Final', 'geografia', 
    'Para encerrar o ano letivo, o aluno fará uma síntese de como o território tocantinense é diverso e complexo. O relatório deve destacar a importância de respeitar as diferentes identidades (indígenas, quilombolas, urbanos) para a construção de um estado mais justo.', 
    ['Qual foi o tema que mais te chamou a atenção durante as aulas de Geografia deste ano? Por quê?', 'Como você vê o futuro do Tocantins em relação à preservação do Cerrado e ao respeito aos povos tradicionais?']),
];
