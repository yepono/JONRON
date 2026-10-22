import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, ShieldAlert, Trophy, ArrowRight, Zap, ChevronDown, BarChart2, Coins, Dices, BookOpen, Target, CheckCircle2, Gauge, Crosshair, Flame } from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '../services/authService';
import teamCardImages from '../data/juegoEquipos.json';

const teamImageAssets = import.meta.glob('../assets/juego/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// --- FRANQUICIAS DISPONIBLES ---
const GAME_TEAMS = [
  { id: 'al1', name: 'New York Yankees', logoId: 147, color: 'from-slate-700 to-slate-900', basePower: 92 },
  { id: 'al2', name: 'Boston Red Sox', logoId: 111, color: 'from-red-700 to-red-900', basePower: 88 },
  { id: 'al3', name: 'Toronto Blue Jays', logoId: 141, color: 'from-blue-600 to-blue-800', basePower: 86 },
  { id: 'al4', name: 'Baltimore Orioles', logoId: 110, color: 'from-orange-500 to-orange-800', basePower: 90 },
  { id: 'al5', name: 'Tampa Bay Rays', logoId: 139, color: 'from-cyan-700 to-cyan-900', basePower: 87 },
  { id: 'al6', name: 'Cleveland Guardians', logoId: 114, color: 'from-red-800 to-slate-900', basePower: 85 },
  { id: 'al7', name: 'Chicago White Sox', logoId: 145, color: 'from-zinc-700 to-black', basePower: 80 },
  { id: 'al8', name: 'Detroit Tigers', logoId: 116, color: 'from-orange-600 to-slate-800', basePower: 83 },
  { id: 'al9', name: 'Kansas City Royals', logoId: 118, color: 'from-blue-500 to-blue-800', basePower: 86 },
  { id: 'nl1', name: 'Colorado Rockies', logoId: 115, color: 'from-purple-800 to-slate-950', basePower: 78 },
  { id: 'al10', name: 'Minnesota Twins', logoId: 142, color: 'from-red-600 to-blue-900', basePower: 87 },
  { id: 'al11', name: 'Houston Astros', logoId: 117, color: 'from-orange-600 to-blue-900', basePower: 91 },
  { id: 'al12', name: 'Texas Rangers', logoId: 140, color: 'from-blue-600 to-red-800', basePower: 89 },
  { id: 'al13', name: 'Seattle Mariners', logoId: 136, color: 'from-teal-600 to-blue-900', basePower: 88 },
  { id: 'al14', name: 'Los Angeles Angels', logoId: 108, color: 'from-red-500 to-red-800', basePower: 84 },
  { id: 'al15', name: 'Oakland Athletics', logoId: 133, color: 'from-emerald-600 to-yellow-600', basePower: 79 },
];

const getTeamStats = (team) => ({
  attack: Math.min(99, team.basePower + 2),
  defense: Math.max(70, team.basePower - 2),
  bullpen: Math.max(70, team.basePower - 1),
});

const getStrategyHint = (opponentCard, roster) => {
  if (!opponentCard) return 'Observa al rival y guarda tus cartas Diamante para un turno decisivo.';
  const availableCards = roster.filter((card) => card.role === (opponentCard.role === 'Bateador' ? 'Lanzador' : 'Bateador'));
  const bestCard = availableCards[0];
  if (!bestCard) return `Necesitas un ${opponentCard.role === 'Bateador' ? 'Lanzador' : 'Bateador'} para responder a esta jugada.`;
  if (bestCard.power >= opponentCard.power + 5) return `Ventaja clara: ${bestCard.name} supera la base rival. Úsala para buscar la carrera.`;
  if (bestCard.rarity === 'Diamante') return 'Turno de alto riesgo: una carta Diamante aumenta el dado, pero quizá convenga reservarla.';
  if (bestCard.power < opponentCard.power) return 'El rival parte arriba. Busca una carta con mayor poder o acepta guardar tus mejores recursos.';
  return `Turno parejo: ${bestCard.name} puede competir y conserva tus cartas Diamante para después.`;
};

// --- GENERADOR DINÁMICO DE ROSTERS ---
const generateRoster = (team, isUser = false) => {
  const roles = [
    { role: 'Bateador', count: 9, stat1: 'AVG', stat2: 'HR' },
    { role: 'Lanzador', count: 9, stat1: 'ERA', stat2: 'SO' }
  ];
  let roster = [];
  const managerBuff = isUser ? 5 : -2;

  roles.forEach(r => {
    for (let i = 0; i < r.count; i++) {
      const variance = Math.floor(Math.random() * 8) - 3;
      const power = Math.min(99, Math.max(70, team.basePower + variance + managerBuff));
      const rarity = power >= 92 ? 'Diamante' : power >= 86 ? 'Oro' : 'Plata';
      const imageFiles = teamCardImages[team.name]?.[r.role] ?? [];
      const imageFile = imageFiles[Math.floor(Math.random() * imageFiles.length)];
      const imagePath = imageFile
        ? `../assets/juego/${team.name.toLowerCase()}/${imageFile}`
        : null;
      
      roster.push({
        id: `${team.id}-${r.role}-${i}`,
        name: `Jugador ${r.role} ${i+1}`,
        team: team.name,
        role: r.role,
        power,
        rarity,
        color: team.color,
        image: imagePath ? (teamImageAssets[imagePath] || `https://www.mlbstatic.com/team-logos/${team.logoId}.svg`) : `https://www.mlbstatic.com/team-logos/${team.logoId}.svg`,
        logo: `https://www.mlbstatic.com/team-logos/${team.logoId}.svg`,
        stats: { 
          [r.stat1]: power > 90 ? (r.role === 'Bateador' ? '.310' : '2.50') : (r.role === 'Bateador' ? '.260' : '3.80'), 
          [r.stat2]: Math.floor(power * (r.role === 'Bateador' ? 0.35 : 1.8)) 
        }
      });
    }
  });
  return roster.sort((a, b) => b.power - a.power);
};

// --- SIMULADOR DE DADOS DE RENDIMIENTO (RNG) ---
const rollDice = (rarity) => {
  if (rarity === 'Diamante') return Math.floor(Math.random() * 21) + 5; // 5 a 25
  if (rarity === 'Oro') return Math.floor(Math.random() * 20) + 1;      // 1 a 20
  return Math.floor(Math.random() * 15) + 1;                            // 1 a 15
};

const drawOpponentCard = (deck) => {
  const index = Math.floor(Math.random() * deck.length);
  return { card: deck[index], remainingDeck: deck.filter((_, cardIndex) => cardIndex !== index) };
};

// --- COMPONENTE CARTA ---
const BaseballCard = ({ card, onPlay, isPlayable = true, compact = false, scale = 1 }) => {
  const handleKeyDown = (event) => {
    if (isPlayable && onPlay && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onPlay(card);
    }
  };

  return (
    <motion.div 
      whileHover={isPlayable ? { scale: 1.02 } : {}}
      whileTap={isPlayable ? { scale: 0.98 } : {}}
      role={isPlayable ? 'button' : undefined}
      tabIndex={isPlayable ? 0 : undefined}
      aria-label={isPlayable ? `Jugar carta ${card.name}, poder ${card.power}` : card.name}
      onKeyDown={handleKeyDown}
      style={compact ? { width: `${8.5 * scale}rem`, height: `${11.5 * scale}rem` } : undefined}
      className={`relative ${compact ? '' : 'w-[min(78vw,12rem)] h-[min(104vw,18rem)]'} shrink-0 rounded-2xl overflow-hidden border-2 ${isPlayable ? 'border-slate-500 cursor-pointer shadow-lg hover:border-amber-400 focus-visible:border-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400' : 'border-rose-500 shadow-rose-500/30'} bg-slate-900`}
      onClick={() => isPlayable && onPlay && onPlay(card)}
    >
      <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-70 z-10`} />
      {card.image && <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-luminosity" />}
      
      <div className={`relative z-20 ${compact ? 'p-2' : 'p-3'} h-full flex flex-col justify-between`}>
        {/* Cabecera (Poder y Rareza) */}
        <div className="flex justify-between items-start">
          <div className={`${compact ? 'w-9 h-9 text-sm' : 'w-12 h-12 text-xl'} rounded-full bg-slate-900 border-2 ${isPlayable ? 'border-amber-400' : 'border-rose-500'} flex items-center justify-center font-black text-white shadow-xl`}>
            {card.power}
          </div>
          <div className="flex items-center gap-1">
            <img src={card.logo} alt="" className="h-6 w-6 rounded-full bg-white p-1" />
            <span className="bg-black/80 px-1.5 py-1 rounded text-[8px] font-black text-amber-400 uppercase tracking-widest border border-white/10">
              {card.rarity}
            </span>
          </div>
        </div>
        
        {/* Pie de Carta (Nombre y Estadísticas) */}
        <div className={`${compact ? 'p-2 rounded-lg' : 'p-3 rounded-xl'} bg-slate-950/90 border border-white/10 w-full shadow-2xl`}>
          <span className={`text-[9px] block font-bold uppercase tracking-wider mb-1 ${isPlayable ? 'text-amber-400' : 'text-rose-400'}`}>{card.role}</span>
          <span className={`${compact ? 'text-[10px]' : 'text-sm'} font-black text-white truncate block mb-2`}>{card.name}</span>
          
          <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-2">
            {Object.entries(card.stats).map(([key, val]) => (
              <div key={key} className="text-center bg-black/50 rounded p-1">
                <span className="text-[8px] text-slate-400 block">{key}</span>
                <span className="text-xs font-mono font-bold text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Juego() {
  const combatTimerRef = useRef(null);
  const selectionTimerRef = useRef(null);
  const [user, setUser] = useState(() => getCurrentUser());
  const [gameState, setGameState] = useState('menu'); 
  const [showOnboarding, setShowOnboarding] = useState(() => localStorage.getItem('jonron-cards-onboarding') !== 'seen');
  const [selectionAnimation, setSelectionAnimation] = useState(null);
  
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  
  const [userRoster, setUserRoster] = useState([]);
  const [oppRoster, setOppRoster] = useState([]);
  
  const [requiredRole, setRequiredRole] = useState('Bateador');
  const [filterRole, setFilterRole] = useState('Todos');
  const [strategyHint, setStrategyHint] = useState('Elige tu respuesta observando el rol, el poder y la rareza.');
  const [handScale, setHandScale] = useState(1);

  const [currentInning, setCurrentInning] = useState(1);
  const [userRuns, setUserRuns] = useState(0);
  const [oppRuns, setOppRuns] = useState(0);
  
  const [currentOppCard, setCurrentOppCard] = useState(null);
  const [playedCard, setPlayedCard] = useState(null);
  
  // Variables matemáticas del combate actual para mostrarlas en el resultado
  const [battleMath, setBattleMath] = useState(null);
  const [roundWinner, setRoundWinner] = useState(null);
  
  const [gameStats, setGameStats] = useState({
    userBatPwr: 0, userPitPwr: 0,
    oppBatPwr: 0, oppPitPwr: 0,
    userBatCards: 0, userPitCards: 0,
    oppBatCards: 0, oppPitCards: 0,
  });

  useEffect(() => () => {
    window.clearTimeout(combatTimerRef.current);
    window.clearTimeout(selectionTimerRef.current);
  }, []);

  const closeOnboarding = () => {
    localStorage.setItem('jonron-cards-onboarding', 'seen');
    setShowOnboarding(false);
  };

  const handleStartGame = () => {
    if (!user) return alert('Inicia sesión para jugar.');
    setGameState('opp_select');
  };

  const selectOpponent = (team) => {
    setSelectedOpponent(team);
    setOppRoster(generateRoster(team, false));
    setSelectionAnimation({ team, nextState: 'team_select', label: 'Rival encontrado' });
    selectionTimerRef.current = window.setTimeout(() => {
      setSelectionAnimation(null);
      setGameState('team_select');
    }, 1400);
  };

  const selectUserTeam = (team) => {
    const newUserRoster = generateRoster(team, true);
    const newOppRoster = [...oppRoster];
    setSelectionAnimation({ team, nextState: 'play_inning', label: 'Equipo seleccionado' });
    selectionTimerRef.current = window.setTimeout(() => {
      setSelectionAnimation(null);
      setUserTeam(team);
      setUserRoster(newUserRoster);
      setCurrentInning(1);
      setUserRuns(0);
      setOppRuns(0);
      setGameStats({
        userBatPwr: 0, userPitPwr: 0,
        oppBatPwr: 0, oppPitPwr: 0,
        userBatCards: 0, userPitCards: 0,
        oppBatCards: 0, oppPitCards: 0,
      });
      startInning(newUserRoster, newOppRoster);
    }, 1400);
  };

  const startInning = (uRoster, oRoster) => {
    const currentOppDeck = oRoster.length > 0 ? oRoster : generateRoster(selectedOpponent, false);
    const { card: randomOppCard, remainingDeck } = drawOpponentCard(currentOppDeck);

    const roleNeeded = randomOppCard.role === 'Bateador' ? 'Lanzador' : 'Bateador';
    
    setCurrentOppCard(randomOppCard);
    setRequiredRole(roleNeeded);
    setFilterRole(roleNeeded); 
    
    setUserRoster(uRoster);
    setOppRoster(remainingDeck);
    setPlayedCard(null);
    setRoundWinner(null);
    setBattleMath(null);
    setStrategyHint(getStrategyHint(randomOppCard, uRoster));
    setGameState('play_inning');
  };

  const playUserCard = (card) => {
    if (card.role !== requiredRole || gameState !== 'play_inning') return;
    setUserRoster((roster) => roster.filter((availableCard) => availableCard.id !== card.id));
    setPlayedCard(card);
    setGameState('round_anim');

    combatTimerRef.current = window.setTimeout(() => {
      // Combate Estilo Pokémon (Base + RNG)
      const userRoll = rollDice(card.rarity);
      const oppRoll = rollDice(currentOppCard.rarity);
      
      const userTotal = card.power + userRoll;
      const oppTotal = currentOppCard.power + oppRoll;
      const result = userTotal > oppTotal ? 'user' : userTotal < oppTotal ? 'opp' : 'draw';

      setBattleMath({ userBase: card.power, userRoll, userTotal, oppBase: currentOppCard.power, oppRoll, oppTotal });
      setRoundWinner(result);

      if (result === 'user') setUserRuns((runs) => runs + 1);
      if (result === 'opp') setOppRuns((runs) => runs + 1);
      
      setGameStats(prev => {
        const isUserBatter = card.role === 'Bateador';
        const isOppBatter = currentOppCard.role === 'Bateador';
        return {
          ...prev,
          userBatPwr: prev.userBatPwr + (isUserBatter ? userTotal : 0),
          userPitPwr: prev.userPitPwr + (!isUserBatter ? userTotal : 0),
          oppBatPwr: prev.oppBatPwr + (isOppBatter ? oppTotal : 0),
          oppPitPwr: prev.oppPitPwr + (!isOppBatter ? oppTotal : 0),
          userBatCards: prev.userBatCards + (isUserBatter ? 1 : 0),
          userPitCards: prev.userPitCards + (!isUserBatter ? 1 : 0),
          oppBatCards: prev.oppBatCards + (isOppBatter ? 1 : 0),
          oppPitCards: prev.oppPitCards + (!isOppBatter ? 1 : 0),
        };
      });
      
      setGameState('round_result');
    }, 2500); 
  };

  const nextInning = () => {
    const newRoster = userRoster;

    if (currentInning < 9) {
      setCurrentInning(i => i + 1);
      startInning(newRoster, oppRoster);
    } else {
      finishMatch();
    }
  };

  const finishMatch = () => {
    setGameState('match_result');
    if (userRuns > oppRuns) {
      const updatedUser = updateUserProfile({ points: (user?.points || 0) + 100 });
      setUser(updatedUser);
    }
  };

  const resetGame = () => {
    setGameState('menu');
  };

  const filteredRoster = userRoster.filter((card) =>
    card.role === requiredRole && (filterRole === 'Todos' || card.role === filterRole),
  );

  return (
    <div className="min-h-full bg-[#080E1E] text-white pb-6 relative">
      <div className="bg-[#0047AB] px-4 py-3 shadow-lg flex justify-between items-center relative z-20">
        <div>
          <h1 className="text-lg font-black tracking-widest uppercase">Cards Battle</h1>
          <span className="text-[10px] text-blue-200">Coach Mode (9 Innings)</span>
        </div>
        <div className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full flex items-center gap-1.5 font-bold shadow-md text-xs">
          <Coins size={14} /> {user?.points?.toLocaleString() || 0} pts
        </div>
      </div>

      <AnimatePresence>
        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/80 p-4 backdrop-blur-sm sm:items-center"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md rounded-3xl border border-amber-400/40 bg-slate-900 p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-amber-400 p-3 text-slate-950"><BookOpen size={22} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Primera jugada</p>
                  <h2 className="text-2xl font-black uppercase">Cómo jugar</h2>
                </div>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex gap-3"><Target className="shrink-0 text-emerald-400" size={20} /><p>Elige un rival y después tu franquicia.</p></div>
                <div className="flex gap-3"><Dices className="shrink-0 text-amber-400" size={20} /><p>En cada inning, usa una carta del rol contrario al rival para sumar tu poder más un dado.</p></div>
                <div className="flex gap-3"><CheckCircle2 className="shrink-0 text-blue-400" size={20} /><p>Cada carta usada se retira de tu mano y no puede volver a jugarse.</p></div>
              </div>
              <button onClick={closeOnboarding} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-black text-slate-950 shadow-xl">
                Entendido <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        {selectionAnimation && (
          <motion.div
            key="selection-animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-slate-950/95 px-6 text-center backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
              className={`mb-6 rounded-[2rem] bg-gradient-to-br ${selectionAnimation.team.color} p-8 shadow-2xl shadow-blue-950/50`}
            >
              <img src={`https://www.mlbstatic.com/team-logos/${selectionAnimation.team.logoId}.svg`} alt="" className="h-28 w-28 rounded-full bg-white p-3 sm:h-36 sm:w-36" />
            </motion.div>
            <motion.p initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }} className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
              {selectionAnimation.label}
            </motion.p>
            <motion.h2 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }} className="mt-2 text-3xl font-black uppercase sm:text-4xl">
              {selectionAnimation.team.name}
            </motion.h2>
            <div className="mt-8 flex gap-1.5">
              {[0, 1, 2].map((dot) => <motion.span key={dot} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ repeat: Infinity, delay: dot * 0.18, duration: 0.8 }} className="h-2 w-2 rounded-full bg-amber-400" />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        
        {gameState === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 flex flex-col items-center justify-center h-[70vh] space-y-8">
            <Swords size={80} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black uppercase">Juego de Cartas</h2>
              <p className="text-xs text-slate-400 max-w-[280px] mx-auto">Juego táctico de 9 entradas. Tus cartas suman un dado de rendimiento según su rareza. ¡Gana el partido para llevarte 100 Puntos Jonrón!</p>
            </div>
            <button onClick={handleStartGame} className="bg-white text-slate-900 font-black text-base px-10 py-4 rounded-2xl shadow-xl flex items-center gap-2">
              Buscar Rival <ArrowRight size={18} />
            </button>
          </motion.div>
        )}

        {gameState === 'opp_select' && (
          <motion.div key="opp_select" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="p-4 flex flex-col h-[80vh]">
            <h2 className="text-center text-sm font-black text-rose-500 uppercase tracking-widest mt-2 mb-4">Selecciona una Franquicia Rival</h2>
            <div className="flex flex-col gap-3 overflow-y-auto pb-4 scrollbar-none">
              {GAME_TEAMS.map((team, index) => {
                const stats = getTeamStats(team);
                return <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} whileTap={{ scale: 0.98 }} key={team.id} onClick={() => selectOpponent(team)} className={`bg-gradient-to-r ${team.color} border border-white/10 p-4 rounded-2xl cursor-pointer shadow-lg`}>
                  <div className="flex items-center gap-4">
                    <img src={`https://www.mlbstatic.com/team-logos/${team.logoId}.svg`} alt="" className="w-10 h-10 bg-white rounded-full p-1" />
                    <div><span className="font-black text-base">{team.name}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-white/60">Rival · PWR {team.basePower}</span></div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/15 pt-3 text-center">
                    <div><Crosshair size={13} className="mx-auto mb-1 text-rose-200" /><span className="block text-[9px] text-white/60">Ataque</span><strong className="text-sm">{stats.attack}</strong></div>
                    <div><ShieldAlert size={13} className="mx-auto mb-1 text-rose-200" /><span className="block text-[9px] text-white/60">Defensa</span><strong className="text-sm">{stats.defense}</strong></div>
                    <div><Gauge size={13} className="mx-auto mb-1 text-rose-200" /><span className="block text-[9px] text-white/60">Bullpen</span><strong className="text-sm">{stats.bullpen}</strong></div>
                  </div>
                </motion.div>;
              })}
            </div>
          </motion.div>
        )}

        {gameState === 'team_select' && (
          <motion.div key="team_select" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="p-4 flex flex-col h-[80vh]">
            <h2 className="text-center text-sm font-black text-emerald-400 uppercase tracking-widest mt-2 mb-4">¿Con qué equipo jugarás?</h2>
            <div className="flex flex-col gap-3 overflow-y-auto pb-4 scrollbar-none">
              {GAME_TEAMS.filter(t => t.id !== selectedOpponent.id).map((team, index) => {
                const stats = getTeamStats(team);
                return <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} whileTap={{ scale: 0.98 }} key={team.id} onClick={() => selectUserTeam(team)} className={`bg-gradient-to-r ${team.color} border border-white/10 p-4 rounded-2xl cursor-pointer shadow-lg`}>
                  <div className="flex items-center gap-4">
                    <img src={`https://www.mlbstatic.com/team-logos/${team.logoId}.svg`} alt="" className="w-10 h-10 bg-white rounded-full p-1" />
                    <div><span className="font-black text-base">{team.name}</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-white/60">Tu equipo · PWR {team.basePower}</span></div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/15 pt-3 text-center">
                    <div><Crosshair size={13} className="mx-auto mb-1 text-emerald-200" /><span className="block text-[9px] text-white/60">Ataque</span><strong className="text-sm">{stats.attack}</strong></div>
                    <div><ShieldAlert size={13} className="mx-auto mb-1 text-emerald-200" /><span className="block text-[9px] text-white/60">Defensa</span><strong className="text-sm">{stats.defense}</strong></div>
                    <div><Gauge size={13} className="mx-auto mb-1 text-emerald-200" /><span className="block text-[9px] text-white/60">Bullpen</span><strong className="text-sm">{stats.bullpen}</strong></div>
                  </div>
                </motion.div>;
              })}
            </div>
          </motion.div>
        )}

        {gameState === 'play_inning' && (
          <motion.div key="play_inning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full absolute inset-0 pt-16">
            
            <div className="bg-slate-950 border-b-4 border-slate-800 p-4 flex flex-col z-10 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-amber-500 font-mono font-bold tracking-widest text-xs">INNING {currentInning} <span className="text-slate-500">/ 9</span></span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 border-2 border-slate-600 rotate-45"></div>
                  <div className="w-3 h-3 border-2 border-slate-600 rotate-45"></div>
                  <div className="w-3 h-3 border-2 border-slate-600 rotate-45"></div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-slate-900 rounded-lg p-2 border border-slate-800">
                <div className="flex items-center gap-3 w-2/5">
                  <span className="font-mono text-xl font-black text-emerald-400 w-8 text-center">{userRuns}</span>
                  <span className="text-[10px] font-bold text-slate-300 uppercase truncate">{userTeam.name}</span>
                </div>
                <div className="w-px h-8 bg-slate-700"></div>
                <div className="flex items-center gap-3 w-2/5 justify-end">
                  <span className="text-[10px] font-bold text-slate-300 uppercase truncate">{selectedOpponent.name}</span>
                  <span className="font-mono text-xl font-black text-rose-500 w-8 text-center">{oppRuns}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-[#080E1E] overflow-hidden">
              <div className="flex flex-col items-center justify-center p-4">
                <span className="text-rose-400 font-bold text-[10px] uppercase mb-2 flex items-center gap-1"><ShieldAlert size={12}/> Jugada del Rival</span>
                {currentOppCard && (
                   <BaseballCard card={currentOppCard} isPlayable={false} compact />
                )}
                <div className="mt-3 bg-rose-950/60 border border-rose-500/50 px-4 py-1.5 rounded-full">
                   <span className="text-[11px] text-white">Debes superar su poder base de <strong className="text-rose-400 text-sm">{currentOppCard?.power}</strong></span>
                </div>

              </div>

              <div className="flex-1 flex flex-col bg-slate-900/80 rounded-t-3xl border-t border-slate-700 relative overflow-hidden">
                <div className="border-b border-slate-800 bg-slate-900 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                      Tu turno: Elige un {requiredRole}
                    </span>
                    <div className="relative shrink-0">
                      <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        aria-label="Filtrar cartas por rol"
                        className="appearance-none rounded border border-slate-600 bg-slate-800 px-2 py-1 pr-6 text-[10px] font-bold outline-none"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Bateador">Bateadores</option>
                        <option value="Lanzador">Pitchers</option>
                      </select>
                      <ChevronDown size={12} className="pointer-events-none absolute right-1.5 top-1.5 text-slate-400" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Cartas</span>
                    <input
                      type="range"
                      min="0.78"
                      max="1.18"
                      step="0.02"
                      value={handScale}
                      onChange={(event) => setHandScale(Number(event.target.value))}
                      aria-label="Cambiar tamaño de las cartas"
                      className="h-1.5 min-w-0 flex-1 cursor-pointer accent-amber-400"
                    />
                    <span className="w-10 text-right text-[9px] font-bold text-amber-400">{Math.round(handScale * 100)}%</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-none px-3 pb-32 pt-4">
                  <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 scrollbar-none">
                    {filteredRoster.map((card) => (
                      <div key={card.id} className="snap-center">
                        <BaseballCard card={card} isPlayable onPlay={playUserCard} compact scale={handScale} />
                      </div>
                    ))}
                  </div>
                  {filteredRoster.length === 0 && (
                    <div className="text-center text-slate-500 text-xs py-10">No tienes jugadores disponibles en esta posición.</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'round_anim' && (
          <motion.div key="round_anim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#020617] p-4">
            <motion.div animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="absolute h-[28rem] w-[28rem] rounded-full border border-amber-400/20 bg-amber-400/5 blur-3xl" />
            {[0, 1, 2, 3, 4, 5].map((particle) => (
              <motion.span key={particle} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: particle % 2 ? 150 : -150, y: particle % 3 ? -100 : 100 }} transition={{ delay: 0.8 + particle * 0.08, duration: 0.8 }} className="absolute z-30 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.9)]" />
            ))}
            <motion.div initial={{ y: -260, x: -80, rotate: -8, scale: 0.65 }} animate={{ y: -42, x: -34, rotate: -4, scale: 0.9 }} transition={{ duration: 0.9, type: 'spring', stiffness: 120 }} className="absolute top-28 z-20">
              <span className="mb-2 block text-center text-[10px] font-black uppercase tracking-[0.25em] text-rose-400">Rival</span>
              <BaseballCard card={currentOppCard} isPlayable={false} compact />
            </motion.div>
            <motion.div initial={{ y: 260, x: 80, rotate: 8, scale: 0.65 }} animate={{ y: 42, x: 34, rotate: 4, scale: 0.9 }} transition={{ duration: 0.9, type: 'spring', stiffness: 120 }} className="absolute bottom-28 z-20">
              <span className="mb-2 block text-center text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">Tu jugada</span>
              <BaseballCard card={playedCard} isPlayable={false} compact />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: -14, letterSpacing: '0.1em' }} animate={{ opacity: [0, 1, 1, 0], y: 0, letterSpacing: ['0.1em', '0.28em', '0.28em', '0.4em'] }} transition={{ duration: 2.2, times: [0, 0.2, 0.72, 1] }} className="absolute top-14 z-40 text-center text-2xl font-black uppercase text-amber-300 drop-shadow-[0_0_16px_rgba(251,191,36,0.8)] sm:text-3xl">¡ENFRENTAMIENTO!</motion.h2>
            <motion.div initial={{ scale: 0, rotate: -45, opacity: 0 }} animate={{ scale: [0, 1.1, 1.8, 0], rotate: [-45, 0, 25, 80], opacity: [0, 1, 1, 0] }} transition={{ delay: 0.85, duration: 0.9, times: [0, 0.25, 0.55, 1] }} className="absolute z-40 rounded-full bg-amber-300 p-5 shadow-[0_0_70px_24px_rgba(251,191,36,0.55)]">
              <Zap size={62} className="fill-white text-white" />
            </motion.div>
            <motion.div initial={{ scale: 0.2, opacity: 0 }} animate={{ scale: [0.2, 1, 2.8], opacity: [0, 0.8, 0] }} transition={{ delay: 0.9, duration: 1 }} className="absolute z-30 h-28 w-28 rounded-full border-4 border-amber-300" />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ delay: 1.15, duration: 1.1 }} className="absolute bottom-10 z-40 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">Poder contra poder</motion.p>
          </motion.div>
        )}

        {gameState === 'round_result' && battleMath && (
          <motion.div key="round_result" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-[85vh] p-6 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-2xl ${roundWinner === 'user' ? 'bg-emerald-500 shadow-emerald-500/50' : roundWinner === 'draw' ? 'bg-amber-500 shadow-amber-500/50' : 'bg-rose-600 shadow-rose-600/50'}`}>
              {roundWinner === 'user' ? <Trophy size={40} className="text-white" /> : roundWinner === 'draw' ? <Dices size={40} className="text-white" /> : <ShieldAlert size={40} className="text-white" />}
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-wider mb-2">
              {roundWinner === 'user' ? '¡Carrera Anotada!' : roundWinner === 'draw' ? 'Turno empatado' : 'Ponche / Out'}
            </h2>
            
            <p className={`text-xs font-bold mb-6 ${roundWinner === 'user' ? 'text-emerald-400' : roundWinner === 'draw' ? 'text-amber-400' : 'text-rose-400'}`}>
              {roundWinner === 'user' ? 'Tu jugador dominó el turno.' : roundWinner === 'draw' ? 'Ambos jugadores obtuvieron el mismo poder.' : 'El rival dominó el turno.'}
            </p>

            {/* COMBATE MATEÁTICO ESTILO POKÉMON */}
            <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-4 mb-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Usuario */}
                <div className="flex flex-col items-center border-r border-slate-700 pr-4">
                  <span className="text-[9px] text-emerald-400 font-bold uppercase mb-2">Tu {playedCard.role}</span>
                  <div className="text-3xl font-black text-white mb-1">{battleMath.userTotal}</div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    <span>Base {battleMath.userBase}</span>
                    <span className="text-emerald-400 font-bold">+ {battleMath.userRoll}</span>
                    <Dices size={10} className="text-emerald-400" />
                  </div>
                </div>

                {/* Rival */}
                <div className="flex flex-col items-center pl-4">
                  <span className="text-[9px] text-rose-400 font-bold uppercase mb-2">Su {currentOppCard.role}</span>
                  <div className="text-3xl font-black text-white mb-1">{battleMath.oppTotal}</div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    <span>Base {battleMath.oppBase}</span>
                    <span className="text-rose-400 font-bold">+ {battleMath.oppRoll}</span>
                    <Dices size={10} className="text-rose-400" />
                  </div>
                </div>

              </div>
            </div>

            <button onClick={nextInning} className="bg-white text-slate-900 font-black px-10 py-4 rounded-2xl shadow-xl w-full max-w-[280px]">
              {currentInning < 9 ? 'Siguiente Inning' : 'Ver Resultado Final'}
            </button>
          </motion.div>
        )}

        {gameState === 'match_result' && (
          <motion.div key="match_result" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 flex h-full flex-col items-center justify-center overflow-y-auto bg-[#080E1E] px-6 pb-8 pt-16 scrollbar-none">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Marcador Final - 9 Innings</span>
            <h2 className={`text-4xl font-black uppercase tracking-wider mb-6 ${userRuns > oppRuns ? 'text-emerald-400' : userRuns === oppRuns ? 'text-amber-400' : 'text-rose-500'}`}>
              {userRuns > oppRuns ? '¡VICTORIA!' : userRuns === oppRuns ? 'EMPATE' : 'DERROTA'}
            </h2>

            <div className="bg-slate-800/80 rounded-3xl p-6 w-full max-w-[320px] mb-6 border border-slate-700 shadow-xl">
               <div className="flex justify-between items-center text-4xl font-black">
                  <span className={userRuns > oppRuns ? 'text-emerald-400' : 'text-white'}>{userRuns}</span>
                  <span className="text-slate-600">-</span>
                  <span className={oppRuns > userRuns ? 'text-rose-500' : 'text-white'}>{oppRuns}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 uppercase font-bold">
                  <span>{userTeam.name}</span>
                  <span>{selectedOpponent.name}</span>
               </div>
            </div>

            {/* ESTADÍSTICAS COMPARATIVAS DEL JUEGO */}
            <div className="w-full max-w-[320px] bg-slate-900 rounded-2xl p-4 border border-slate-700 mb-6 shadow-lg">
              <h3 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-1.5"><BarChart2 size={14}/> Rendimiento Total del Partido</h3>
              
              <div className="space-y-4 text-xs font-bold text-slate-300">
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <span className="block text-center text-[9px] text-slate-400 mb-2 uppercase">Promedio Total de Bateo</span>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 text-lg">{Math.round(gameStats.userBatPwr / gameStats.userBatCards || 0)}</span>
                    <span className="text-slate-500">vs</span>
                    <span className="text-rose-400 text-lg">{Math.round(gameStats.oppBatPwr / gameStats.oppBatCards || 0)}</span>
                  </div>
                </div>

                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                  <span className="block text-center text-[9px] text-slate-400 mb-2 uppercase">Promedio Total de Pitcheo</span>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 text-lg">{Math.round(gameStats.userPitPwr / gameStats.userPitCards || 0)}</span>
                    <span className="text-slate-500">vs</span>
                    <span className="text-rose-400 text-lg">{Math.round(gameStats.oppPitPwr / gameStats.oppPitCards || 0)}</span>
                  </div>
                </div>
              </div>
            </div>

            {userRuns > oppRuns ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} className="flex items-center justify-center gap-2 bg-amber-400/20 border border-amber-400 text-amber-400 px-5 py-3 rounded-xl font-black mb-8 w-full max-w-[320px]">
                <Coins size={20} /> +100 Puntos (Victoria)
              </motion.div>
            ) : (
              <div className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 text-slate-400 px-5 py-3 rounded-xl font-black mb-8 w-full max-w-[320px]">
                <Coins size={20} /> 0 Puntos Obtenidos
              </div>
            )}

            <button onClick={resetGame} className="mb-6 w-full max-w-[320px] rounded-2xl bg-[#0047AB] px-6 py-4 font-black text-white shadow-xl">
              Ir a la Casa Club (Menú)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}