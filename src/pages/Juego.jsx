import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, ShieldAlert, Trophy, ArrowRight, Zap, ChevronDown, BarChart2, Coins, Dices } from 'lucide-react';
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
        image: imagePath ? teamImageAssets[imagePath] : null,
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
const BaseballCard = ({ card, onPlay, isPlayable = true }) => {
  return (
    <motion.div 
      whileHover={isPlayable ? { scale: 1.02 } : {}}
      whileTap={isPlayable ? { scale: 0.98 } : {}}
      className={`relative w-48 h-72 shrink-0 rounded-2xl overflow-hidden border-2 ${isPlayable ? 'border-slate-500 cursor-pointer shadow-lg hover:border-amber-400' : 'border-rose-500 shadow-rose-500/30'} bg-slate-900`}
      onClick={() => isPlayable && onPlay && onPlay(card)}
    >
      <div className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-70 z-10`} />
      {card.image && <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 mix-blend-luminosity" />}
      
      <div className="relative z-20 p-3 h-full flex flex-col justify-between">
        {/* Cabecera (Poder y Rareza) */}
        <div className="flex justify-between items-start">
          <div className={`w-12 h-12 rounded-full bg-slate-900 border-2 ${isPlayable ? 'border-amber-400' : 'border-rose-500'} flex items-center justify-center text-xl font-black text-white shadow-xl`}>
            {card.power}
          </div>
          <span className="bg-black/80 px-2 py-1 rounded text-[9px] font-black text-amber-400 uppercase tracking-widest border border-white/10">
            {card.rarity}
          </span>
        </div>
        
        {/* Pie de Carta (Nombre y Estadísticas) */}
        <div className="bg-slate-950/90 p-3 rounded-xl border border-white/10 w-full shadow-2xl">
          <span className={`text-[10px] block font-bold uppercase tracking-wider mb-1 ${isPlayable ? 'text-amber-400' : 'text-rose-400'}`}>{card.role}</span>
          <span className="text-sm font-black text-white truncate block mb-2">{card.name}</span>
          
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
  const [user, setUser] = useState(() => getCurrentUser());
  const [gameState, setGameState] = useState('menu'); 
  
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [userTeam, setUserTeam] = useState(null);
  
  const [userRoster, setUserRoster] = useState([]);
  const [oppRoster, setOppRoster] = useState([]);
  
  const [requiredRole, setRequiredRole] = useState('Bateador');
  const [filterRole, setFilterRole] = useState('Todos');

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

  useEffect(() => () => window.clearTimeout(combatTimerRef.current), []);

  const handleStartGame = () => {
    if (!user) return alert('Inicia sesión para jugar.');
    setGameState('opp_select');
  };

  const selectOpponent = (team) => {
    setSelectedOpponent(team);
    setOppRoster(generateRoster(team, false));
    setGameState('team_select');
  };

  const selectUserTeam = (team) => {
    const newUserRoster = generateRoster(team, true);
    const newOppRoster = [...oppRoster];
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
    setGameState('play_inning');
  };

  const playUserCard = (card) => {
    if (card.role !== requiredRole || gameState !== 'play_inning') return;
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
    const newRoster = userRoster.filter(c => c.id !== playedCard.id);
    setUserRoster(newRoster);

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
              {GAME_TEAMS.map((team) => (
                <motion.div whileTap={{ scale: 0.98 }} key={team.id} onClick={() => selectOpponent(team)} className={`bg-gradient-to-r ${team.color} border border-white/10 p-4 rounded-2xl flex items-center justify-between cursor-pointer shadow-lg`}>
                  <div className="flex items-center gap-4">
                    <img src={`https://www.mlbstatic.com/team-logos/${team.logoId}.svg`} alt="" className="w-10 h-10 bg-white rounded-full p-1" />
                    <span className="font-black text-base">{team.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block font-bold text-white/70">PWR BASE</span>
                    <span className="font-black">{team.basePower}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'team_select' && (
          <motion.div key="team_select" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="p-4 flex flex-col h-[80vh]">
            <h2 className="text-center text-sm font-black text-emerald-400 uppercase tracking-widest mt-2 mb-4">¿Con qué equipo jugarás?</h2>
            <div className="flex flex-col gap-3 overflow-y-auto pb-4 scrollbar-none">
              {GAME_TEAMS.filter(t => t.id !== selectedOpponent.id).map((team) => (
                <motion.div whileTap={{ scale: 0.98 }} key={team.id} onClick={() => selectUserTeam(team)} className={`bg-gradient-to-r ${team.color} border border-white/10 p-4 rounded-2xl flex items-center justify-between cursor-pointer shadow-lg`}>
                  <div className="flex items-center gap-4">
                    <img src={`https://www.mlbstatic.com/team-logos/${team.logoId}.svg`} alt="" className="w-10 h-10 bg-white rounded-full p-1" />
                    <span className="font-black text-base">{team.name}</span>
                  </div>
                </motion.div>
              ))}
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
                   <BaseballCard card={currentOppCard} isPlayable={false} />
                )}
                <div className="mt-3 bg-rose-950/60 border border-rose-500/50 px-4 py-1.5 rounded-full">
                   <span className="text-[11px] text-white">Debes superar su poder base de <strong className="text-rose-400 text-sm">{currentOppCard?.power}</strong></span>
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-slate-900/80 rounded-t-3xl border-t border-slate-700 relative overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    Tu turno: Elige un {requiredRole}
                  </span>
                  <div className="relative group">
                    <select 
                      value={filterRole} 
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="bg-slate-800 text-[10px] font-bold px-2 py-1 rounded border border-slate-600 outline-none appearance-none pr-6"
                    >
                      <option value="Todos">Todos</option>
                      <option value="Bateador">Bateadores</option>
                      <option value="Lanzador">Pitchers</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-1.5 top-1.5 pointer-events-none text-slate-400" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-none pb-32 px-4 pt-4">
                  <div className="flex flex-col items-center gap-5">
                    {filteredRoster.map((card) => (
                       <BaseballCard key={card.id} card={card} isPlayable={true} onPlay={playUserCard} />
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
          <motion.div key="round_anim" className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center p-4 overflow-hidden">
            <h2 className="absolute top-16 text-2xl font-black uppercase text-amber-400 tracking-widest animate-pulse">¡CHOQUE DE PODER!</h2>
            <motion.div initial={{ y: -200, scale: 0.8 }} animate={{ y: 20, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} className="absolute top-24 z-10">
              <BaseballCard card={currentOppCard} isPlayable={false} />
            </motion.div>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 2.5, 0], opacity: [0, 1, 0] }} transition={{ delay: 0.4, duration: 0.6 }} className="absolute z-30">
              <Zap size={120} className="text-amber-400 fill-amber-400" />
            </motion.div>
            <motion.div initial={{ y: 200, scale: 0.8 }} animate={{ y: -20, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} className="absolute bottom-24 z-20">
              <BaseballCard card={playedCard} isPlayable={false} />
            </motion.div>
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