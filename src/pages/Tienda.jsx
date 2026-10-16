import { useState, Suspense, useRef } from 'react';
import { Coins, X, CheckCircle2, ShoppingBag, AlertCircle, Search } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, useTexture } from '@react-three/drei';
import { getCurrentUser, buyShopItem } from '../services/authService';

// --- COMPONENTE DE MONEDA GIRATORIA ROBUSTO ---
const SpinningCoin = ({ image, color }) => {
  const groupRef = useRef();

  // Usamos useTexture de Drei para cargar la imagen como textura 3D
  // Esto evita los problemas de superposición y colapso que tiene <Html>
  const texture = useTexture(image);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* MONEDA/CILINDRO */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.2, 64]} />
        <meshStandardMaterial color={color || '#0047AB'} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* CARA FRONTAL (El Logo) */}
      {/* Creamos un plano ligeramente por encima del cilindro para evitar el "Z-fighting" (parpadeo) */}
      <mesh position={[0, 0, 0.11]}>
        {/* El tamaño del plano dependerá de si quieres que ocupe todo el parche o solo el centro */}
        <planeGeometry args={[2.5, 2.5]} />
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>

      {/* CARA TRASERA (El Sello) */}
      <mesh position={[0, 0, -0.11]} rotation={[0, Math.PI, 0]}>
        {/* Usamos un color de fondo para la parte trasera y un círculo */}
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  );
};

// --- VISOR 3D (CANVAS) ---
const Item3DViewer = ({ image, color }) => {
  return (
    <div className="relative h-[clamp(10rem,28dvh,16rem)] w-full shrink-0 cursor-grab bg-gradient-to-b from-slate-900 to-slate-950 active:cursor-grabbing">
      <div className="absolute top-3 left-0 w-full text-center pointer-events-none z-10">
        <span className="bg-black/40 border border-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
          Desliza para rotar el parche en 3D
        </span>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-10, -10, -10]} intensity={1.5} />
        {/* Suspense es OBLIGATORIO cuando se usa useTexture para esperar la carga de la imagen */}
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <PresentationControls
              global
              polar={[-0.4, 0.4]}
              azimuth={[-Math.PI, Math.PI]}
              config={{ mass: 2, tension: 400 }}
            >
              <SpinningCoin image={image} color={color} />
            </PresentationControls>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- CATÁLOGO DE LA TIENDA (Solo Parches AL) ---
const SHOP_ITEMS = [
  { id: 'p1', name: 'Parche Yankees', type: 'Parche Oficial', price: 1000, color: '#0C2340', image: 'https://www.mlbstatic.com/team-logos/147.svg', desc: 'Parche termoadhesivo oficial de los New York Yankees.' },
  { id: 'p2', name: 'Parche Red Sox', type: 'Parche Oficial', price: 800, color: '#BD3039', image: 'https://www.mlbstatic.com/team-logos/111.svg', desc: 'Parche termoadhesivo oficial de los Boston Red Sox.' },
  { id: 'p3', name: 'Parche Astros', type: 'Parche Oficial', price: 800, color: '#EB6E1F', image: 'https://www.mlbstatic.com/team-logos/117.svg', desc: 'Parche termoadhesivo oficial de los Houston Astros.' },
  { id: 'p4', name: 'Parche Blue Jays', type: 'Parche Oficial', price: 750, color: '#134A8E', image: 'https://www.mlbstatic.com/team-logos/141.svg', desc: 'Parche termoadhesivo oficial de los Toronto Blue Jays.' },
  { id: 'p5', name: 'Parche Orioles', type: 'Parche Oficial', price: 750, color: '#DF4601', image: 'https://www.mlbstatic.com/team-logos/110.svg', desc: 'Parche termoadhesivo oficial de los Baltimore Orioles.' },
  { id: 'p6', name: 'Parche Rays', type: 'Parche Oficial', price: 700, color: '#092C5C', image: 'https://www.mlbstatic.com/team-logos/139.svg', desc: 'Parche termoadhesivo oficial de los Tampa Bay Rays.' },
  { id: 'p7', name: 'Parche Guardians', type: 'Parche Oficial', price: 650, color: '#E31937', image: 'https://www.mlbstatic.com/team-logos/114.svg', desc: 'Parche termoadhesivo oficial de los Cleveland Guardians.' },
  { id: 'p8', name: 'Parche White Sox', type: 'Parche Oficial', price: 700, color: '#27251F', image: 'https://www.mlbstatic.com/team-logos/145.svg', desc: 'Parche termoadhesivo oficial de los Chicago White Sox.' },
  { id: 'p9', name: 'Parche Tigers', type: 'Parche Oficial', price: 650, color: '#FA4616', image: 'https://www.mlbstatic.com/team-logos/116.svg', desc: 'Parche termoadhesivo oficial de los Detroit Tigers.' },
  { id: 'p10', name: 'Parche Royals', type: 'Parche Oficial', price: 600, color: '#004687', image: 'https://www.mlbstatic.com/team-logos/118.svg', desc: 'Parche termoadhesivo oficial de los Kansas City Royals.' },
  { id: 'p11', name: 'Parche Twins', type: 'Parche Oficial', price: 650, color: '#002B5C', image: 'https://www.mlbstatic.com/team-logos/142.svg', desc: 'Parche termoadhesivo oficial de los Minnesota Twins.' },
  { id: 'p12', name: 'Parche Rangers', type: 'Parche Oficial', price: 750, color: '#003278', image: 'https://www.mlbstatic.com/team-logos/140.svg', desc: 'Parche termoadhesivo oficial de los Texas Rangers.' },
  { id: 'p13', name: 'Parche Mariners', type: 'Parche Oficial', price: 700, color: '#005C5C', image: 'https://www.mlbstatic.com/team-logos/136.svg', desc: 'Parche termoadhesivo oficial de los Seattle Mariners.' },
  { id: 'p14', name: 'Parche Angels', type: 'Parche Oficial', price: 750, color: '#BA0021', image: 'https://www.mlbstatic.com/team-logos/108.svg', desc: 'Parche termoadhesivo oficial de los Los Angeles Angels.' },
  { id: 'p15', name: 'Parche Athletics', type: 'Parche Oficial', price: 500, color: '#003831', image: 'https://www.mlbstatic.com/team-logos/133.svg', desc: 'Parche termoadhesivo oficial de los Oakland Athletics.' },
];

