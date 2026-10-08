import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Shield, LogOut, Coins, CreditCard, Sparkles, Award } from 'lucide-react';
import Login from './Login';
import { getCurrentUser, logoutUser } from '../services/authService';

export default function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={(loggedUser) => setUser(loggedUser)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Cabecera con Foto / Avatar */}
      <div className="bg-[#0047AB] text-white pt-8 pb-10 px-6 rounded-b-3xl shadow-md text-center">
        <div className="w-20 h-20 bg-white/20 border-2 border-white/40 rounded-full mx-auto flex items-center justify-center mb-3 shadow-inner overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt="Foto de perfil" className="w-full h-full object-cover" />
          ) : (
            <User size={38} className="text-white" />
          )}
        </div>
        <h2 className="text-xl font-black uppercase tracking-wider">{user.username}</h2>
        <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2.5 py-0.5 rounded-full inline-block mt-1">
          Fan de {user.favoriteTeam || 'Liga Americana'}
        </span>
      </div>

      <div className="p-4 space-y-4 max-w-sm mx-auto">
        {/* SECCIÓN 1: Puntos Disponibles para la Tienda */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-4 shadow-md flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] text-amber-100 font-bold uppercase tracking-wider block">
              Puntos de Aficionado
            </span>
            <div className="flex items-center gap-2">
              <Coins size={22} className="text-amber-200" />
              <span className="text-2xl font-black">{user.points?.toLocaleString() || 0}</span>
              <span className="text-xs font-bold text-amber-100">Pts Jonrón</span>
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl backdrop-blur-xs transition">
            Ir a Tienda
          </button>
        </div>

        {/* SECCIÓN 2: Cartas Escaneadas (Colección Simulada) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <div className="flex items-center gap-1.5">
              <CreditCard size={14} className="text-blue-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Cartas Escaneadas
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {user.scannedCards?.length || 0} cartas
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(user.scannedCards || []).map((card) => (
              <div
                key={card.id}
                className="bg-slate-900 text-white p-2.5 rounded-xl border border-slate-800 text-center space-y-1 shadow-2xs relative overflow-hidden"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400 mx-auto" />
                <span className="text-[11px] font-black block truncate">{card.player}</span>
                <span className="text-[9px] text-slate-400 block truncate">{card.team}</span>
                <span className="text-[8px] bg-white/10 text-amber-300 font-mono font-bold px-1 rounded block">
                  {card.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN 3: Datos de la Cuenta */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-2 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Información del Perfil
          </span>
          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Mail size={13} className="text-blue-600" /> Correo:
            </span>
            <strong className="text-slate-800 truncate max-w-[170px]">{user.email}</strong>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar size={13} className="text-blue-600" /> Miembro desde:
            </span>
            <strong className="text-slate-800">
              {new Date(user.createdAt || Date.now()).toLocaleDateString('es-MX', {
                month: 'short',
                year: 'numeric',
              })}
            </strong>
          </div>
        </div>

        {/* Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
        >
          <LogOut size={15} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}