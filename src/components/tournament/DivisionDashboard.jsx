import { Shield, Sparkles, ChevronRight, Zap, Target, Activity } from 'lucide-react';

export default function DivisionDashboard({
    divisions,
    selectedDivisionIndex,
    setSelectedDivisionIndex,
    selectedTeam,
    onSelectTeam,
    onOpenScout
}) {
    const currentDivision = divisions[selectedDivisionIndex] || divisions[0];
    const teams = currentDivision?.teams || [];
    const currentTeam = teams.find((t) => t.name === selectedTeam) || teams[0];
    const metrics = currentTeam?.coachMetrics || { contacto: 75, potencia: 75, pitcheo: 75, defensa: 75, velocidad: 75 };

    // Construcción del Polígono Radar
    const radius = 60;
    const center = 75;
    const values = [
        metrics.contacto,
        metrics.potencia,
        metrics.pitcheo,
        metrics.defensa,
        metrics.velocidad,
    ];

    const points = values.map((val, i) => {
        const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
        const r = (val / 100) * radius;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-[#1E3A8A] text-white rounded-3xl p-5 shadow-lg space-y-4">

            {/* Cabecera */}
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={12} className="text-amber-400" /> Centro de Control
                    </span>
                    <h3 className="text-lg font-black">{currentDivision?.divisionName || 'Liga MLB'}</h3>
                </div>
                <button
                    onClick={() => onOpenScout(currentTeam)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition flex items-center gap-1"
                >
                    <span>Scouting</span>
                    <ChevronRight size={14} />
                </button>
            </div>

            {/* Selector de División Deslizable (Todas las divisiones de MLB) */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {divisions.map((div, idx) => (
                    <button
                        key={div.divisionId || idx}
                        onClick={() => {
                            setSelectedDivisionIndex(idx);
                            if (div.teams.length > 0) onSelectTeam(div.teams[0].name);
                        }}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg shrink-0 transition ${selectedDivisionIndex === idx
                                ? 'bg-white text-[#1E3A8A] shadow-xs'
                                : 'bg-white/10 text-blue-200 hover:bg-white/20'
                            }`}
                    >
                        {div.divisionName}
                    </button>
                ))}
            </div>

            {/* Radar del Equipo Activo */}
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs flex items-center justify-between">
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 150 150">
                        <circle cx="75" cy="75" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <circle cx="75" cy="75" r="25" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                        <polygon
                            points={points}
                            fill="rgba(56, 189, 248, 0.45)"
                            stroke="#38BDF8"
                            strokeWidth="2.5"
                            className="transition-all duration-700 ease-out"
                        />
                    </svg>
                    <img
                        src={`https://www.mlbstatic.com/team-logos/${currentTeam?.logoId}.svg`}
                        alt=""
                        className="w-7 h-7 object-contain absolute"
                    />
                </div>

                <div className="flex-1 pl-4 space-y-1.5 text-xs">
                    <div className="text-sm font-black text-amber-300 truncate">{currentTeam?.name}</div>
                    <div className="text-[11px] text-blue-200">
                        Récord: <strong>{currentTeam?.wins}G - {currentTeam?.losses}P</strong> ({currentTeam?.pct})
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-200 pt-1">
                        <div className="flex items-center gap-1">
                            <Zap size={10} className="text-amber-400" />
                            <span>Bateo: <strong>{metrics.potencia}%</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Target size={10} className="text-rose-400" />
                            <span>Pitcheo: <strong>{metrics.pitcheo}%</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Shield size={10} className="text-blue-400" />
                            <span>Defensa: <strong>{metrics.defensa}%</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Activity size={10} className="text-emerald-400" />
                            <span>Vel: <strong>{metrics.velocidad}%</strong></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista de Equipos de la División Seleccionada */}
            <div className="space-y-1.5">
                <span className="text-[10px] text-blue-300 font-bold uppercase tracking-wider block px-1">
                    Equipos de la división (Toca para inspeccionar)
                </span>
                <div className="divide-y divide-white/10 bg-white/5 rounded-2xl overflow-hidden">
                    {teams.map((t) => {
                        const isSelected = selectedTeam === t.name;

                        return (
                            <div
                                key={t.id}
                                onClick={() => onSelectTeam(t.id, t.name)}
                                className={`p-3 flex items-center justify-between cursor-pointer transition ${isSelected ? 'bg-white/20' : 'hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <img
                                        src={`https://www.mlbstatic.com/team-logos/${t.logoId}.svg`}
                                        alt=""
                                        className="w-6 h-6 object-contain bg-white rounded-full p-0.5"
                                    />
                                    <div>
                                        <span className="text-xs font-bold block">{t.short}</span>
                                        <span className="text-[10px] text-blue-200">{t.wins} - {t.losses}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 w-28">
                                    <div className="flex-1 bg-black/30 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-amber-400 h-full" style={{ width: `${t.coachMetrics?.potencia}%` }} />
                                    </div>
                                    <div className="flex-1 bg-black/30 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-rose-400 h-full" style={{ width: `${t.coachMetrics?.pitcheo}%` }} />
                                    </div>
                                    <div className="flex-1 bg-black/30 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-400 h-full" style={{ width: `${t.coachMetrics?.contacto}%` }} />
                                    </div>
                                </div>

                                <span className="text-xs font-mono font-bold">{t.diff}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}