import { CheckCircle2, XCircle, Home, Plane, Flame } from 'lucide-react';

export default function TeamGamesTimeline({ gamesData, teamName, loading }) {
    const { games = [], recordL10 = '0-0' } = gamesData || {};

    return (
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Racha & Partidos Recientes
                    </h3>
                    <p className="text-[10px] text-slate-400">
                        Resultados de <strong className="text-slate-700">{teamName}</strong>
                    </p>
                </div>

                {/* Indicador de rendimiento de los últimos 10 juegos */}
                <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-xl">
                    <Flame size={12} className="text-amber-500" />
                    <span className="text-[10px] font-bold text-slate-700">
                        Últimos 10: <span className="text-blue-600 font-mono">{recordL10}</span>
                    </span>
                </div>
            </div>

            {loading ? (
                <div className="py-6 text-center text-xs text-slate-400 animate-pulse">
                    Consultando registros oficiales de temporada...
                </div>
            ) : games.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400">
                    No hay partidos previos registrados para este equipo.
                </div>
            ) : (
                <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
                    {games.map((g) => (
                        <div
                            key={g.id}
                            className={`shrink-0 w-36 p-2.5 rounded-2xl border transition-all duration-300 hover:scale-105 ${g.won
                                    ? 'bg-emerald-50/60 border-emerald-200'
                                    : 'bg-rose-50/60 border-rose-200'
                                }`}
                        >
                            <div className="flex justify-between items-center text-[9px] mb-1.5 font-bold">
                                <span className="text-slate-400">{g.date.slice(5)}</span>
                                <span
                                    className={`flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black ${g.won ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                                        }`}
                                >
                                    {g.won ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
                                    {g.won ? 'VICTORIA' : 'DERROTA'}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mb-1.5">
                                <img
                                    src={`https://www.mlbstatic.com/team-logos/${g.opponentLogoId}.svg`}
                                    alt=""
                                    className="w-5 h-5 object-contain"
                                />
                                <div className="truncate">
                                    <span className="text-[11px] font-bold text-slate-800 truncate block">
                                        vs {g.opponentName}
                                    </span>
                                    <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
                                        {g.isHome ? <Home size={9} /> : <Plane size={9} />}
                                        {g.isHome ? 'Local' : 'Visita'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between font-mono text-xs bg-white/80 py-1 px-2 rounded-lg border border-slate-100">
                                <span className="font-black text-slate-800">{g.score}</span>
                                <span className="text-[9px] text-slate-500 font-sans font-bold">{g.inningLabel}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}