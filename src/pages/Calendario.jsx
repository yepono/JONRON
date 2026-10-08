import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar as CalIcon, MapPin } from 'lucide-react';
import Header from '../components/layout/Header';
import GameDetailModal from '../components/calendar/GameDetailModal';
import { getSchedule } from '../services/mlbService';

export default function Calendario() {
  const [viewMode, setViewMode] = useState('dia'); // 'dia', 'semana', 'mes'
  const [searchQuery, setSearchQuery] = useState('');
  const [datesData, setDatesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  // Estado para la vista semanal
  const [selectedWeekDay, setSelectedWeekDay] = useState(0);

  const calculateDateRange = (mode) => {
    const now = new Date();
    const formatDate = (d) => d.toISOString().split('T')[0];

    const start = new Date(now);
    const end = new Date(now);

    if (mode === 'dia') {
      return { start: formatDate(now), end: formatDate(now) };
    } else if (mode === 'semana') {
      end.setDate(now.getDate() + 6);
      return { start: formatDate(now), end: formatDate(end) };
    } else if (mode === 'mes') {
      end.setDate(now.getDate() + 27);
      return { start: formatDate(now), end: formatDate(end) };
    }
    return { start: formatDate(now), end: formatDate(now) };
  };

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      const { start, end } = calculateDateRange(viewMode);
      const data = await getSchedule(start, end);
      setDatesData(data);
      setLoading(false);
    };

    fetchGames();
  }, [viewMode]);

  const formatGameTime = (utcDateString) => {
    if (!utcDateString) return 'TBD';
    return new Intl.DateTimeFormat('es-MX', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date(utcDateString));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="p-4 space-y-4">
        {/* Controles Superiores */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex bg-slate-200 p-1 rounded-xl flex-1 max-w-xs shadow-inner">
            {['dia', 'semana', 'mes'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${viewMode === mode ? 'bg-[#0047AB] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {mode === 'mes' ? 'Mensual' : mode === 'semana' ? 'Semanal' : 'Día'}
              </button>
            ))}
          </div>

          <Link
            to="/torneo"
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition"
          >
            <Trophy size={14} />
            <span className="hidden sm:inline">Posiciones</span>
          </Link>
        </div>

        {/* ----------------- VISTA SEMANAL: Selector de días ----------------- */}
        {viewMode === 'semana' && datesData.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {datesData.map((d, index) => {
              const dayDate = new Date(d.date + 'T00:00:00');
              const dayName = new Intl.DateTimeFormat('es-MX', { weekday: 'short' }).format(dayDate);
              const dayNum = dayDate.getDate();
              const isSelected = selectedWeekDay === index;

              return (
                <button
                  key={d.date}
                  onClick={() => setSelectedWeekDay(index)}
                  className={`flex flex-col items-center justify-center min-w-[50px] py-2 px-1 rounded-xl border transition-all ${isSelected
                      ? 'bg-[#0047AB] border-[#0047AB] text-white font-bold shadow-md scale-105'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <span className="text-[10px] uppercase">{dayName}</span>
                  <span className="text-sm">{dayNum}</span>
                  <span className="text-[9px] mt-0.5 opacity-80">{d.games.length} p.</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ----------------- CONTENIDO PRINCIPAL SEGÚN MODO ----------------- */}
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            Cargando partidos oficiales...
          </div>
        ) : datesData.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-500 border border-slate-100">
            No hay partidos registrados en este rango.
          </div>
        ) : viewMode === 'mes' ? (
          /* ----------------- VISTA MENSUAL COMPACTA ----------------- */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {datesData.flatMap((d) => d.games).map((game) => (
              <div
                key={game.gamePk}
                onClick={() => setSelectedGame(game)}
                className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer flex flex-col justify-between transition-all"
              >
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1.5">
                  <span>{new Date(game.gameDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}</span>
                  <span className="font-semibold text-blue-600">{formatGameTime(game.gameDate)}</span>
                </div>
                <div className="flex justify-around items-center py-1">
                  <img
                    src={`https://www.mlbstatic.com/team-logos/${game.teams.away.team.id}.svg`}
                    alt="away"
                    className="w-7 h-7 object-contain"
                  />
                  <span className="text-[10px] font-bold text-slate-300">vs</span>
                  <img
                    src={`https://www.mlbstatic.com/team-logos/${game.teams.home.team.id}.svg`}
                    alt="home"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span className="text-[9px] text-center text-slate-400 mt-1 truncate">
                  {game.venue?.name || 'Ver detalles'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* ----------------- VISTA DIARIA O SEMANA (DÍA SELECCIONADO) ----------------- */
          <div className="space-y-3">
            {(viewMode === 'semana' ? [datesData[selectedWeekDay]].filter(Boolean) : datesData).map((dateObj) => (
              <div key={dateObj.date} className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 px-1">
                  <CalIcon size={13} />
                  <span>{dateObj.date}</span>
                </div>

                {dateObj.games.map((game) => (
                  <div
                    key={game.gamePk}
                    onClick={() => setSelectedGame(game)}
                    className="bg-white rounded-2xl border border-slate-100 p-3 shadow-2xs hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-50 pb-2 mb-2">
                      <span className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin size={11} className="text-blue-500 shrink-0" />
                        {game.venue?.name || 'Estadio por confirmar'}
                      </span>
                      <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {game.status.abstractGameState === 'Live'
                          ? 'EN VIVO'
                          : game.status.abstractGameState === 'Final'
                            ? 'FINAL'
                            : formatGameTime(game.gameDate)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={`https://www.mlbstatic.com/team-logos/${game.teams.away.team.id}.svg`}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-xs font-semibold text-slate-800">
                            {game.teams.away.team.name}
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-slate-700">
                          {game.teams.away.score ?? '-'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={`https://www.mlbstatic.com/team-logos/${game.teams.home.team.id}.svg`}
                            alt=""
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-xs font-semibold text-slate-800">
                            {game.teams.home.team.name}
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-slate-700">
                          {game.teams.home.score ?? '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalle */}
      <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}