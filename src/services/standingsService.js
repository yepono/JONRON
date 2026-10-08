// src/services/standingsService.js

// IDs oficiales exclusivos de las 3 divisiones de la Liga Americana (leagueId=103)
const AL_DIVISIONS = {
    201: 'AL Este',
    202: 'AL Central',
    200: 'AL Oeste',
};

// Generador de veredictos tácticos del Coach según estadísticas reales
function generateCoachNotes(name, winPct, runsScored, runsAllowed, streak) {
    const isWinning = streak.includes('W');
    const streakCount = parseInt(streak.replace(/\D/g, ''), 10) || 1;
    const runDiff = runsScored - runsAllowed;

    if (runDiff > 70 && winPct > 0.54) {
        return `Equipo contendiente de la Liga Americana con diferencial élite (+${runDiff}). Control total en entradas intermedias y bullpen sólido. Su enfoque es mantener la consistencia en el montículo.`;
    }
    if (runDiff < -30) {
        return `Alerta defensiva: Han permitido ${runsAllowed} carreras. El cuerpo técnico necesita ajustar la rotación de abridores y priorizar turnos de contacto para evitar desventajas tempranas.`;
    }
    if (isWinning && streakCount >= 3) {
        return `Racha activa de ${streakCount} victorias seguidas en la AL. El timing del lineup está en su punto óptimo; se sugiere presionar en los senderos y forzar jugadas agresivas.`;
    }
    return `Rendimiento equilibrado en la división. La clave técnica radica en elevar la tasa de bateo oportuno con corredores en posición de anotar durante los innings 5 al 7.`;
}

// 1. Obtener posiciones y métricas de los 15 equipos de la Liga Americana (leagueId=103)
export const getLiveStandings = async () => {
    try {
        const currentYear = new Date().getFullYear();
        let res = await fetch(
            `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=${currentYear}&hydrate=team`
        );
        let data = await res.json();

        if (!data.records || data.records.length === 0) {
            res = await fetch(
                `https://statsapi.mlb.com/api/v1/standings?leagueId=103&season=${currentYear - 1}&hydrate=team`
            );
            data = await res.json();
        }

        const alDivisions = [];

        (data.records || []).forEach((divisionRecord) => {
            const divisionId = divisionRecord.division?.id;

            // FILTRO ESTRICTO: Descarta cualquier división que no sea 201, 202 o 200 (Liga Americana)
            if (!AL_DIVISIONS[divisionId]) return;

            const divisionName = AL_DIVISIONS[divisionId];

            const teams = (divisionRecord.teamRecords || []).map((item) => {
                const rs = item.runsScored || 0;
                const ra = item.runsAllowed || 0;
                const winPct = parseFloat(item.winningPercentage || '0.500');
                const streak = item.streak?.streakCode || '1W';

                const potencia = Math.min(98, Math.max(30, Math.round((rs / 850) * 100)));
                const pitcheo = Math.min(98, Math.max(30, Math.round((1 - ra / 900) * 100)));
                const contacto = Math.min(95, Math.max(35, Math.round(40 + winPct * 55)));
                const defensa = Math.min(95, Math.max(35, Math.round(50 + (item.wins / 162) * 50)));
                const velocidad = Math.min(92, Math.max(40, Math.round(55 + (rs % 35))));

                return {
                    id: item.team.id,
                    name: item.team.name,
                    short: item.team.teamName || item.team.name,
                    logoId: item.team.id,
                    division: divisionName,
                    wins: item.wins,
                    losses: item.losses,
                    pct: item.winningPercentage,
                    diff: item.runDifferential > 0 ? `+${item.runDifferential}` : `${item.runDifferential}`,
                    streak,
                    runsScored: rs,
                    runsAllowed: ra,
                    coachMetrics: { contacto, potencia, pitcheo, defensa, velocidad },
                    scouting: {
                        era: (3.1 + (ra / (rs || 1)) * 0.9).toFixed(2),
                        avg: (.230 + (rs / 10000)).toFixed(3),
                        homeRuns: Math.round(rs * 0.26),
                        stolenBases: Math.round(rs * 0.11),
                    },
                    coachNote: generateCoachNotes(item.team.name, winPct, rs, ra, streak),
                };
            });

            alDivisions.push({ divisionId, divisionName, teams });
        });

        // Ordenar de forma fija: AL Este, AL Central, AL Oeste
        return alDivisions.sort((a, b) => {
            const order = { 201: 1, 202: 2, 200: 3 };
            return (order[a.divisionId] || 99) - (order[b.divisionId] || 99);
        });
    } catch (error) {
        console.error('Error al conectar con Standings de la AL:', error);
        return [];
    }
};

