// src/data/historyData.js

export const BASEBALL_HISTORY = {
    title: "Historia del Béisbol",
    subtitle: "De los campos de arena al pasatiempo de América",
    coverImage: "https://www.kieferusa.com/wp-content/uploads/2019/07/baseball-facts.jpg",
    sections: [
        {
            heading: "Los Orígenes y el Mito",
            text: "Aunque el mito popular cuenta que Abner Doubleday inventó el béisbol en Cooperstown en 1839, los historiadores coinciden en que el deporte evolucionó a partir de juegos de bate y pelota más antiguos, como el 'rounders' británico y el 'town ball'. Fue Alexander Cartwright y los Knickerbockers de Nueva York quienes en 1845 formalizaron las primeras reglas modernas, estableciendo el diamante, las tres bases y el concepto de los outs.",
        },
        {
            heading: "La Profesionalización",
            text: "En 1869, los Cincinnati Red Stockings se convirtieron en el primer equipo completamente profesional, viajando por todo el país sin perder un solo juego ese año. Esto impulsó la creación de la Liga Nacional (NL) en 1876. Años más tarde, en 1901, Ban Johnson fundó la Liga Americana (AL) como una liga mayor rival, lo que culminó en la creación de la primera Serie Mundial en 1903 entre los campeones de ambas ligas.",
            image: "https://baseballhall.org/sites/default/files/styles/fullscreen_image_popup/public/Teams%20Cincinnati%20%20Red%20Stockings%201869%207069-92%20PD_0.jpg.jpeg?itok=qVGCibE2"
        },
        {
            heading: "La Era de la Bola Viva y la Integración",
            text: "La década de 1920 cambió el juego para siempre con la llegada de Babe Ruth, quien popularizó el jonrón y terminó con la 'Era de la Bola Muerta'. Sin embargo, el momento más transformador llegó el 15 de abril de 1947, cuando Jackie Robinson rompió la barrera del color al debutar con los Brooklyn Dodgers, allanando el camino para generaciones de talento diverso y cambiando la historia de los derechos civiles en el deporte.",
        }
        ,
        {
            heading: "La expansión de las Grandes Ligas",
            text: "Después de la Segunda Guerra Mundial, la MLB creció más allá de sus mercados tradicionales. La expansión llevó equipos a California, Texas, Canadá y Florida, mientras que varias franquicias cambiaron de ciudad: los Dodgers y los Giants se trasladaron de Nueva York a California en 1958, y los Washington Senators dieron paso a los Minnesota Twins. La creación de nuevas divisiones y la llegada del juego interligas transformaron el calendario y las rivalidades.",
            image: "https://cdn.milenio.com/uploads/media/2019/04/10/ted-williams-jugador-medias-rojas_0_52_1200_746.jpg"
        },
        {
            heading: "La era de los agentes libres",
            text: "En 1975, la decisión del caso de arbitraje de Andy Messersmith y Dave McNally debilitó la cláusula de reserva que ataba a los jugadores a un club. La agencia libre cambió la relación entre peloteros y propietarios, elevó los salarios y permitió que las estrellas eligieran su destino. También impulsó la construcción de plantillas más competitivas y convirtió la temporada baja en una parte central de la estrategia deportiva.",
        },
        {
            heading: "Tecnología, datos y nuevas voces",
            text: "El béisbol contemporáneo combina tradición y tecnología: Statcast mide la velocidad de salida, el ángulo de lanzamiento y la capacidad de recorrer el campo; la sabermetría convirtió cada turno en una oportunidad para tomar mejores decisiones. A la vez, la MLB ha ampliado sus programas de desarrollo internacional y el reconocimiento de figuras latinas, asiáticas y afroamericanas que siguen haciendo del deporte un lenguaje global.",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjLqNlGCEdz7MyvbfXHm3koqTp1YNJ3-MMp0FXBZ_CIRlzH2Utamlsq2-eQvueB_zNBAdHDcis3kc89x2-3RrfI3TMFHXikiM7k5HtvjKLv4Fx_SVHWGgOUAD2kXZnmjFNtla6qPE61ZVcx/s1600/TECNOLOGY.jpg"
        },
        {
            heading: "La MLB hoy",
            text: "La temporada moderna conserva sus símbolos —el diamante, la pizarra y la Serie Mundial— mientras incorpora reglas diseñadas para agilizar el ritmo, como el reloj de pitcheo, las bases más grandes y las restricciones a los shifts defensivos. Con 30 clubes repartidos en dos ligas y seis divisiones, la MLB representa más de un siglo de evolución deportiva y una memoria compartida por generaciones de aficionados.",
        }
    ]
};

