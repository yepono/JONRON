import { useState } from 'react';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import Header from '../components/layout/Header';
import TeamHistoryModal from '../components/history/TeamHistoryModal';
import { BASEBALL_HISTORY, AL_TEAMS_HISTORY } from '../data/historyData';

export default function Historia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'equipos'
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Filtramos equipos por búsqueda
  const filteredTeams = AL_TEAMS_HISTORY.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="p-4 space-y-5">

        {/* Selector de Pestañas */}
        <div className="flex bg-slate-200 p-1 rounded-xl shadow-inner">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'general' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <BookOpen size={14} /> Orígenes del Deporte
          </button>
          <button
            onClick={() => setActiveTab('equipos')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'equipos' ? 'bg-[#0047AB] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <Users size={14} /> Franquicias (AL)
          </button>
        </div>

        {/* PESTAÑA: HISTORIA GENERAL */}
        {activeTab === 'general' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Portada */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg h-56 w-full">
              <img src={BASEBALL_HISTORY.coverImage} alt="Historia Baseball" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h2 className="text-2xl font-black uppercase tracking-wider">{BASEBALL_HISTORY.title}</h2>
                <p className="text-xs text-blue-200">{BASEBALL_HISTORY.subtitle}</p>
              </div>
            </div>

            {/* Artículos */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-6">
              {BASEBALL_HISTORY.sections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#0047AB] rounded-full block" />
                    <h3 className="text-base font-black text-slate-800">{section.heading}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed text-justify">
                    {section.text}
                  </p>
                  {section.image && (
                    <img src={section.image} alt="" className="w-full h-40 object-cover rounded-xl shadow-md mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTAÑA: EQUIPOS DE LA LIGA AMERICANA */}
        {activeTab === 'equipos' && (
          <div className="animate-in fade-in duration-300">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-3 block px-1">
              Selecciona una franquicia para leer su historia
            </span>

            <div className="grid grid-cols-1 gap-3">
              {filteredTeams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center p-1.5 border border-slate-100">
                      <img
                        src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                        alt={team.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-800">{team.name}</h3>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">Fundado en {team.founded} • {team.worldSeries} Títulos</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0047AB] group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </button>
              ))}

              {/* Placeholder explicativo temporal para los equipos faltantes */}
              {searchQuery === '' && filteredTeams.length < 15 && (
                <div className="bg-slate-100 border border-slate-200 border-dashed rounded-2xl p-5 text-center text-xs text-slate-500">
                  <p className="font-bold mb-1">¡Enciclopedia en construcción!</p>
                  <p>Puedes agregar la historia de los demás equipos de la AL editando el archivo <code className="bg-slate-200 px-1 rounded">historyData.js</code>.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Pantalla Completa de Lectura */}
      <TeamHistoryModal team={selectedTeam} onClose={() => setSelectedTeam(null)} />
    </div>
  );
}