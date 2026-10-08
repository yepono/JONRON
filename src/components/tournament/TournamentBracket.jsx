// src/components/tournament/TournamentBracket.jsx
import { useState } from 'react';
import { Trophy, ZoomIn, ZoomOut, Sparkles, HelpCircle, CheckCircle2, Shield, Award } from 'lucide-react';

export default function TournamentBracket({ bracketData, selectedTeamId, onSelectTeam }) {
    const [isZoomedOut, setIsZoomedOut] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const { alDivisional = [], alChampionship } = bracketData || {};

    const renderTeamRow = (team, isWinner, isFinished, winsToClinch) => {
        const isSelected = selectedTeamId && team.id === selectedTeamId;
        const hasStarted = team.wins > 0 || isFinished;

        return (
            <div
                onClick={() => team.id && onSelectTeam(team.id, team.name)}
                className={`flex items-center justify-between p-1.5 rounded-xl text-[11px] cursor-pointer transition-all duration-200 ${isSelected
                        ? 'ring-2 ring-amber-400 bg-amber-400/20 text-white font-bold shadow-lg scale-[1.02]'
                        : isWinner
                            ? 'bg-blue-900/60 font-bold text-white'
                            : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
            >
                <div className="flex items-center gap-1.5 truncate">
                    {team.id ? (
                        <img
                            src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                            alt=""
                            className="w-4 h-4 object-contain shrink-0"
                        />
                    ) : (
                        <span className="w-4 h-4 rounded-full bg-slate-800 text-[8px] flex items-center justify-center font-mono">?</span>
                    )}
                    <span className="truncate">{team.short}</span>
                </div>

                <div className="flex items-center gap-1">
                    {isWinner && <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />}
                    <span
                        className={`font-mono text-xs px-1.5 py-0.5 rounded font-black ${isWinner
                                ? 'bg-emerald-500 text-slate-950'
                                : hasStarted
                                    ? 'bg-slate-800 text-slate-200'
                                    : 'text-slate-500'
                            }`}
                    >
                        {hasStarted ? team.wins : '-'}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#080E1E] text-white rounded-3xl p-4 shadow-xl border border-slate-800 space-y-3 overflow-hidden">

            {/* Cabecera y Controles */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={11} /> Postemporada Oficial
                        </span>
                        <button
                            onClick={() => setShowHelp(!showHelp)}
                            className="text-slate-400 hover:text-white transition"
                            title="Información"
                        >
                            <HelpCircle size={13} />
                        </button>
                    </div>
                    <h3 className="text-xs font-black uppercase text-slate-100">
                        {isZoomedOut ? 'Cuadro Completo Liga Americana' : 'Ronda Activa AL'}
                    </h3>
                </div>

                <button
                    onClick={() => setIsZoomedOut(!isZoomedOut)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shadow-sm"
                >
                    {isZoomedOut ? <ZoomIn size={13} /> : <ZoomOut size={13} />}
                    <span>{isZoomedOut ? 'Acercar' : 'Ver Todo'}</span>
                </button>
            </div>

            {showHelp && (
                <div className="bg-blue-950/60 border border-blue-800/60 rounded-xl p-2.5 text-[11px] text-blue-200 space-y-1 animate-in fade-in duration-200">
                    <p className="font-bold flex items-center gap-1">
                        <Award size={12} className="text-amber-400" /> Clasificación Liga Americana:
                    </p>
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px] text-slate-300">
                        <li><strong>Series Divisionales AL (ALDS):</strong> Al mejor de 5 juegos (clasifica el primero en ganar 3).</li>
                        <li><strong>Serie de Campeonato AL (ALCS):</strong> Al mejor de 7 juegos (el ganador corona como Campeón de la Liga Americana).</li>
                        <li>Toca cualquier equipo para sincronizar sus estadísticas y métricas abajo.</li>
                    </ul>
                </div>
            )}

            {/* Canvas del Árbol de la Liga Americana */}
            <div className="overflow-x-auto pb-4 pt-2 scrollbar-none">
                <div
                    className={`flex items-center justify-between min-w-[580px] transition-all duration-300 origin-left ${isZoomedOut ? 'scale-[0.85]' : 'scale-100'
                        }`}
                >

                    {/* NIVEL 1: SERIES DIVISIONALES AL (ALDS) */}
                    <div className="flex flex-col justify-between h-[300px] w-48 shrink-0">
                        <span className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest flex items-center gap-1 px-1">
                            <Shield size={10} /> Series Divisionales (ALDS)
                        </span>

                        {alDivisional.length > 0 ? (
                            alDivisional.map((match) => (
                                <div key={match.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 space-y-1.5 shadow-sm">
                                    <div className="flex justify-between items-center text-[8px] text-slate-400 font-bold">
                                        <span>{match.roundName}</span>
                                        <span className="text-amber-400/90 text-[7px]">{match.formatText}</span>
                                    </div>
                                    {renderTeamRow(match.team1, match.team1.wins >= match.winsToClinch, match.isFinished, match.winsToClinch)}
                                    {renderTeamRow(match.team2, match.team2.wins >= match.winsToClinch, match.isFinished, match.winsToClinch)}
                                </div>
                            ))
                        ) : (
                            <div className="text-[10px] text-slate-500 text-center py-10">Cargando llaves ALDS...</div>
                        )}
                    </div>

                    {/* CONECTOR RAMIFICADO 1 (ALDS hacia ALCS) */}
                    <div className="w-10 h-[300px] shrink-0">
                        <svg className="w-full h-full text-slate-700 stroke-current stroke-2 fill-none" viewBox="0 0 40 300">
                            <path d="M 0 75 L 20 75 L 20 150 L 40 150" />
                            <path d="M 0 225 L 20 225 L 20 150" />
                        </svg>
                    </div>

                    {/* NIVEL 2: SERIE DE CAMPEONATO AL (ALCS) */}
                    <div className="flex flex-col justify-center h-[300px] w-48 shrink-0">
                        <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1 px-1 mb-2">
                            <Trophy size={10} /> Final AL (ALCS)
                        </span>

                        <div className="bg-slate-900 border border-blue-900/60 rounded-2xl p-2.5 space-y-1.5 shadow-md">
                            <div className="flex justify-between items-center text-[8px] font-black text-blue-300 uppercase">
                                <span>{alChampionship?.roundName || 'Serie ALCS'}</span>
                                <span className="text-amber-300 text-[7px]">{alChampionship?.formatText || 'Mejor de 7'}</span>
                            </div>
                            {alChampionship && (
                                <>
                                    {renderTeamRow(alChampionship.team1, alChampionship.team1.wins >= alChampionship.winsToClinch, alChampionship.isFinished, alChampionship.winsToClinch)}
                                    {renderTeamRow(alChampionship.team2, alChampionship.team2.wins >= alChampionship.winsToClinch, alChampionship.isFinished, alChampionship.winsToClinch)}
                                </>
                            )}
                        </div>
                    </div>

                    {/* CONECTOR RAMIFICADO 2 (ALCS hacia el Campeón AL) */}
                    <div className="w-10 h-[300px] shrink-0">
                        <svg className="w-full h-full text-slate-700 stroke-current stroke-2 fill-none" viewBox="0 0 40 300">
                            <path d="M 0 150 L 40 150" />
                        </svg>
                    </div>

                    {/* NIVEL 3: BANDERÍN / CAMPEÓN DE LA LIGA AMERICANA */}
                    <div className="w-48 shrink-0 flex items-center justify-center h-[300px]">
                        <div className="w-full bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-dashed border-amber-500/50 rounded-2xl p-3.5 text-center space-y-2.5 shadow-2xl">
                            <div className="flex justify-center">
                                <Trophy size={32} className="text-amber-400 animate-pulse drop-shadow-md" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase text-amber-300 block tracking-wider">
                                    Trofeo de la AL
                                </span>
                                <span className="text-[8px] text-slate-400 block font-semibold">Campeón de la Liga Americana</span>
                            </div>

                            <div className="bg-black/40 p-2.5 rounded-xl border border-white/5 text-center text-xs">
                                {alChampionship?.isFinished ? (
                                    <span className="font-bold text-amber-300 text-sm">
                                        {alChampionship.team1.wins >= alChampionship.winsToClinch
                                            ? alChampionship.team1.name
                                            : alChampionship.team2.name}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                                        Por Definir (TBD)
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}