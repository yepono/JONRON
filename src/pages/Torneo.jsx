import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import TournamentBracket from '../components/tournament/TournamentBracket';
import DivisionDashboard from '../components/tournament/DivisionDashboard';
import TeamGamesTimeline from '../components/tournament/TeamGamesTimeline';
import TeamScoutModal from '../components/tournament/TeamScoutModal';
import {
  getLiveStandings,
  getLivePostseasonBracket,
  getTeamSeasonGames
} from '../services/standingsService';

export default function Torneo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [selectedDivisionIndex, setSelectedDivisionIndex] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [bracketData, setBracketData] = useState(null);
  const [teamGamesData, setTeamGamesData] = useState({ games: [], recordL10: '0-0' });
  const [scoutingTeam, setScoutingTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingGames, setLoadingGames] = useState(false);

  const handleTeamSelect = (teamId, teamName) => {
    if (teamId) setSelectedTeamId(teamId);
    if (teamName) setSelectedTeam(teamName);

    const divIndex = divisions.findIndex((d) =>
      d.teams.some((t) => t.id === teamId || t.name === teamName)
    );
    if (divIndex !== -1) {
      setSelectedDivisionIndex(divIndex);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      const [standingsData, postseasonData] = await Promise.all([
        getLiveStandings(),
        getLivePostseasonBracket(),
      ]);

      setDivisions(standingsData);
      setBracketData(postseasonData);

      if (standingsData.length > 0 && standingsData[0].teams.length > 0) {
        const initial = standingsData[0].teams[0];
        setSelectedTeam(initial.name);
        setSelectedTeamId(initial.id);
      }
      setLoading(false);
    };

    initData();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      if (!selectedTeamId) return;
      setLoadingGames(true);
      const data = await getTeamSeasonGames(selectedTeamId);
      setTeamGamesData(data);
      setLoadingGames(false);
    };

    fetchGames();
  }, [selectedTeamId]);

  const activeTeamObj = divisions
    .flatMap((d) => d.teams)
    .find((t) => t.id === selectedTeamId || t.name === selectedTeam);
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('es');
  const searchResults = divisions.flatMap((division) =>
    division.teams
      .filter((team) => `${team.name} ${team.short} ${division.divisionName}`.toLocaleLowerCase('es').includes(normalizedQuery))
      .map((team) => ({ ...team, divisionName: division.divisionName })),
  );

  return (
    <div className="min-h-full bg-slate-50 pb-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Buscar equipo o división..."
      />

      <div className="p-4 space-y-4">
        {normalizedQuery ? (
          <section className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-600">
              Equipos que coinciden ({searchResults.length})
            </h2>
            {loading ? (
              <p className="py-8 text-center text-xs text-slate-400">Cargando equipos...</p>
            ) : searchResults.length ? (
              <div className="space-y-2">
                {searchResults.map((team) => (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => handleTeamSelect(team.id, team.name)}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm"
                  >
                    <img src={`https://www.mlbstatic.com/team-logos/${team.logoId}.svg`} alt="" className="h-9 w-9 shrink-0 object-contain" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-black text-slate-800">{team.name}</span>
                      <span className="block text-[10px] text-slate-500">{team.divisionName} · {team.wins}-{team.losses}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-white p-5 text-center text-xs text-slate-500">No se encontraron equipos con “{searchQuery}”.</p>
            )}
          </section>
        ) : loading ? (
          <div className="py-16 text-center text-xs text-slate-400">
            Conectando con el cuadro oficial de postemporada...
          </div>
        ) : (
          <>
            {/* 1. Árbol con separación AL vs NL, criterios de pase y anillo de selección */}
            <TournamentBracket
              bracketData={bracketData}
              selectedTeamId={selectedTeamId}
              onSelectTeam={(teamId, teamName) => handleTeamSelect(teamId, teamName)}
            />

            {/* 2. Timeline con racha L10 e indicador de entradas extra */}
            <TeamGamesTimeline
              gamesData={teamGamesData}
              teamName={selectedTeam}
              loading={loadingGames}
            />

            {/* Separador */}
            <div className="bg-[#0047AB] text-white py-2 rounded-2xl text-center shadow-sm">
              <h2 className="text-xs font-black uppercase tracking-widest">
                Posiciones & Radar del Coach
              </h2>
            </div>

            {/* 3. Dashboard con nombres de divisiones oficiales */}
            <DivisionDashboard
              divisions={divisions}
              selectedDivisionIndex={selectedDivisionIndex}
              setSelectedDivisionIndex={setSelectedDivisionIndex}
              selectedTeam={selectedTeam}
              onSelectTeam={(teamId, teamName) => handleTeamSelect(teamId, teamName)}
              onOpenScout={(team) => setScoutingTeam(team || activeTeamObj)}
            />
          </>
        )}
      </div>

      <TeamScoutModal
        team={scoutingTeam}
        onClose={() => setScoutingTeam(null)}
      />
    </div>
  );
}