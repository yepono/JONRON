import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Lock, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { loginAdmin, registerAdmin } from '../services/adminAuthService';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');

        try {
            if (isRegistering) {
                if (!username.trim()) {
                    setError('Ingresa un nombre para la cuenta administrativa.');
                    return;
                }
                if (password !== confirmPassword) {
                    setError('Las contraseñas no coinciden.');
                    return;
                }
                registerAdmin({ username, email, password });
            } else {
                loginAdmin({ email, password });
            }
            navigate('/');
        } catch (loginError) {
            setError(loginError.message);
        }
    };

    return (
        <div className="min-h-full bg-slate-50 px-5 py-8">
            <button type="button" onClick={() => navigate('/')} className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0047AB]">
                <ArrowLeft size={16} /> Regresar al inicio
            </button>

            <div className="mx-auto max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0047AB]">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800">Acceso administrador</h1>
                        <p className="text-xs text-slate-500">
                            {isRegistering ? 'Crea una cuenta para administrar publicaciones' : 'Inicia sesión como administrador para crear publicaciones'}
                        </p>
                    </div>
                </div>

                {error && (
                    <div role="alert" className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <label className="block text-xs font-bold text-slate-600">
                            Nombre del administrador
                            <span className="relative mt-1 block">
                                <UserPlus size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input required type="text" value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-blue-200" />
                            </span>
                        </label>
                    )}
                    <label className="block text-xs font-bold text-slate-600">
                        Correo del administrador
                        <span className="relative mt-1 block">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-blue-200" />
                        </span>
                    </label>
                    <label className="block text-xs font-bold text-slate-600">
                        Contraseña
                        <span className="relative mt-1 block">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-blue-200" />
                        </span>
                    </label>
                    {isRegistering && (
                        <label className="block text-xs font-bold text-slate-600">
                            Confirmar contraseña
                            <span className="relative mt-1 block">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input required type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-blue-200" />
                            </span>
                        </label>
                    )}
                    <button type="submit" className="w-full rounded-xl bg-[#0047AB] py-3 text-sm font-bold text-white transition hover:bg-blue-800">
                        {isRegistering ? 'Crear cuenta administrativa' : 'Iniciar sesión administrativa'}
                    </button>
                </form>

                <button
                    type="button"
                    onClick={() => {
                        setIsRegistering((current) => !current);
                        setError('');
                        setPassword('');
                        setConfirmPassword('');
                    }}
                    className="mt-4 w-full text-center text-xs font-bold text-[#0047AB] hover:underline"
                >
                    {isRegistering ? 'Ya tengo una cuenta administrativa' : 'Crear una cuenta administrativa nueva'}
                </button>
            </div>
        </div>
    );
}