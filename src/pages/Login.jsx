import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertCircle, Camera, Shield } from 'lucide-react';
import BaseballAnimation from '../components/auth/BaseballAnimation';
import { loginUser, registerUser } from '../services/authService';

const AL_TEAMS = [
    'New York Yankees',
    'Boston Red Sox',
    'Toronto Blue Jays',
    'Baltimore Orioles',
    'Tampa Bay Rays',
    'Cleveland Guardians',
    'Chicago White Sox',
    'Detroit Tigers',
    'Kansas City Royals',
    'Minnesota Twins',
    'Houston Astros',
    'Texas Rangers',
    'Seattle Mariners',
    'Los Angeles Angels',
    'Oakland Athletics',
];

export default function Login({ onLoginSuccess }) {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [favoriteTeam, setFavoriteTeam] = useState('New York Yankees');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Conversión de imagen local a Base64
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError('La imagen no debe superar los 2MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        try {
            let loggedUser;
            if (isRegister) {
                if (!username.trim() || !email.trim() || !password.trim()) {
                    setError('Todos los campos son obligatorios.');
                    return;
                }
                loggedUser = registerUser({
                    username,
                    email,
                    password,
                    avatar,
                    favoriteTeam,
                });
            } else {
                if (!email.trim() || !password.trim()) {
                    setError('Por favor ingresa tu correo y contraseña.');
                    return;
                }
                loggedUser = loginUser({ email, password });
            }

            if (onLoginSuccess) {
                onLoginSuccess(loggedUser);
            } else {
                navigate('/perfil');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-between pb-28">
            {/* Cabecera */}
            <div className="bg-[#0047AB] text-white pt-6 pb-8 px-6 rounded-b-3xl shadow-md text-center">
                <h1 className="text-3xl font-black tracking-wider uppercase">JONRÓN</h1>
                <p className="text-xs text-blue-200 mt-1">Tu experiencia oficial de la Liga Americana</p>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                {/* Animación fluida de la pelota */}
                <BaseballAnimation />

                <div className="text-center my-2">
                    <h2 className="text-xl font-black text-slate-800">
                        {isRegister ? 'Crear Cuenta' : 'Bienvenido de Vuelta'}
                    </h2>
                    <p className="text-xs text-slate-500">
                        {isRegister
                            ? 'Personaliza tu perfil y franquicia favorita'
                            : 'Ingresa con tus credenciales registradas'}
                    </p>
                </div>

                {error && (
                    <div className="mb-3 bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    {isRegister && (
                        <>
                            {/* Carga de Foto de Perfil */}
                            <div className="flex flex-col items-center justify-center pb-1">
                                <div className="relative group cursor-pointer">
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dashed border-blue-400 bg-slate-100 flex items-center justify-center shadow-inner">
                                        {avatar ? (
                                            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={26} className="text-slate-400" />
                                        )}
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-[#0047AB] text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-blue-800 transition">
                                        <Camera size={13} />
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1">Subir foto de perfil</span>
                            </div>

                            {/* Nombre de Usuario */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 block px-1">Usuario</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Tu alias de aficionado"
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                                    />
                                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                </div>
                            </div>

                            {/* Selección de Equipo Favorito AL */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-600 block px-1 flex items-center gap-1">
                                    <Shield size={12} className="text-amber-500" /> Equipo Favorito (AL)
                                </label>
                                <select
                                    value={favoriteTeam}
                                    onChange={(e) => setFavoriteTeam(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                                >
                                    {AL_TEAMS.map((team) => (
                                        <option key={team} value={team}>{team}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {/* Correo */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block px-1">Correo Electrónico</label>
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@correo.com"
                                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                            />
                            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-600 block px-1">Contraseña</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0047AB]"
                            />
                            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#0047AB] hover:bg-blue-800 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2"
                    >
                        <span>{isRegister ? 'Crear Perfil Oficial' : 'Iniciar Sesión'}</span>
                        <ArrowRight size={14} />
                    </button>
                </form>

                {/* Switch Login / Registro */}
                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError('');
                        }}
                        className="text-xs text-[#0047AB] font-bold hover:underline"
                    >
                        {isRegister
                            ? '¿Ya tienes cuenta? Inicia sesión aquí'
                            : '¿No tienes cuenta aún? Regístrate aquí'}
                    </button>
                </div>
            </div>
        </div>
    );
}