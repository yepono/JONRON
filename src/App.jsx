import { HashRouter, Routes, Route } from 'react-router-dom';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Calendario from './pages/Calendario';
import Perfil from './pages/Perfil';
import Historia from './pages/Historia';
import Trivia from './pages/Trivia';
import Juego from './pages/Juego';
import Escaneo from './pages/Escaneo';
import Tienda from './pages/Tienda';
import Torneo from './pages/Torneo';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-100 text-slate-900 flex justify-center">
        <div className="w-full max-w-md bg-white min-h-screen relative pb-20 shadow-lg flex flex-col">

          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/perfil" element={<Perfil />} />


              <Route path="/historia" element={<Historia />} />
              <Route path="/trivia" element={<Trivia />} />
              <Route path="/juego" element={<Juego />} />
              <Route path="/escaneo" element={<Escaneo />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/torneo" element={<Torneo />} />
            </Routes>
          </main>

          <BottomNav />
        </div>
      </div>
    </HashRouter>
  );
}