// 2. Bracket de Postemporada exclusivo para la Liga Americana (ALDS y ALCS)
export const getLivePostseasonBracket = async () => {
    try {
        const currentYear = new Date().getFullYear();
        let res = await fetch(
            `https://statsapi.mlb.com/api/v1/schedule/postseason?sportId=1&season=${currentYear}&hydrate=team,linescore`
        );
        let data = await res.json();

        if (!data.dates || data.dates.length === 0) {
            res = await fetch(
                `https://statsapi.mlb.com/api/v1/schedule/postseason?sportId=1&season=${currentYear - 1}&hydrate=team,linescore`
            );
            data = await res.json();
        }

        const seriesMap = new Map();

        (data.dates || []).forEach((d) => {
            d.games?.forEach((g) => {
                const awayLeague = g.teams?.away?.team?.league?.id;
                const homeLeague = g.teams?.home?.team?.league?.id;
                const desc = g.seriesDescription || '';

                // Filtro estricto: Solo series de la Liga Americana (AL)
                const isAL = desc.includes('AL') || awayLeague === 103 || homeLeague === 103;
                if (!isAL || g.gameType === 'W') return;

                const sId = g.seriesId || `${g.gameType}-${g.teams?.away?.team?.id}-${g.teams?.home?.team?.id}`;
                const away = g.teams?.away;
                const home = g.teams?.home;

                const isGameFinal = g.status?.abstractGameState === 'Final';
                const awayWon = isGameFinal && away?.isWinner === true;
                const homeWon = isGameFinal && home?.isWinner === true;

                const formatMax = g.gameType === 'F' ? 3 : g.gameType === 'D' ? 5 : 7;
                const winsToClinch = Math.ceil(formatMax / 2);

                if (!seriesMap.has(sId)) {
                    seriesMap.set(sId, {
                        id: sId,
                        gameType: g.gameType,
                        roundName: desc || 'Serie AL',
                        formatText: `Al mejor de ${formatMax} (Primero a ${winsToClinch})`,
                        winsToClinch,
                        isFinished: false,
                        team1: {
                            id: away?.team?.id,
                            name: away?.team?.name || 'TBD',
                            short: away?.team?.teamName || away?.team?.name || 'TBD',
                            wins: awayWon ? 1 : 0,
                        },
                        team2: {
                            id: home?.team?.id,
                            name: home?.team?.name || 'TBD',
                            short: home?.team?.teamName || home?.team?.name || 'TBD',
                            wins: homeWon ? 1 : 0,
                        }
                    });
                } else {
                    const s = seriesMap.get(sId);
                    if (awayWon) s.team1.wins += 1;
                    if (homeWon) s.team2.wins += 1;
                    if (s.team1.wins >= winsToClinch || s.team2.wins >= winsToClinch || g.seriesStatus?.isOver) {
                        s.isFinished = true;
                    }
                }
            });
        });

        const alSeries = Array.from(seriesMap.values());

        return {
            alWildCard: alSeries.filter((s) => s.gameType === 'F').slice(0, 2),
            alDivisional: alSeries.filter((s) => s.gameType === 'D').slice(0, 2),
            alChampionship: alSeries.find((s) => s.gameType === 'L') || {
                id: 'alcs-pending',
                roundName: 'Serie de Campeonato AL (ALCS)',
                formatText: 'Al mejor de 7 (Primero a 4)',
                winsToClinch: 4,
                isFinished: false,
                team1: { id: null, name: 'Finalista AL 1', short: 'Finalista 1', wins: 0 },
                team2: { id: null, name: 'Finalista AL 2', short: 'Finalista 2', wins: 0 },
            },
        };
    } catch (error) {
        console.error('Error al procesar bracket de la AL:', error);
        return { alWildCard: [], alDivisional: [], alChampionship: null };
    }
};

// 3. Historial de juegos por equipo con entradas extras y balance de los últimos 10
export const getTeamSeasonGames = async (teamId) => {
    try {
        const currentYear = new Date().getFullYear();
        let res = await fetch(
            `https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=${currentYear}&teamId=${teamId}&hydrate=team,linescore`
        );
        let data = await res.json();

        if (!data.dates || data.dates.length === 0) {
            res = await fetch(
                `https://statsapi.mlb.com/api/v1/schedule?sportId=1&season=${currentYear - 1}&teamId=${teamId}&hydrate=team,linescore`
            );
            data = await res.json();
        }

        const games = [];
        (data.dates || []).forEach((d) => {
            d.games?.forEach((g) => {
                if (g.status?.abstractGameState === 'Final') {
                    const isHome = g.teams.home.team.id === teamId;
                    const myTeam = isHome ? g.teams.home : g.teams.away;
                    const oppTeam = isHome ? g.teams.away : g.teams.home;
                    const myScore = myTeam.score ?? g.linescore?.teams?.[isHome ? 'home' : 'away']?.runs ?? 0;
                    const oppScore = oppTeam.score ?? g.linescore?.teams?.[isHome ? 'away' : 'home']?.runs ?? 0;

                    const innings = g.linescore?.currentInning || 9;
                    const inningLabel = innings > 9 ? `F/${innings}` : 'Final';

                    games.push({
                        id: g.gamePk,
                        date: d.date,
                        opponentName: oppTeam.team.teamName || oppTeam.team.name,
                        opponentLogoId: oppTeam.team.id,
                        score: `${myScore} - ${oppScore}`,
                        inningLabel,
                        isHome,
                        won: myTeam.isWinner === true || myScore > oppScore,
                    });
                }
            });
        });

        const recentGames = games.reverse().slice(0, 15);
        const last10 = recentGames.slice(0, 10);
        const winsL10 = last10.filter((g) => g.won).length;
        const lossesL10 = last10.length - winsL10;

        return {
            games: recentGames,
            recordL10: `${winsL10}-${lossesL10}`,
        };
    } catch (error) {
        console.error('Error obteniendo historial de partidos:', error);
        return { games: [], recordL10: '0-0' };
    }
};