export const AL_TEAMS_HISTORY = [
    // --- AL ESTE ---
    {
        id: 147,
        name: "New York Yankees",
        founded: 1901,
        worldSeries: 27,
        stadium: "Yankee Stadium",
        legends: ["Babe Ruth", "Lou Gehrig", "Mickey Mantle", "Derek Jeter"],
        coverImage: "https://library.sportingnews.com/styles/crop_style_16_9_desktop_webp/s3/2024-10/GettyImages-92777967.jpg.webp?itok=a1Cb1ogE",
        history: [
            {
                heading: "Los Inicios: De Baltimore a Nueva York",
                text: "La franquicia más exitosa en la historia del deporte profesional norteamericano no comenzó en Nueva York. Originalmente fueron los Baltimore Orioles en 1901 (sin relación con el equipo actual), antes de mudarse a Nueva York en 1903, donde fueron conocidos como los Highlanders debido a que jugaban en uno de los puntos más altos de Manhattan. En 1913, adoptaron oficialmente el nombre de 'Yankees' tras mudarse al Polo Grounds."
            },
            {
                heading: "La Compra de Babe Ruth y el Imperio",
                text: "El destino de la franquicia cambió para siempre en 1920, cuando compraron el contrato de Babe Ruth a los Boston Red Sox. Ruth revolucionó el juego con su poder sin precedentes y ayudó a los Yankees a ganar su primera Serie Mundial en 1923, el mismo año en que inauguraron el original Yankee Stadium, apodado 'La Casa que Ruth Construyó'. En 1927, el equipo formó el famoso 'Murderers Row' (El Callejón de la Muerte), considerado uno de los mejores equipos de todos los tiempos, liderado por Ruth y Lou Gehrig."
            },
            {
                heading: "Las Múltiples Dinastías",
                text: "A lo largo de las décadas, los Yankees han construido dinastías inigualables. En los años 50 dominaron con Mickey Mantle y Yogi Berra. En los años 70, Reggie Jackson se ganó el apodo de 'Mr. October'. A finales de los 90, bajo el mando de Joe Torre, surgió el legendario 'Core Four' (Derek Jeter, Mariano Rivera, Andy Pettitte y Jorge Posada), quienes lideraron al equipo a ganar cuatro Series Mundiales en cinco años entre 1996 y 2000. Con 27 campeonatos, son el estándar de excelencia mundial."
            }
        ]
    },
    {
        id: 111,
        name: "Boston Red Sox",
        founded: 1901,
        worldSeries: 9,
        stadium: "Fenway Park",
        legends: ["Ted Williams", "Carl Yastrzemski", "David Ortiz", "Pedro Martínez"],
        coverImage: "https://www.audacy.com/media-library/boston-red-sox-v-new-york-mets.jpg?id=67145596&width=2000&height=1500&coordinates=56%2C0%2C57%2C0",
        history: [
            {
                heading: "Nacimiento y Primeros Éxitos",
                text: "Los Red Sox fueron una de las ocho franquicias fundadoras de la Liga Americana en 1901. Originalmente conocidos como los Americans, adoptaron el nombre de Red Sox en 1908. Fueron la fuerza dominante en los primeros años del béisbol, ganando la primera Serie Mundial moderna en 1903 y acumulando cinco campeonatos para 1918, impulsados en gran parte por un joven lanzador y bateador estelar llamado Babe Ruth. En 1912 inauguraron Fenway Park, hoy el estadio más antiguo de las Grandes Ligas."
            },
            {
                heading: "La Maldición del Bambino",
                text: "En 1920, el dueño del equipo, Harry Frazee, vendió a Babe Ruth a los Yankees para financiar una obra de teatro. Esto dio inicio a una sequía de campeonatos de 86 años que se conoció como 'La Maldición del Bambino'. Durante este tiempo, los Red Sox tuvieron equipos legendarios con jugadores como Ted Williams (el último en batear sobre .400 en una temporada) y Carl Yastrzemski, pero sufrieron derrotas desgarradoras y casi místicas en las Series Mundiales de 1946, 1967, 1975 y 1986."
            },
            {
                heading: "La Redención de 2004",
                text: "La historia cambió dramáticamente en octubre de 2004. Abajo 3-0 en la Serie de Campeonato contra sus archirrivales, los Yankees, los Red Sox lograron la remontada más grande en la historia del deporte para avanzar y barrer a los Cardinals, rompiendo la maldición de una vez por todas. Liderados por figuras como 'Big Papi' David Ortiz, el equipo se transformó en una potencia del siglo XXI, ganando más títulos en 2007, 2013 y 2018."
            }
        ]
    },
    {
        id: 141,
        name: "Toronto Blue Jays",
        founded: 1977,
        worldSeries: 2,
        stadium: "Rogers Centre",
        legends: ["Roberto Alomar", "Joe Carter", "Roy Halladay", "José Bautista"],
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Bh52JmJv-GaP8RQUVdlYpho5oC-JxxAZy7lmxeJCqt29JheqM9u73oo&s=10",
        history: [
            {
                heading: "Expansión al Norte",
                text: "Los Blue Jays nacieron en 1977 como parte de la expansión de la Liga Americana hacia Canadá, uniéndose a los Montreal Expos (NL) como los únicos equipos fuera de Estados Unidos. Sus primeros años en el Exhibition Stadium estuvieron marcados por las típicas dificultades de un equipo de expansión, incluyendo juegos bajo la nieve. Sin embargo, en la década de 1980, el equipo comenzó a construir un núcleo competitivo que culminó con su mudanza al SkyDome (hoy Rogers Centre) en 1989, el primer estadio con techo retráctil motorizado."
            },
            {
                heading: "La Gloria Consecutiva (92-93)",
                text: "A principios de los 90, Toronto era el epicentro del béisbol. Con estrellas como Roberto Alomar, Rickey Henderson y Paul Molitor, los Blue Jays ganaron la Serie Mundial de 1992 contra los Atlanta Braves, convirtiéndose en el primer (y hasta ahora único) equipo no estadounidense en lograrlo. Al año siguiente, repitieron el campeonato de una manera legendaria: Joe Carter conectó un jonrón de tres carreras en la parte baja de la novena entrada del Juego 6, uno de los únicos dos 'walk-off home runs' que han decidido una Serie Mundial en la historia."
            },
            {
                heading: "Era Moderna y el Bat Flip",
                text: "Tras más de dos décadas de sequía de playoffs, los Blue Jays volvieron a la relevancia en 2015 impulsados por una ofensiva demoledora. Ese año es recordado por el icónico 'Bat Flip' de José Bautista en la Serie Divisional contra Texas, una de las imágenes más virales del béisbol moderno. Hoy en día, el equipo confía en una nueva generación de talento joven, liderada por Vladimir Guerrero Jr. y Bo Bichette, para devolver la gloria al béisbol canadiense."
            }
        ]
    },
    {
        id: 110,
        name: "Baltimore Orioles",
        founded: 1901,
        worldSeries: 3,
        stadium: "Oriole Park at Camden Yards",
        legends: ["Cal Ripken Jr.", "Brooks Robinson", "Jim Palmer", "Frank Robinson"],
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLcjB5flEcqezdNwndl_oHX2L5ZqV8fbtEnEPPG--W_pSj58cxYTUogs&s=10",
        history: [
            {
                heading: "Raíces en St. Louis",
                text: "La franquicia que hoy conocemos como los Orioles comenzó en 1901 como los St. Louis Browns. Durante más de medio siglo en Missouri, los Browns fueron conocidos principalmente por su ineficacia, logrando llegar a la Serie Mundial solo una vez en 1944. En 1954, debido a problemas financieros y la abrumadora popularidad de los Cardinals en la misma ciudad, el equipo fue vendido y reubicado en Baltimore, adoptando el nombre de 'Orioles' en honor al ave estatal de Maryland."
            },
            {
                heading: "El Estilo Orioles y las Épocas Doradas",
                text: "Desde mediados de los 60 hasta principios de los 80, los Orioles fueron la franquicia mejor gestionada del béisbol bajo la dirección del legendario manager Earl Weaver. Con una filosofía basada en pitcheo profundo, excelente defensa y jonrones de tres carreras, el equipo ganó tres Series Mundiales (1966, 1970 y 1983). Jugadores como Frank Robinson, Jim Palmer y el 'Aspiradora Humana' Brooks Robinson en la tercera base, definieron una era de dominio absoluto."
            },
            {
                heading: "El Hombre de Hierro y Camden Yards",
                text: "En la década de 1990, los Orioles revolucionaron el béisbol de dos maneras. Primero, inauguraron el Oriole Park at Camden Yards en 1992, iniciando la tendencia de estadios retro-clásicos que salvó al béisbol de los enormes y fríos estadios circulares. Segundo, el 6 de septiembre de 1995, Cal Ripken Jr. rompió el récord considerado inalcanzable de Lou Gehrig de 2,130 juegos consecutivos, revitalizando el interés nacional en el béisbol tras la huelga de 1994."
            }
        ]
    },
    {
        id: 139,
        name: "Tampa Bay Rays",
        founded: 1998,
        worldSeries: 0,
        stadium: "Tropicana Field",
        legends: ["Evan Longoria", "David Price", "Carl Crawford", "Kevin Kiermaier"],
        coverImage: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3319x2213+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F1f%2Fff%2F93f8110d4be9874c45bf573c63ad%2Fap26293134688107.jpg",
        history: [
            {
                heading: "Los Devil Rays y los Primeros Años",
                text: "La franquicia debutó en 1998 como los Tampa Bay Devil Rays. Durante su primera década de existencia, el equipo fue perennemente el peor de las Grandes Ligas, terminando en el último lugar de la División Este de la Liga Americana en nueve de sus primeras diez temporadas. Jugaban en el Tropicana Field, un estadio techado que a menudo era criticado por su apariencia, y luchaban por atraer fanáticos mientras los Yankees y Red Sox dominaban la división."
            },
            {
                heading: "El Milagro de 2008",
                text: "En 2008, la franquicia eliminó la palabra 'Devil' de su nombre, cambiando sus colores al azul marino y celeste, y adoptando una nueva identidad centrada en un 'rayo de sol' (Ray). Ese mismo año, sorprendieron al mundo del deporte. Pasaron de ser el peor equipo en 2007 a ganar la división y llegar a la Serie Mundial de 2008, donde cayeron ante los Phillies. Este giro radical, liderado por jóvenes como Evan Longoria, es considerado uno de los mayores vuelcos en la historia del deporte."
            },
            {
                heading: "La Revolución Analítica",
                text: "Hoy en día, los Rays son reconocidos mundialmente como la franquicia más inteligente y analítica del béisbol. Operando consistentemente con una de las nóminas más bajas de la liga, utilizan análisis de datos avanzados, formaciones defensivas extremas (shifts) y la innovación de los 'pitchers openers' para competir y superar a los equipos más ricos. Esta filosofía los llevó de vuelta a la Serie Mundial en 2020 y los mantiene como contendientes anuales."
            }
        ]
    },

    // --- AL CENTRAL ---
    {
        id: 114,
        name: "Cleveland Guardians",
        founded: 1901,
        worldSeries: 2,
        stadium: "Progressive Field",
        legends: ["Bob Feller", "Tris Speaker", "Jim Thome", "Larry Doby"],
        coverImage: "https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/ludqcsywpsvydu75d5f7.jpg",
        history: [
            {
                heading: "De Naps a Indians y Pioneros",
                text: "Cleveland fue una de las franquicias fundadoras de la Liga Americana en 1901. Originalmente conocidos como los Naps en honor a su jugador estrella Nap Lajoie, cambiaron su nombre a los Indians en 1915. Ganaron su primera Serie Mundial en 1920. En 1947, Cleveland hizo historia cuando Larry Doby se convirtió en el primer jugador afroamericano en la Liga Americana, meses después de Jackie Robinson, ayudando al equipo a ganar su segunda Serie Mundial en 1948."
            },
            {
                heading: "El Poder de los Noventa",
                text: "Tras décadas de mediocridad, Cleveland experimentó un renacimiento masivo en la década de 1990 con la inauguración del Jacobs Field (ahora Progressive Field). El estadio se llenó durante un récord de 455 juegos consecutivos. Con un equipo explosivo que incluía a Jim Thome, Manny Ramírez y Omar Vizquel, llegaron a dos Series Mundiales (1995 y 1997), aunque cayeron en ambas ocasiones, incluyendo una dolorosa derrota en extra innings en 1997."
            },
            {
                heading: "Una Nueva Identidad: Guardians",
                text: "El equipo ha luchado con una de las sequías de campeonatos más largas del deporte, sufriendo otra desgarradora derrota en el Juego 7 de la Serie Mundial de 2016 ante los Cubs. En 2022, tras años de debate sobre su nombre y logotipo anterior (el Jefe Wahoo), la franquicia se rebautizó oficialmente como los Cleveland Guardians, inspirados en las icónicas estatuas de los Guardianes del Tráfico que flanquean el puente Hope Memorial de la ciudad."
            }
        ]
    },
    {
        id: 145,
        name: "Chicago White Sox",
        founded: 1901,
        worldSeries: 3,
        stadium: "Guaranteed Rate Field",
        legends: ["Frank Thomas", "Paul Konerko", "Shoeless Joe Jackson", "Minnie Miñoso"],
        coverImage: "https://media.cnn.com/api/v1/images/stellar/prod/ap24219139416173.jpg?c=original",
        history: [
            {
                heading: "Los Go-Go White Sox y el Escándalo",
                text: "Fundados en 1901, los White Sox ganaron la Serie Mundial en 1906 y 1917. Sin embargo, su historia temprana está marcada por el escándalo de los 'Black Sox' de 1919. Ocho jugadores, incluido el legendario Shoeless Joe Jackson, fueron suspendidos de por vida por conspirar con apostadores para perder intencionalmente la Serie Mundial ante Cincinnati. Este evento cambió la gobernanza del béisbol, resultando en la creación de la figura del Comisionado."
            },
            {
                heading: "La Sequía y Minnie Miñoso",
                text: "Después del escándalo, los White Sox entraron en una larga sequía de campeonatos. Durante la década de 1950, el equipo fue conocido como los 'Go-Go White Sox' por su estilo de juego basado en la velocidad y la defensa, liderados por el cubano Minnie Miñoso, el primer jugador negro del equipo y uno de los pioneros latinos más importantes en la historia del deporte. Llegaron a la Serie Mundial en 1959, pero perdieron."
            },
            {
                heading: "El Fin de la Maldición en 2005",
                text: "Tuvieron que pasar 88 años desde su último campeonato para que los White Sox volvieran a la cima. En 2005, dirigidos por el carismático y volcánico manager Ozzie Guillén, el equipo tuvo una postemporada dominante. Con un pitcheo abridor intratable y el liderazgo de Paul Konerko, los White Sox barrieron a los Houston Astros en la Serie Mundial, dándole al lado sur de Chicago el trofeo que tanto habían esperado."
            }
        ]
    },
    {
        id: 116,
        name: "Detroit Tigers",
        founded: 1901,
        worldSeries: 4,
        stadium: "Comerica Park",
        legends: ["Ty Cobb", "Al Kaline", "Miguel Cabrera", "Hank Greenberg"],
        coverImage: "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2025/05/1294/728/2351f427-tigers1.jpg?ve=1&tl=1",
        history: [
            {
                heading: "La Era de Ty Cobb",
                text: "Los Tigers son uno de los pocos equipos fundadores de la Liga Americana que nunca se han mudado ni han cambiado de nombre. Sus primeras décadas estuvieron definidas por Ty Cobb, uno de los jugadores más agresivos y talentosos de la historia, quien ganó 12 títulos de bateo. A pesar de la grandeza de Cobb, los Tigers no ganaron su primera Serie Mundial hasta 1935, impulsados por los bateadores Hank Greenberg y Charlie Gehringer."
            },
            {
                heading: "El Año del Tigre: 1968 y 1984",
                text: "En 1968, mientras la ciudad de Detroit se recuperaba de severos disturbios civiles, los Tigers unificaron a la comunidad al ganar la Serie Mundial contra los Cardinals, liderados por el lanzador Denny McLain (último en ganar 30 juegos en un año) y Mickey Lolich. En 1984, el equipo conocido como 'Bless You Boys' tuvo uno de los inicios de temporada más dominantes de la historia (35-5) y coronó el año ganando el campeonato bajo el mando de Sparky Anderson."
            },
            {
                heading: "La Era de Miggy y Verlander",
                text: "En la década de 2010, los Tigers armaron equipos temibles respaldados por el pitcheo de Justin Verlander y Max Scherzer, y el bateo del venezolano Miguel Cabrera. En 2012, Cabrera logró la hazaña más rara del bateo moderno: la Triple Corona (liderar en promedio, jonrones y carreras impulsadas), algo que no se veía en 45 años. Aunque llegaron a dos Series Mundiales en esta era, no lograron llevarse el trofeo, entrando posteriormente en un periodo de reconstrucción."
            }
        ]
    },
    {
        id: 118,
        name: "Kansas City Royals",
        founded: 1969,
        worldSeries: 2,
        stadium: "Kauffman Stadium",
        legends: ["George Brett", "Salvador Pérez", "Frank White", "Bret Saberhagen"],
        coverImage: "https://cdn.britannica.com/77/187977-050-267F4F74/Drew-Butera-Wade-Davis-Kansas-City-Royals-2015.jpg",
        history: [
            {
                heading: "Un Inicio Competitivo",
                text: "Los Royals nacieron como equipo de expansión en 1969, reemplazando a los Athletics que se habían mudado a Oakland. A diferencia de la mayoría de los equipos de expansión, Kansas City se volvió competitivo muy rápidamente. Para finales de la década de 1970, ya eran contendientes perennes en la Liga Americana, construyendo una intensa rivalidad con los New York Yankees, enfrentándose a ellos repetidamente en emocionantes Series de Campeonato."
            },
            {
                heading: "La Gloria de 1985 y el Incidente de la Brea",
                text: "La máxima figura de la franquicia es el tercera base George Brett. Brett es famoso no solo por coquetear con un promedio de .400 en 1980, sino por el infame 'Incidente de la Brea' en 1983. En 1985, los Royals lograron su consagración al remontar un déficit de 3-1 contra sus rivales estatales, los St. Louis Cardinals, en la 'Serie I-70', ganando la primera Serie Mundial en la historia de la ciudad."
            },
            {
                heading: "Treinta Años de Espera y el Retorno Rey",
                text: "Tras el triunfo del 85, los Royals sufrieron una sequía de 29 años sin llegar a la postemporada. Todo cambió en 2014, cuando un equipo construido sobre velocidad en las bases, defensa hermética y un bullpen invencible llegó milagrosamente a la Serie Mundial, perdiendo en 7 juegos ante los Giants. Con sed de venganza, regresaron en 2015, demostrando una resiliencia implacable para ganar su segundo campeonato mundial ante los New York Mets, con Salvador Pérez como MVP."
            }
        ]
    },
    {
        id: 142,
        name: "Minnesota Twins",
        founded: 1901,
        worldSeries: 3,
        stadium: "Target Field",
        legends: ["Kirby Puckett", "Harmon Killebrew", "Joe Mauer", "Walter Johnson"],
        coverImage: "https://www.audacy.com/media-library/tristan-gray-4-of-the-minnesota-twins-celebrates-at-the-plate-with-matt-wallner-38-after-hitting-a-three-run-home-run-in-the-s.jpg?id=65512957&width=600",
        history: [
            {
                heading: "Raíces Presidenciales: Los Washington Senators",
                text: "La franquicia comenzó en 1901 como los Washington Senators. Jugando en la capital de la nación, fueron famosos por albergar la tradición de los presidentes de EE.UU. lanzando la primera bola. Su gran estrella fue Walter Johnson, 'El Gran Tren', uno de los mejores lanzadores de todos los tiempos, quien los guio a su única Serie Mundial en Washington en 1924. En 1961, el equipo se mudó a las 'Ciudades Gemelas' (Minneapolis-St. Paul) y adoptaron el nombre de Twins."
            },
            {
                heading: "La Magia de la Homer Hanky (1987 y 1991)",
                text: "Jugando en el ruidoso e inflable Metrodome, los Twins construyeron equipos campeones gracias a una ventaja de local ensordecedora y la icónica toalla 'Homer Hanky'. Ganaron la Serie Mundial en 1987, y nuevamente en 1991 en lo que muchos consideran la mejor Serie Mundial de la historia contra los Braves. El Juego 6 de 1991 es legendario por el jonrón de oro de Kirby Puckett y el Juego 7 por la blanqueada de 10 entradas de Jack Morris."
            },
            {
                heading: "El Siglo XXI y Target Field",
                text: "En la década de 2000, los Twins fueron consistentemente competitivos bajo el mando del manager Ron Gardenhire, ganando múltiples títulos divisionales, aunque frecuentemente eliminados por los Yankees. Liderados por el cátcher local Joe Mauer, quien ganó tres títulos de bateo (algo rarísimo para un receptor), el equipo se mudó al hermoso Target Field al aire libre en 2010. Recientemente, han adoptado un enfoque de poder extremo, rompiendo récords de jonrones como equipo."
            }
        ]
    },

    // --- AL OESTE ---
    {
        id: 117,
        name: "Houston Astros",
        founded: 1962,
        worldSeries: 2,
        stadium: "Minute Maid Park",
        legends: ["Craig Biggio", "Jeff Bagwell", "José Altuve", "Justin Verlander"],
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKb7_YGOobnAPDB2nTJcCZskrlCwYkq9-r_ffV0T88zadwgzJnjRBPzE&s=10",
        history: [
            {
                heading: "Colt .45s y la Maravilla del Astrodome",
                text: "La franquicia nació en 1962 como los Houston Colt .45s dentro de la Liga Nacional. Tres años después, se mudaron al Astrodome, el primer estadio deportivo cubierto del mundo, que fue bautizado como la 'Octava Maravilla del Mundo'. Para reflejar la modernidad y la relevancia de Houston como sede del centro espacial de la NASA, el equipo fue rebautizado como los 'Astros'."
            },
            {
                heading: "Los Killer B's y el Cambio de Liga",
                text: "A finales de los 90 y principios de los 2000, los Astros fueron liderados por los 'Killer B's': Jeff Bagwell, Craig Biggio y Lance Berkman. Este núcleo los llevó a su primera Serie Mundial en 2005, perdiendo ante los White Sox. Tras esto, entraron en una reconstrucción masiva. En 2013, en un movimiento histórico ordenado por la MLB para equilibrar las divisiones, los Astros abandonaron la Liga Nacional para unirse a la Liga Americana."
            },
            {
                heading: "Dinastía, Astros y la Controversia",
                text: "El cambio de liga marcó el inicio de una era dorada analítica. Liderados por José Altuve, los Astros ganaron su primera Serie Mundial en 2017. Sin embargo, este título se vio manchado gravemente a finales de 2019 cuando se reveló un complejo sistema de robo de señales usando tecnología. A pesar del odio generalizado y las sanciones, Houston demostró la calidad innegable de su talento llegando a seis Series de Campeonato consecutivas y ganando de forma limpia su segundo campeonato en 2022."
            }
        ]
    },
    {
        id: 140,
        name: "Texas Rangers",
        founded: 1961,
        worldSeries: 1,
        stadium: "Globe Life Field",
        legends: ["Nolan Ryan", "Iván Rodríguez", "Adrián Beltré", "Corey Seager"],
        coverImage: "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_302,w_5598,h_3148/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ReutersImages/mmsport/inside_the_rangers/01kxeary4pb90620d8yg.jpg",
        history: [
            {
                heading: "De Washington a Arlington",
                text: "La franquicia comenzó como un equipo de expansión en 1961, convirtiéndose en los nuevos Washington Senators (después de que los originales se mudaran a Minnesota). El equipo tuvo problemas para atraer público en la capital y en 1972 se reubicaron en Arlington, Texas, adoptando el nombre de Rangers en honor a la famosa agencia de la ley del estado. Sus primeros años en Texas fueron difíciles a pesar de contar con grandes talentos individuales."
            },
            {
                heading: "Nolan Ryan, Pudge y el Rompecorazones de 2011",
                text: "La popularidad del equipo explotó a finales de los 80 e inicios de los 90 con la llegada del legendario lanzador Nolan Ryan, quien lanzó múltiples juegos sin hit ni carrera en Texas, y el surgimiento del estelar receptor Iván 'Pudge' Rodríguez. En 2010 y 2011, los Rangers llegaron a sus primeras Series Mundiales. La de 2011 fue especialmente traumática: estuvieron a un solo strike de ganar el campeonato en dos ocasiones distintas durante el Juego 6, antes de perder ante los Cardinals."
            },
            {
                heading: "La Redención y el Primer Campeonato",
                text: "Tras años de intentar regresar a la cima y firmar a estrellas como Adrián Beltré, la directiva decidió hacer inversiones masivas en 2022 y 2023, contratando al manager Bruce Bochy y al MVP Corey Seager. En una postemporada mágica en 2023, los Rangers establecieron un récord de victorias como visitantes, derrotando a sus rivales estatales (los Astros) en el camino, y finalmente vencieron a los Diamondbacks para capturar la primera Serie Mundial en la historia de la franquicia."
            }
        ]
    },
    {
        id: 136,
        name: "Seattle Mariners",
        founded: 1977,
        worldSeries: 0,
        stadium: "T-Mobile Park",
        legends: ["Ken Griffey Jr.", "Edgar Martínez", "Ichiro Suzuki", "Félix Hernández"],
        coverImage: "https://media.cnn.com/api/v1/images/stellar/prod/ap25286107074482.jpg?c=original&q=w_860,c_fill",
        history: [
            {
                heading: "El Nacimiento y los Años del Kingdome",
                text: "Los Mariners nacieron en 1977 como equipo de expansión, jugando en el oscuro estadio techado Kingdome de concreto. Durante casi dos décadas, fueron uno de los peores equipos del béisbol, sin lograr una sola temporada ganadora hasta 1991. Sin embargo, esto les permitió seleccionar en el draft a talentos generacionales que cambiarían la cultura del béisbol en el noroeste del Pacífico."
            },
            {
                heading: "La Salvación del Béisbol en Seattle (1995)",
                text: "La historia de los Mariners cambió en 1995. Ante la amenaza de que el equipo fuera reubicado a otra ciudad por falta de apoyo, la superestrella Ken Griffey Jr. y el bateador designado Edgar Martínez lideraron una remontada mágica en la división bajo el lema 'Refuse to Lose' (Rehúsate a perder). En los playoffs, el legendario doblete de Martínez para dejar en el terreno a los Yankees no solo ganó la serie, sino que literalmente salvó al béisbol en Seattle al asegurar la financiación para un nuevo estadio."
            },
            {
                heading: "Ichiro, los 116 Triunfos y la Larga Sequía",
                text: "En 2001, tras la salida de A-Rod y Griffey, la estrella japonesa Ichiro Suzuki llegó al equipo y tuvo una temporada de novato histórica. Los Mariners empataron el récord de todos los tiempos ganando 116 juegos de temporada regular, aunque perdieron en los playoffs. A partir de 2002, comenzó una sequía de postemporada que duró 21 años, la más larga en los deportes profesionales norteamericanos, hasta que finalmente fue rota en 2022 con un jonrón dramático de Cal Raleigh."
            }
        ]
    },
    {
        id: 108,
        name: "Los Angeles Angels",
        founded: 1961,
        worldSeries: 1,
        stadium: "Angel Stadium",
        legends: ["Mike Trout", "Tim Salmon", "Vladimir Guerrero", "Nolan Ryan"],
        coverImage: "https://athlonsports.com/.image/MjY6MDAwMDAwMDAxNDcxMDUx/mlb-los-angeles-angels-at-texas-rangers.jpg",
        history: [
            {
                heading: "El Equipo del Vaquero Cantante",
                text: "Los Angels se unieron a la Liga Americana en 1961 como equipo de expansión, fundados por el famoso cantante y actor de Hollywood Gene Autry. Originalmente jugaron en Los Ángeles, incluso compartiendo el Dodger Stadium durante unos años, antes de construir su propio parque en Anaheim (Condado de Orange) en 1966. Durante décadas, el equipo fue conocido por quedarse a la sombra de los Dodgers y sufrir colapsos dolorosos en playoffs."
            },
            {
                heading: "El Rally Monkey y el Campeonato",
                text: "En la temporada 2002, el equipo encontró la magia. Adoptando a un mono saltarín en las pantallas del estadio llamado el 'Rally Monkey' como su amuleto no oficial para remontadas, los Angels, liderados por Tim Salmon y Garret Anderson, superaron expectativas. Abajo 3-2 en la Serie Mundial ante Barry Bonds y los Giants, organizaron una remontada épica en el Juego 6 y ganaron el Juego 7 para darle a Gene Autry (ya fallecido) el único campeonato de la franquicia."
            },
            {
                heading: "La Era de Trout y Ohtani",
                text: "A partir de 2010, los Angels han estado definidos por contar con el mejor talento individual del planeta. Primero llegó Mike Trout, considerado universalmente como el mejor jugador de su generación. Más tarde, se unió el fenómeno japonés Shohei Ohtani, quien revolucionó el deporte lanzando y bateando al nivel de MVP. Irónicamente, a pesar de tener a dos de los mejores jugadores de la historia en el mismo roster, la gerencia falló constantemente en rodearlos del talento de pitcheo necesario, impidiéndoles llegar a la postemporada."
            }
        ]
    },
    {
        id: 133,
        name: "Oakland Athletics",
        founded: 1901,
        worldSeries: 9,
        stadium: "Oakland Coliseum",
        legends: ["Rickey Henderson", "Reggie Jackson", "Dennis Eckersley", "Jimmie Foxx"],
        coverImage: "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/590e/live/9e5cc200-7ca2-11ef-8e32-63db939b4fab.jpg",
        history: [
            {
                heading: "De Filadelfia a Kansas City a Oakland",
                text: "Los Athletics son una de las franquicias más antiguas y nómadas. Nacieron en 1901 en Filadelfia, donde ganaron 5 Series Mundiales bajo el mando del icónico manager y dueño Connie Mack. Por razones económicas, se mudaron a Kansas City en 1955, donde fueron esencialmente un equipo granja para los Yankees. Finalmente, el controversial dueño Charlie Finley movió el equipo a Oakland, California, en 1968, cambiando sus colores al audaz Verde y Oro."
            },
            {
                heading: "Bigotes y Terremotos (Los 70s y 80s)",
                text: "En Oakland, los A's construyeron dos dinastías legendarias. En los años 70, un equipo rebelde, caracterizado por sus largos bigotes, pelo largo y peleas en el vestuario, ganó tres Series Mundiales consecutivas (1972-1974) con estrellas como Reggie Jackson y Rollie Fingers. A finales de los 80, impulsados por los 'Bash Brothers' (José Canseco y Mark McGwire) y el lanzador Dennis Eckersley, ganaron la surrealista 'Serie del Terremoto' de 1989 frente a sus vecinos, los SF Giants."
            },
            {
                heading: "Moneyball y el Futuro Incierto",
                text: "A principios de los 2000, los Athletics revolucionaron permanentemente la industria del deporte. Sin presupuesto para competir contra los Yankees, el gerente Billy Beane utilizó análisis estadístico avanzado ('sabermetría') para encontrar jugadores subvaluados, concepto popularizado como 'Moneyball'. Lograron múltiples récords de victorias en temporada regular con nóminas minúsculas. Hoy en día, la franquicia enfrenta una controvertida transición, habiendo aprobado su inminente reubicación temporal y futura mudanza a Las Vegas."
            }
        ]
    },
    {
        id: 144,
        name: "Atlanta Braves",
        founded: 1876,
        worldSeries: 4,
        stadium: "Truist Park",
        legends: ["Hank Aaron", "Chipper Jones", "Greg Maddux", "Warren Spahn"],
        coverImage: "https://cdn.theathletic.com/app/uploads/2023/09/13203958/Braves-scaled.jpg",
        history: [
            { heading: "La franquicia más antigua", text: "Los Braves trazan su origen hasta 1871 y son la única franquicia que ha competido en cada temporada de la Liga Nacional desde 1876. Pasaron por Boston y Milwaukee antes de instalarse en Atlanta en 1966, llevando consigo una tradición que abarca más de 150 años." },
            { heading: "Hank Aaron y la gran rotación", text: "Hank Aaron se convirtió en símbolo de Atlanta al superar el récord de jonrones de Babe Ruth en 1974. En los años noventa, la rotación formada por Greg Maddux, Tom Glavine y John Smoltz sostuvo una racha de 14 títulos divisionales consecutivos y el campeonato de 1995." },
            { heading: "El título de 2021", text: "Tras una temporada marcada por lesiones y movimientos en la fecha límite, los Braves derrotaron a los Astros en la Serie Mundial de 2021. El poder de Jorge Soler, Freddie Freeman y Austin Riley devolvió el trofeo a Atlanta después de 26 años." }
        ]
    },
    {
        id: 158,
        name: "Milwaukee Brewers",
        founded: 1969,
        worldSeries: 0,
        stadium: "American Family Field",
        legends: ["Robin Yount", "Paul Molitor", "Rollie Fingers", "Cecil Cooper"],
        coverImage: "https://s7d2.scene7.com/is/image/TWCNews/AP26289121775726_crop",
        history: [
            { heading: "De Seattle a Milwaukee", text: "La franquicia debutó como Seattle Pilots en 1969 y se mudó a Milwaukee un año después, adoptando el nombre Brewers en honor a la tradición cervecera de la ciudad. En 1998 pasó de la Liga Americana a la Nacional para equilibrar las divisiones." },
            { heading: "Yount, Molitor y el Harvey's Wallbangers", text: "Robin Yount y Paul Molitor lideraron una generación inolvidable. En 1982, el equipo apodado Harvey's Wallbangers ganó el banderín de la Liga Americana con una ofensiva explosiva, aunque perdió la Serie Mundial ante los Cardinals." },
            { heading: "Una identidad de desarrollo", text: "Los Brewers han construido su competitividad moderna alrededor del pitcheo, la defensa y el desarrollo de talento. El Miller Park, hoy American Family Field, conserva el techo retráctil que permite jugar durante los inviernos de Wisconsin." }
        ]
    },
    {
        id: 138,
        name: "St. Louis Cardinals",
        founded: 1882,
        worldSeries: 11,
        stadium: "Busch Stadium",
        legends: ["Stan Musial", "Bob Gibson", "Ozzie Smith", "Albert Pujols"],
        coverImage: "https://img.mlbstatic.com/mlb-images/image/private/t_16x9/t_w1024/mlb/isisuyoluw0ujpjdvoox",
        history: [
            { heading: "La institución del Medio Oeste", text: "Los Cardinals son una de las franquicias más laureadas de la Liga Nacional. Sus raíces se remontan a 1882, y desde St. Louis construyeron una cultura de desarrollo, defensa y juego inteligente que los convirtió en el club dominante de la región." },
            { heading: "Stan the Man y Gibson", text: "Stan Musial fue el rostro de la franquicia durante las décadas de 1940 y 1950. En 1964 y 1967, Bob Gibson lideró al equipo desde el montículo; su actuación de 1968, con una efectividad de 1.12, es una de las temporadas de pitcheo más recordadas." },
            { heading: "Pujols y el siglo XXI", text: "Albert Pujols, Yadier Molina y Adam Wainwright encabezaron los campeonatos de 2006 y 2011. La victoria de 2011 quedó marcada por el Juego 6, en el que David Freese conectó un dramático doble y jonrón para mantener vivo el camino al título." }
        ]
    },
    {
        id: 112,
        name: "Chicago Cubs",
        founded: 1876,
        worldSeries: 3,
        stadium: "Wrigley Field",
        legends: ["Ernie Banks", "Ryne Sandberg", "Ron Santo", "Kris Bryant"],
        coverImage: "https://cdn.abcotvs.com/dip/images/16925028_AP25149019300662.jpg",
        history: [
            { heading: "Wrigley Field y los primeros campeones", text: "Los Cubs pertenecen a la generación fundadora de la Liga Nacional. Wrigley Field, inaugurado como Weeghman Park en 1914, es uno de los estadios más reconocibles del deporte gracias a su hiedra, su marcador manual y sus tradiciones centenarias." },
            { heading: "El siglo de espera", text: "Entre 1908 y 2016, Chicago vivió 108 años sin ganar la Serie Mundial. La sequía se convirtió en parte del imaginario del equipo, junto con historias como la maldición de la cabra Billy y la fidelidad de generaciones de aficionados." },
            { heading: "El histórico 2016", text: "Bajo Joe Maddon y con una generación liderada por Kris Bryant, Anthony Rizzo y Javier Báez, los Cubs ganaron 103 partidos y vencieron a Cleveland en siete juegos. El Juego 7, decidido en entradas extra, puso fin a una de las esperas más famosas del deporte." }
        ]
    },
    {
        id: 113,
        name: "Cincinnati Reds",
        founded: 1882,
        worldSeries: 5,
        stadium: "Great American Ball Park",
        legends: ["Johnny Bench", "Joe Morgan", "Pete Rose", "Frank Robinson"],
        coverImage: "https://s.yimg.com/lo/mysterio/api/5b5e9318510bdd960a357ca518f3f9c93c5bd1ec3e62eb90b778cc63fc93646e/lightyear_networkapi/resizefill_w1200_h675%3Bquality_80%3Bformat_webp/https%3A%2F%2Fmedia.zenfs.com%2Fen%2Fsb_nation_articles_115%2Fb99fcdd77eb8455166d92ab92e15b96c.jpg",
        history: [
            { heading: "Los primeros profesionales", text: "Los Cincinnati Red Stockings de 1869 son reconocidos como el primer equipo profesional abiertamente asalariado. La tradición de béisbol de la ciudad continuó con los Reds, fundados en 1882 y convertidos en una pieza esencial de la Liga Nacional." },
            { heading: "La Big Red Machine", text: "Entre 1970 y 1976, la Big Red Machine ganó cinco banderines y cuatro Series Mundiales. Johnny Bench, Joe Morgan, Tony Pérez y Pete Rose combinaron defensa, velocidad y poder en una de las alineaciones más completas de la historia." },
            { heading: "Una cantera histórica", text: "Cincinnati ha producido receptores, bateadores y lanzadores de enorme impacto. Sus campeonatos de 1975 y 1976, especialmente la Serie Mundial de 1975 contra Boston, son parte fundamental de la memoria del béisbol moderno." }
        ]
    },
    {
        id: 134,
        name: "Pittsburgh Pirates",
        founded: 1887,
        worldSeries: 5,
        stadium: "PNC Park",
        legends: ["Roberto Clemente", "Willie Stargell", "Honus Wagner", "Barry Bonds"],
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyPyw-8KovPUNpB0ZbbYxuisg8AYChIiAhy1UszmOmrqfGzDKr8RWGB4&s=10",
        history: [
            { heading: "Honus Wagner y los primeros años", text: "Los Pirates se integraron a la Liga Nacional en 1887 y encontraron a su primera gran figura en Honus Wagner, uno de los mejores jugadores de todos los tiempos. Su tarjeta de béisbol es también una de las piezas coleccionables más valiosas del mundo." },
            { heading: "Roberto Clemente", text: "El puertorriqueño Roberto Clemente convirtió a Pittsburgh en un símbolo del talento latino. Ganó 12 Guantes de Oro, alcanzó los 3,000 hits y conectó el hit decisivo de la Serie Mundial de 1971, antes de fallecer mientras ayudaba a víctimas de un terremoto en 1972." },
            { heading: "La familia de 1979", text: "En 1979, Willie Stargell y los Pirates derrotaron a Baltimore en una Serie Mundial de siete juegos. La mezcla de personalidades, música y apoyo comunitario recibió el nombre de We Are Family y sigue siendo una de las identidades más queridas de MLB." }
        ]
    },
    {
        id: 119,
        name: "Los Angeles Dodgers",
        founded: 1883,
        worldSeries: 8,
        stadium: "Dodger Stadium",
        legends: ["Jackie Robinson", "Sandy Koufax", "Fernando Valenzuela", "Clayton Kershaw"],
        coverImage: "https://www.hollywoodreporter.com/wp-content/uploads/2025/11/GettyImages-2244556732-e1762058538336.jpg",
        history: [
            { heading: "De Brooklyn a Los Ángeles", text: "Nacidos como Brooklyn Atlantics y más tarde conocidos como Dodgers, se mudaron a Los Ángeles en 1958. Dodger Stadium abrió en 1962 y se convirtió en uno de los escenarios más emblemáticos de la costa oeste." },
            { heading: "Robinson, Koufax y Valenzuela", text: "Jackie Robinson debutó con Brooklyn en 1947 y abrió la puerta de la integración. Sandy Koufax dominó los años sesenta, mientras Fernando Valenzuela protagonizó Fernandomanía en 1981 y conectó a México con la pasión de Los Ángeles." },
            { heading: "Tradición y era moderna", text: "Los Dodgers ganaron la Serie Mundial de 2020 en una temporada excepcional y han mantenido una presencia constante en postemporada. Su organización combina una academia internacional influyente, innovación analítica y una de las aficiones más grandes de MLB." }
        ]
    },
    {
        id: 137,
        name: "San Francisco Giants",
        founded: 1883,
        worldSeries: 8,
        stadium: "Oracle Park",
        legends: ["Willie Mays", "Willie McCovey", "Barry Bonds", "Buster Posey"],
        coverImage: "https://sportshub.cbsistatic.com/i/2023/06/18/25bbfd5e-14c2-4bba-8252-ab716b625a08/gettyimages-14993372891.jpg",
        history: [
            { heading: "Gigantes de Nueva York", text: "La franquicia nació en Nueva York en 1883 y ganó campeonatos con figuras como Christy Mathewson y Mel Ott. En 1958 se trasladó a San Francisco junto con la expansión del béisbol hacia California." },
            { heading: "Willie Mays y el Oeste", text: "Willie Mays convirtió el jardín central en un espectáculo y su atrapada en la Serie Mundial de 1954 es una de las imágenes más famosas de la historia. Willie McCovey y Juan Marichal continuaron la tradición de estrellas del club." },
            { heading: "La dinastía de los 2010", text: "Con Buster Posey y Madison Bumgarner como protagonistas, San Francisco ganó las Series Mundiales de 2010, 2012 y 2014. El equipo se distinguió por el pitcheo en octubre y el juego colectivo." }
        ]
    },
    {
        id: 135,
        name: "San Diego Padres",
        founded: 1969,
        worldSeries: 0,
        stadium: "Petco Park",
        legends: ["Tony Gwynn", "Trevor Hoffman", "Dave Winfield", "Randy Jones"],
        coverImage: "https://img.mlbstatic.com/mlb-images/image/upload/ar_16:9,g_auto,q_auto:good,w_1024,c_fill,f_jpg,dpr_3.0/mlb/okwpwkdcrghlvun7hwih",
        history: [
            { heading: "Una franquicia de expansión", text: "Los Padres debutaron en 1969 junto con los Montreal Expos, Kansas City Royals y Seattle Pilots. El club tomó su nombre de los Padres de San Diego de las ligas menores y se convirtió en el primer equipo de MLB de la ciudad." },
            { heading: "Tony Gwynn, el señor Padre", text: "Tony Gwynn ganó ocho títulos de bateo y acumuló 3,141 hits con una consistencia extraordinaria. Su lealtad a San Diego y su estilo de juego hicieron de él el mayor embajador deportivo de la ciudad." },
            { heading: "Octubre y una nueva generación", text: "San Diego alcanzó la Serie Mundial en 1984 y 1998. En años recientes, Petco Park ha recibido a una generación de estrellas encabezada por Fernando Tatis Jr., Manny Machado y Yu Darvish, reavivando la expectativa de conquistar el primer título." }
        ]
    },
    {
        id: 115,
        name: "Colorado Rockies",
        founded: 1993,
        worldSeries: 0,
        stadium: "Coors Field",
        legends: ["Larry Walker", "Todd Helton", "Nolan Arenado", "Dante Bichette"],
        coverImage: "https://milehighsports.com/wp-content/uploads/2025/05/USATSI_26278704-728x487.jpg",
        history: [
            { heading: "Béisbol en las Montañas Rocosas", text: "Los Rockies comenzaron a jugar en 1993 como la primera franquicia de MLB en Colorado. Su llegada llenó el Mile High Stadium y despertó una afición nueva en una región sin tradición previa de Grandes Ligas." },
            { heading: "Coors Field y el poder ofensivo", text: "Coors Field abrió en 1995 y su altitud convirtió a Denver en uno de los parques más favorables para batear. Larry Walker, Todd Helton y Andrés Galarraga protagonizaron temporadas ofensivas memorables, mientras el club aprendía a construir pitcheo en esas condiciones." },
            { heading: "La Serie Mundial de 2007", text: "En 2007, Colorado ganó 21 de sus últimos 22 partidos de temporada regular y avanzó a su primera Serie Mundial. La racha, conocida como Rocktober, convirtió a los Rockies en el segundo equipo de expansión de la Liga Nacional en llegar al clásico de otoño." }
        ]
    },
    {
        id: 109,
        name: "Arizona Diamondbacks",
        founded: 1998,
        worldSeries: 1,
        stadium: "Chase Field",
        legends: ["Randy Johnson", "Luis Gonzalez", "Curt Schilling", "Paul Goldschmidt"],
        coverImage: "https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/v1792361343/mlb/pnuznhln42cn7fibcgik.jpg",
        history: [
            { heading: "El béisbol llega a Phoenix", text: "Los Diamondbacks se estrenaron en 1998 y compartieron con Tampa Bay la expansión de la Liga Nacional y Americana. Chase Field introdujo un techo retráctil para proteger a los aficionados del calor del desierto." },
            { heading: "El campeonato más rápido", text: "En apenas su cuarta temporada, Arizona ganó la Serie Mundial de 2001. Randy Johnson y Curt Schilling dominaron el pitcheo, y Luis González conectó el sencillo decisivo en el Juego 7 contra los Yankees." },
            { heading: "Una identidad del desierto", text: "La franquicia ha desarrollado talento internacional y una identidad basada en velocidad, defensa y pitcheo. En 2023 volvió a la Serie Mundial con una plantilla joven, confirmando a Phoenix como un mercado importante del béisbol." }
        ]
    },
    {
        id: 120,
        name: "Washington Nationals",
        founded: 1969,
        worldSeries: 1,
        stadium: "Nationals Park",
        legends: ["Frank Howard", "Ryan Zimmerman", "Max Scherzer", "Stephen Strasburg"],
        coverImage: "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/VDXX22XZNMIYM6T2LVWU73ZYKY_size-normalized.jpg&w=1440",
        history: [
            { heading: "De Montreal a Washington", text: "La franquicia nació en 1969 como Montreal Expos, el primer equipo de MLB en Canadá. En 2005 se mudó a Washington y adoptó el nombre Nationals, devolviendo las Grandes Ligas a la capital estadounidense después de más de tres décadas." },
            { heading: "El regreso a la capital", text: "Ryan Zimmerman fue el primer gran símbolo de la nueva etapa. El club también reunió a estrellas como Max Scherzer, Bryce Harper, Anthony Rendon y Stephen Strasburg para construir una de las plantillas más talentosas de la década de 2010." },
            { heading: "La remontada de 2019", text: "Washington comenzó 2019 con marca de 19-31, pero remontó hasta ganar el banderín y la primera Serie Mundial de la franquicia. Los Nationals ganaron los cuatro juegos como visitantes contra Houston y cerraron el título en el Juego 7." }
        ]
    },
    {
        id: 146,
        name: "Miami Marlins",
        founded: 1993,
        worldSeries: 2,
        stadium: "loanDepot park",
        legends: ["Jeff Conine", "Gary Sheffield", "Miguel Cabrera", "Giancarlo Stanton"],
        coverImage: "https://preview.redd.it/the-marlins-close-out-the-2026-season-having-gone-11-3-when-v0-47p4yl3cw5sh1.jpeg?width=1080&crop=smart&auto=webp&s=a58ba2b1dd995656d9460d40721142c513105575",
        history: [
            { heading: "La expansión de Florida", text: "Los Marlins comenzaron en 1993 como Florida Marlins, el primer equipo de Grandes Ligas del sur de Florida. El club cambió su nombre a Miami Marlins en 2012 al mudarse a su estadio actual." },
            { heading: "Dos títulos inesperados", text: "Miami ganó las Series Mundiales de 1997 y 2003 como equipo comodín. En 2003, jóvenes como Miguel Cabrera y Dontrelle Willis se unieron a veteranos como Iván Rodríguez para superar a los Yankees." },
            { heading: "Una cantera internacional", text: "La organización ha sido una fuente constante de talento latinoamericano. Desde José Fernández hasta Giancarlo Stanton, los Marlins han dejado una huella ofensiva y emocional en una de las ciudades más diversas de Estados Unidos." }
        ]
    },
    {
        id: 121,
        name: "New York Mets",
        founded: 1962,
        worldSeries: 2,
        stadium: "Citi Field",
        legends: ["Tom Seaver", "Mike Piazza", "Darryl Strawberry", "David Wright"],
        coverImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8I8IcclMIRASGEg4SdafcwpeBua0c5jigJJxExwczvqcZRa2rHjPiVTk&s=10",
        history: [
            { heading: "El reemplazo de los Giants y Dodgers", text: "Los Mets debutaron en 1962 para devolver la Liga Nacional a Nueva York después de la mudanza de los Dodgers y los Giants. Sus colores mezclan el azul de Brooklyn y el naranja de los Giants, una conexión directa con la historia de la ciudad." },
            { heading: "El milagro de 1969", text: "Tras años de resultados modestos, los Mets de 1969 sorprendieron al ganar la división, vencer a Atlanta y derrotar a Baltimore en la Serie Mundial. La rotación de Tom Seaver y Jerry Koosman convirtió al equipo en el Miracle Mets." },
            { heading: "1986 y una nueva generación", text: "La edición de 1986 ganó 108 partidos y remontó una desventaja de dos carreras en el Juego 6 contra Boston. Mike Piazza y David Wright encabezaron épocas posteriores, manteniendo a Citi Field como uno de los escenarios más apasionados de la Liga Nacional." }
        ]
    },
    {
        id: 143,
        name: "Philadelphia Phillies",
        founded: 1883,
        worldSeries: 2,
        stadium: "Citizens Bank Park",
        legends: ["Mike Schmidt", "Steve Carlton", "Roy Halladay", "Ryan Howard"],
        coverImage: "https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_70,w_2640,h_1485/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ReutersImages/mmsport/inside_the_phillies/01m5fmjg123h553m3bc3.jpg",
        history: [
            { heading: "Una de las franquicias más antiguas", text: "Los Phillies se fundaron en 1883 y son la franquicia de una sola ciudad más antigua de la Liga Nacional. Durante décadas construyeron su identidad alrededor de la afición de Filadelfia y de grandes figuras defensivas y ofensivas." },
            { heading: "Schmidt, Carlton y 1980", text: "Mike Schmidt y Steve Carlton lideraron al equipo de 1980 que ganó la primera Serie Mundial en la historia de la franquicia. Schmidt combinó poder y defensa en tercera base, mientras Carlton se convirtió en uno de los zurdos más dominantes de su generación." },
            { heading: "La era de los campeones de 2008", text: "Con Chase Utley, Jimmy Rollins, Ryan Howard y Cole Hamels, los Phillies ganaron el título de 2008. El equipo volvió a la Serie Mundial en 2009 y consolidó una de las épocas más exitosas del béisbol de Filadelfia." }
        ]
    }
];