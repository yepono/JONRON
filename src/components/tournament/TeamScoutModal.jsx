import { X, Target, Shield, Zap, Activity, Flame, Lightbulb } from 'lucide-react';

export default function TeamScoutModal({ team, onClose }) {
    if (!team) return null;

    const { coachMetrics, scouting, coachNote } = team;

    const stats = [
        { label: 'Poder de Bateo', val: coachMetrics.potencia, icon: Flame, color: 'bg-amber-400' },
        { label: 'Efectividad Pitcheo', val: coachMetrics.pitcheo, icon: Target, color: 'bg-rose-400' },
        { label: 'Contacto en Caja', val: coachMetrics.contacto, icon: Activity, color: 'bg-emerald-400' },
        { label: 'Solidez Defensiva', val: coachMetrics.defensa, icon: Shield, color: 'bg-blue-400' },
        { label: 'Velocidad en Bases', val: coachMetrics.velocidad, icon: Zap, color: 'bg-purple-400' },
    ];

    return (
        // Centrado absoluto en pantalla
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">

            {/* Fondo backdrop para cerrar al hacer clic afuera */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Contenedor Flotante Centrado */}
            <div className="relative z-10 bg-slate-900 text-white w-full max-w-sm rounded-3xl border border-slate-700 shadow-2xl flex flex-col max-h-[82vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Cabecera */}
                <div className="flex justify-between items-center px-5 pt-4 pb-3 border-b border-slate-800 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <img
                            src={`https://www.mlbstatic.com/team-logos/${team.logoId}.svg`}
                            alt={team.name}
                            className="w-9 h-9 object-contain bg-white/10 p-1 rounded-xl"
                        />
                        <div className="min-w-0">
                            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                                INFORME DE SCOUTING
                            </span>
                            <h3 className="text-sm font-black truncate max-w-[190px]">{team.name}</h3>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Cuerpo Desplazable */}
                <div className="px-5 py-4 overflow-y-auto space-y-4">

                    {/* Métricas Principales */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700/60">
                            <span className="text-[9px] text-slate-400 block font-semibold">ERA</span>
                            <span className="text-xs font-black text-rose-400">{scouting.era}</span>
                        </div>
                        <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700/60">
                            <span className="text-[9px] text-slate-400 block font-semibold">AVG</span>
                            <span className="text-xs font-black text-emerald-400">{scouting.avg}</span>
                        </div>
                        <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700/60">
                            <span className="text-[9px] text-slate-400 block font-semibold">HR</span>
                            <span className="text-xs font-black text-amber-400">{scouting.homeRuns}</span>
                        </div>
                        <div className="bg-slate-800/90 p-2 rounded-xl border border-slate-700/60">
                            <span className="text-[9px] text-slate-400 block font-semibold">ROBOS</span>
                            <span className="text-xs font-black text-cyan-400">{scouting.stolenBases}</span>
                        </div>
                    </div>

                    {/* Desglose de Habilidades */}
                    <div className="space-y-2 bg-slate-800/50 p-3 rounded-2xl border border-slate-800">
                        <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                            DESGLOSE DE HABILIDADES
                        </h4>

                        {stats.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="space-y-1">
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="text-slate-400 flex items-center gap-1.5">
                                            <Icon size={12} className="text-slate-300" />
                                            {item.label}
                                        </span>
                                        <span className="font-bold">{item.val}/100</span>
                                    </div>
                                    <div className="w-full bg-slate-700/60 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className={`${item.color} h-full rounded-full transition-all duration-700 ease-out`}
                                            style={{ width: `${item.val}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}