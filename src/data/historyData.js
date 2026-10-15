// src/data/historyData.js

export const BASEBALL_HISTORY = {
    title: "Historia del Béisbol",
    subtitle: "De los campos de arena al pasatiempo de América",
    coverImage: "https://images.unsplash.com/photo-1508344928928-7137b67de192?auto=format&fit=crop&w=800&q=80",
    sections: [
        {
            heading: "Los Orígenes y el Mito",
            text: "Aunque el mito popular cuenta que Abner Doubleday inventó el béisbol en Cooperstown en 1839, los historiadores coinciden en que el deporte evolucionó a partir de juegos de bate y pelota más antiguos, como el 'rounders' británico y el 'town ball'. Fue Alexander Cartwright y los Knickerbockers de Nueva York quienes en 1845 formalizaron las primeras reglas modernas, estableciendo el diamante, las tres bases y el concepto de los outs.",
        },
        {
            heading: "La Profesionalización",
            text: "En 1869, los Cincinnati Red Stockings se convirtieron en el primer equipo completamente profesional, viajando por todo el país sin perder un solo juego ese año. Esto impulsó la creación de la Liga Nacional (NL) en 1876. Años más tarde, en 1901, Ban Johnson fundó la Liga Americana (AL) como una liga mayor rival, lo que culminó en la creación de la primera Serie Mundial en 1903 entre los campeones de ambas ligas.",
            image: "https://images.unsplash.com/photo-1541534407335-5134db1b4ee3?auto=format&fit=crop&w=800&q=80"
        },
        {
            heading: "La Era de la Bola Viva y la Integración",
            text: "La década de 1920 cambió el juego para siempre con la llegada de Babe Ruth, quien popularizó el jonrón y terminó con la 'Era de la Bola Muerta'. Sin embargo, el momento más transformador llegó el 15 de abril de 1947, cuando Jackie Robinson rompió la barrera del color al debutar con los Brooklyn Dodgers, allanando el camino para generaciones de talento diverso y cambiando la historia de los derechos civiles en el deporte.",
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
        coverImage: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1511516016186-b4d53ed4b01e?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1543886518-e325603b5168?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1560935105-cd6a3e590af0?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1508802913136-2367524450fa?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1541534407335-5134db1b4ee3?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1516731415730-0c607149933a?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1582845450892-95f7cba7bc1c?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1508344928928-7137b67de192?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1541534407335-5134db1b4ee3?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80",
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
        coverImage: "https://images.unsplash.com/photo-1560935105-cd6a3e590af0?auto=format&fit=crop&w=800&q=80",
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
    }
];