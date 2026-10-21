import { useState } from 'react';
import { User, Mail, Calendar, LogOut, Coins, CreditCard, ShoppingBag, CheckCircle2, Circle, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { getCurrentUser, logoutUser } from '../services/authService';
import { getAdminSession, logoutAdmin } from '../services/adminAuthService';
import americanLeagueTeams from '../data/americanLeagueTeams.json';

const CollectionCard = ({ card, scanned, compact = false }) => (
  <div className={`relative flex flex-col justify-between overflow-hidden rounded-lg border p-2 ${
    compact ? 'h-[76px] w-[calc((100%-1rem)/3)] shrink-0' : 'min-h-[88px]'
  } ${
    scanned
      ? 'border-emerald-300 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-700 text-white shadow-md'
      : 'border-slate-200 bg-slate-100 text-slate-400 grayscale'
  }`}>
    <div className="flex items-start justify-between gap-1">
      <span className={`text-[9px] font-black uppercase ${scanned ? 'text-white/75' : 'text-slate-400'}`}>
        {card.abbreviation}
      </span>
      {scanned ? <CheckCircle2 size={13} /> : <Circle size={13} />}
    </div>
    <span className={`text-[10px] font-black leading-tight ${compact ? 'line-clamp-2' : ''}`}>
      {card.name}
    </span>
  </div>
);

export default function Perfil() {
  const [adminSession, setAdminSession] = useState(() => getAdminSession());
  const [user, setUser] = useState(() => getCurrentUser());
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const profile = adminSession || user;
  const isAdmin = Boolean(adminSession);

  const handleLogout = () => {
    if (isAdmin) {
      logoutAdmin();
      setAdminSession(null);
    } else {
      logoutUser();
    }
    setUser(null);
  };

  if (!profile) {
    return <Login onLoginSuccess={setUser} />;
  }

  const inventory = profile.inventory || [];
  const scannedCards = profile.scannedCards || [];
  const scannedCardIds = new Set(scannedCards.map((card) => card.id));
  const scannedTeamCards = americanLeagueTeams.filter((card) => scannedCardIds.has(card.id));
  const pendingTeamCards = americanLeagueTeams.filter((card) => !scannedCardIds.has(card.id));

  return (
    <div className="min-h-full bg-slate-50 pb-6">
      {/* Cabecera */}
      <div className="bg-[#0047AB] text-white pt-8 pb-10 px-6 rounded-b-3xl shadow-md text-center">
        <div className="w-20 h-20 bg-white/20 border-2 border-white/40 rounded-full mx-auto flex items-center justify-center mb-3 shadow-inner overflow-hidden">
          {profile.avatar ? (
            <img src={profile.avatar} alt="Foto de perfil" className="w-full h-full object-cover" />
          ) : (
            <User size={38} className="text-white" />
          )}
        </div>
        <h2 className="text-xl font-black uppercase tracking-wider">{profile.username}</h2>
        <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full inline-block mt-1">
          {isAdmin ? 'Administrador de JONRÓN' : `Fan de ${profile.favoriteTeam || 'Liga Americana'}`}
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-sm mx-auto">

        {/* SECCIÓN 1: Puntos Disponibles */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-amber-100 font-bold uppercase tracking-wider block">Puntos de Aficionado</span>
            <div className="flex items-center gap-2">
              <Coins size={22} className="text-amber-200" />
              <span className="text-2xl font-black">{profile.points?.toLocaleString() || 0}</span>
              <span className="text-xs font-bold text-amber-100">Pts Jonrón</span>
            </div>
          </div>
          <Link to="/tienda" className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs transition">
            Ir a Tienda
          </Link>
        </div>

        {/* SECCIÓN 2: Inventario de la Tienda (NUEVO) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <div className="flex items-center gap-1.5">
              <ShoppingBag size={14} className="text-amber-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Mi Colección 3D</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{inventory.length} items</span>
          </div>

          {inventory.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400">
              <p>Aún no has comprado nada.</p>
              <Link to="/tienda" className="text-[#0047AB] font-bold mt-1 block">Visita la Tienda</Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {inventory.map((item) => (
                <div key={item.id} className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-center flex flex-col items-center justify-between">
                  <div className="w-12 h-12 flex items-center justify-center mb-1">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain drop-shadow-sm" />
                  </div>
                  <span className="text-[9px] font-black text-slate-700 leading-tight w-full truncate">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECCIÓN 3: Colección de cartas AL */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <div className="flex items-center gap-1.5">
              <CreditCard size={14} className="text-blue-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Colección AL</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCollectionOpen(true)}
              className="flex items-center gap-1 text-[10px] font-bold text-blue-700"
              aria-label="Ver todas las cartas de la Liga Americana"
            >
              Ver todas <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-emerald-700">{scannedTeamCards.length} escaneadas</span>
            <span className="text-slate-400">{pendingTeamCards.length} pendientes</span>
          </div>

          {scannedTeamCards.length ? (
            <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1">
              {scannedTeamCards.map((card) => (
                <CollectionCard key={card.id} card={card} scanned compact />
              ))}
            </div>
          ) : (
            <p className="py-3 text-center text-[10px] text-slate-400">Aún no has escaneado cartas de la Liga Americana.</p>
          )}
        </div>

        {isCollectionOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4"
            onClick={() => setIsCollectionOpen(false)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setIsCollectionOpen(false);
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="collection-title"
              className="w-full max-w-md rounded-xl bg-white p-4 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 id="collection-title" className="text-sm font-black uppercase text-slate-900">Colección Liga Americana</h3>
                  <p className="mt-1 text-[10px] text-slate-500">{scannedTeamCards.length} de {americanLeagueTeams.length} cartas escaneadas</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCollectionOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                  aria-label="Cerrar colección"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto pr-1">
                {americanLeagueTeams.map((card) => (
                  <CollectionCard key={card.id} card={card} scanned={scannedCardIds.has(card.id)} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Información y Logout */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Información del Perfil</span>
          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 flex items-center gap-1.5"><Mail size={13} className="text-blue-600" /> Correo:</span>
            <strong className="text-slate-800 truncate max-w-[170px]">{profile.email}</strong>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500 flex items-center gap-1.5"><Calendar size={13} className="text-blue-600" /> Miembro desde:</span>
            <strong className="text-slate-800">{profile.createdAt || profile.loggedAt ? new Date(profile.createdAt || profile.loggedAt).toLocaleDateString('es-MX', { month: 'short', year: 'numeric' }) : '-'}</strong>
          </div>
        </div>

        <button onClick={handleLogout} className="w-full py-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer">
          <LogOut size={15} /> <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}