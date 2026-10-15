import { X, Calendar, Trophy, MapPin, Star } from 'lucide-react';

export default function TeamHistoryModal({ team, onClose }) {
    if (!team) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col animate-in slide-in-from-bottom duration-300">

            {/* Navbar Superior Fijo */}
            <div className="bg-[#0047AB] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-2">
                    <div className="bg-white p-1 rounded-lg">
                        <img
                            src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                            alt="Logo"
                            className="w-6 h-6 object-contain"
                        />
                    </div>
                    <span className="font-black tracking-wider uppercase text-sm">{team.name}</span>
                </div>
                <button onClick={onClose} className="p-1.5 bg-blue-800 rounded-full hover:bg-blue-700 transition">
                    <X size={20} />
                </button>
            </div>

            {/* Contenido Desplazable */}
            <div className="flex-1 overflow-y-auto pb-10 bg-slate-50">

                {/* Imagen de Portada */}
                <div className="relative h-48 w-full">
                    <img src={team.coverImage} alt={team.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <h1 className="text-3xl font-black">{team.name}</h1>
                    </div>
                </div>

                {/* Ficha Técnica */}
                <div className="p-4 grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <Calendar size={18} className="text-blue-600" />
                        <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Fundación</span>
                            <span className="text-sm font-black text-slate-800">{team.founded}</span>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <Trophy size={18} className="text-amber-500" />
                        <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Series Mundiales</span>
                            <span className="text-sm font-black text-slate-800">{team.worldSeries} Títulos</span>
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 col-span-2">
                        <MapPin size={18} className="text-rose-500" />
                        <div>
                            <span className="text-[10px] text-slate-400 block uppercase font-bold">Estadio Actual</span>
                            <span className="text-sm font-black text-slate-800">{team.stadium}</span>
                        </div>
                    </div>
                </div>

                {/* Jugadores Legendarios */}
                <div className="px-4 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Leyendas de la Franquicia</span>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {team.legends.map((legend, idx) => (
                            <div key={idx} className="bg-[#0047AB] text-white px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 shadow-sm">
                                <Star size={12} className="text-amber-400 fill-amber-400" /> {legend}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cuerpo del Artículo (Wikipedia style) */}
                <div className="px-5 space-y-6">
                    {team.history.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                            <h3 className="text-lg font-black text-slate-800 border-b-2 border-blue-100 pb-1 inline-block">
                                {section.heading}
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed text-justify">
                                {section.text}
                            </p>
                            {section.image && (
                                <img src={section.image} alt="" className="w-full h-40 object-cover rounded-xl mt-3 shadow-md" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}