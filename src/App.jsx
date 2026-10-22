// src/App.jsx (o App_2.jsx)
import { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';
import Login from './pages/Login'; 
import Historia from './pages/Historia';
import Trivia from './pages/Trivia';
import Juego from './pages/Juego';
import Escaneo from './pages/Escaneo';
import Tienda from './pages/Tienda';
import Torneo from './pages/Torneo';
import AdminLogin from './pages/AdminLogin';
import AdminPublication from './pages/AdminPublication';

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

function AppShell() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex h-[100dvh] w-full justify-center overflow-hidden bg-slate-900 text-slate-900">
      <div className="relative flex h-full min-h-0 w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl">
          <main ref={mainRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/login" element={<Login />} />
              <Route path="/historia" element={<Historia />} />
              <Route path="/trivia" element={<Trivia />} />
              <Route path="/juego" element={<Juego />} />
              <Route path="/escaneo" element={<Escaneo />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/torneo" element={<Torneo />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/publicar" element={<AdminPublication />} />
            </Routes>
          </main>
          {pathname !== '/juego' && <BottomNav />}
      </div>
    </div>
  );
}