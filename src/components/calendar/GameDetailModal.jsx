import { X, MapPin, Clock, Shield, Award } from 'lucide-react';

export default function GameDetailModal({ game, onClose }) {
    if (!game) return null;

    const away = game.teams.away;
    const home = game.teams.home;
    const venueName = game.venue?.name || 'Estadio por confirmar';
    const status = game.status.abstractGameState;

    const formatFullDate = (utcDate) => {
        if (!utcDate) return '';
        return new Intl.DateTimeFormat('es-MX', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).format(new Date(utcDate));
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center">
            <div className="bg-white w-full max-w-md h-[88vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200">

                {/* Cabecera del Modal */}
                <div className="bg-[#0047AB] text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield size={18} className="text-blue-200" />
                        <h3 className="text-sm font-bold tracking-wide uppercase">Detalles del Encuentro</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-blue-700 transition"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Contenido con scroll */}
                <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-800">
                    {/* Enfrentamiento principal */}
                    <div className="grid grid-cols-3 items-center text-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {/* Visitante */}
                        <div className="flex flex-col items-center">
                            <img
                                src={`https://www.mlbstatic.com/team-logos/${away.team.id}.svg`}
                                alt={away.team.name}
                                className="w-14 h-14 object-contain mb-1 drop-shadow-sm"
                            />
                            <span className="text-xs font-bold leading-tight">{away.team.name}</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Visitante</span>
                        </div>

                        {/* Marcador o VS */}
                        <div className="flex flex-col items-center">
                            {status === 'Final' || status === 'Live' ? (
                                <div className="text-2xl font-black tracking-tight text-[#0047AB]">
                                    {away.score ?? 0} - {home.score ?? 0}
                                </div>
                            ) : (
                                <span className="text-lg font-black text-slate-300">VS</span>
                            )}
                            <span className="text-[10px] uppercase font-bold mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                                {status}
                            </span>
                        </div>

                        {/* Local */}
                        <div className="flex flex-col items-center">
                            <img
                                src={`https://www.mlbstatic.com/team-logos/${home.team.id}.svg`}
                                alt={home.team.name}
                                className="w-14 h-14 object-contain mb-1 drop-shadow-sm"
                            />
                            <span className="text-xs font-bold leading-tight">{home.team.name}</span>
                            <span className="text-[10px] text-slate-400 mt-0.5">Local</span>
                        </div>
                    </div>

                    {/* Ficha técnica del evento */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Información Oficial</h4>
                        <div className="bg-slate-50 rounded-xl p-3.5 space-y-2.5 text-xs">
                            <div className="flex items-center gap-2.5 text-slate-600">
                                <Clock size={16} className="text-blue-600 shrink-0" />
                                <span className="capitalize">{formatFullDate(game.gameDate)}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-slate-600">
                                <MapPin size={16} className="text-blue-600 shrink-0" />
                                <span>{venueName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Registro de temporada (Records) */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Récord de Temporada</h4>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <span className="text-slate-500 truncate">{away.team.name}:</span>
                                <span className="font-bold text-slate-800">
                                    {away.leagueRecord ? `${away.leagueRecord.wins}-${away.leagueRecord.losses}` : 'N/D'}
                                </span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                <span className="text-slate-500 truncate">{home.team.name}:</span>
                                <span className="font-bold text-slate-800">
                                    {home.leagueRecord ? `${home.leagueRecord.wins}-${home.leagueRecord.losses}` : 'N/D'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}