export default function Tienda() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [selectedItem, setSelectedItem] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const inventoryIds = user?.inventory?.map(i => i.id) || [];
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('es');
  const filteredItems = SHOP_ITEMS.filter((item) =>
    `${item.name} ${item.type} ${item.desc}`.toLocaleLowerCase('es').includes(normalizedQuery),
  );

  const handleBuy = () => {
    try {
      const updatedUser = buyShopItem(selectedItem);
      setUser(updatedUser);
      setFeedback({ type: 'success', msg: `¡Has adquirido ${selectedItem.name}!` });
      setTimeout(() => setFeedback(null), 3000);
      setSelectedItem(null);
    } catch (error) {
      setFeedback({ type: 'error', msg: error.message });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="min-h-full bg-slate-50 pb-6">
      {/* Cabecera */}
      <div className="bg-[#0047AB] px-5 py-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">Tienda</h1>
            <span className="text-xs text-blue-200">Parches 3D Oficiales</span>
          </div>
          <div className="bg-amber-400 text-slate-900 px-4 py-1.5 rounded-full flex items-center gap-2 font-black shadow-md">
            <Coins size={16} />
            <span>{user ? user.points?.toLocaleString() : '---'} pts</span>
          </div>
        </div>
        <label className="relative mt-4 block">
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Buscar producto o equipo..."
            className="w-full rounded-xl bg-white py-2.5 pl-4 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <Search size={17} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-blue-700" />
        </label>
      </div>

      {/* Alertas */}
      {feedback && (
        <div className={`mx-4 mt-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-in slide-in-from-top-2 ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Cuadrícula de Productos */}
      {filteredItems.length ? (
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredItems.map((item) => {
          const isOwned = inventoryIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center"
            >
              <div className="w-full h-28 bg-slate-50 rounded-2xl mb-3 flex items-center justify-center p-2 relative">
                {isOwned && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-sm z-10">
                    <CheckCircle2 size={12} />
                  </div>
                )}
                <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain drop-shadow-md" />
              </div>
              <div className="w-full text-center">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">{item.type}</span>
                <h3 className="text-xs font-black text-slate-800 truncate px-1 mt-0.5">{item.name}</h3>
                <div className={`mt-2 py-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 ${isOwned ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {isOwned ? 'En Colección' : <><Coins size={12} /> {item.price} pts</>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      ) : (
        <p className="mx-4 mt-4 rounded-xl bg-white p-5 text-center text-xs text-slate-500">
          No hay productos que coincidan con “{searchQuery}”.
        </p>
      )}

      {/* Modal 3D de Inspección y Compra */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end overflow-hidden bg-slate-900/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm animate-in fade-in duration-200">
          <button
            type="button"
            aria-label="Cerrar detalles del producto"
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0 h-full w-full cursor-default"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shop-item-title"
            className="relative z-10 mx-auto flex max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1rem)] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-4">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{selectedItem.type}</span>
                <h2 id="shop-item-title" className="text-lg font-black text-slate-900">{selectedItem.name}</h2>
              </div>
              <button type="button" aria-label="Cerrar" onClick={() => setSelectedItem(null)} className="rounded-full bg-slate-100 p-2 text-slate-500">
                <X size={20} />
              </button>
            </div>

            {/* VISUALIZADOR 3D INTERACTIVO */}
            <Item3DViewer image={selectedItem.image} color={selectedItem.color} />

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
              <p className="text-center text-sm leading-relaxed text-slate-600">
                {selectedItem.desc}
              </p>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              {inventoryIds.includes(selectedItem.id) ? (
                <button type="button" disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 font-black text-white opacity-80">
                  <CheckCircle2 size={18} /> Artículo en tu Perfil
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBuy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0047AB] py-3.5 font-black text-white shadow-xl transition-transform hover:bg-blue-800 active:scale-95"
                >
                  <ShoppingBag size={18} /> Comprar por {selectedItem.price} Puntos
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}