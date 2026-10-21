import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, LogOut, Send, ShieldCheck } from 'lucide-react';
import { getAdminSession, logoutAdmin } from '../services/adminAuthService';
import { createPost } from '../services/postService';

const createInitialForm = (username) => ({
    username,
    category: 'Anuncios',
    title: '',
    description: '',
    img: '',
    publishedAt: new Date().toISOString().slice(0, 16),
});

export default function AdminPublication() {
    const navigate = useNavigate();
    const session = getAdminSession();
    const [form, setForm] = useState(() => createInitialForm(session?.username || ''));
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saving, setSaving] = useState(false);

    if (!session) return <Navigate to="/admin/login" replace />;

    const updateField = (field) => (event) => {
        setForm((current) => ({ ...current, [field]: event.target.value }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            await createPost({ ...form, publishedAt: new Date(form.publishedAt).toISOString() });
            setForm({ ...createInitialForm(session.username), publishedAt: new Date().toISOString().slice(0, 16) });
            setSuccess('La publicación se creó correctamente.');
        } catch (saveError) {
            setError(saveError.message);
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = () => {
        logoutAdmin();
        navigate('/');
    };

    return (
        <div className="min-h-full bg-slate-50 px-4 py-5 pb-8">
            <header className="mb-5 flex items-center justify-between gap-3">
                <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0047AB]"><ArrowLeft size={16} /> Inicio</Link>
                <button type="button" onClick={handleLogout} className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-rose-600"><LogOut size={15} /> Cerrar sesión</button>
            </header>

            <div className="mb-5 flex items-center gap-3">
                <ShieldCheck className="text-[#0047AB]" size={24} />
                <div>
                    <h1 className="text-xl font-black text-slate-800">Nueva publicación</h1>
                    <p className="text-xs text-slate-500">Sesión: {session.email}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="grid grid-cols-2 gap-3">
                    <Field label="Usuario administrador" value={form.username} required readOnly />
                    <Field label="Categoría" value={form.category} onChange={updateField('category')} required />
                </div>
                <Field label="Título" value={form.title} onChange={updateField('title')} required />
                <label className="block text-xs font-bold text-slate-600">
                    Descripción
                    <textarea required rows="6" value={form.description} onChange={updateField('description')} className="mt-1 block w-full resize-y rounded-xl border border-slate-200 p-3 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-blue-200" />
                </label>
                <Field label="URL de imagen (opcional)" type="url" value={form.img} onChange={updateField('img')} />
                <Field label="Fecha de publicación" type="datetime-local" value={form.publishedAt} onChange={updateField('publishedAt')} required />

                {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-xs text-rose-700">{error}</p>}
                {success && <p role="status" className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-700"><CheckCircle2 size={16} /> {success}</p>}

                <button disabled={saving} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0047AB] py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60">
                    <Send size={16} /> {saving ? 'Publicando...' : 'Publicar en JONRÓN'}
                </button>
            </form>
        </div>
    );
}

function Field({ label, type = 'text', value, onChange, required = false, readOnly = false }) {
    return (
        <label className="block text-xs font-bold text-slate-600">
            {label}
            <input required={required} readOnly={readOnly} type={type} value={value} onChange={onChange} className={`mt-1 block w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-normal text-slate-800 outline-none focus:ring-2 focus:ring-blue-200 ${readOnly ? 'bg-slate-100' : ''}`} />
        </label>
    );
}