import { Link } from 'react-router-dom';
import { BookOpen, HelpCircle, Gamepad2, Camera, ShoppingBag, Trophy } from 'lucide-react';

const categories = [
    { id: 'historia', label: 'Historia', path: '/historia', icon: BookOpen },
    { id: 'trivia', label: 'Trivia', path: '/trivia', icon: HelpCircle },
    { id: 'juego', label: 'Juego', path: '/juego', icon: Gamepad2 },
    { id: 'escaneo', label: 'Escaneo', path: '/escaneo', icon: Camera },
    { id: 'tienda', label: 'Tienda', path: '/tienda', icon: ShoppingBag },
    { id: 'torneo', label: 'Torneo', path: '/torneo', icon: Trophy },
];

export default function CategoryGrid() {
    return (
        <section className="mt-4 px-4">
            <h2 className="text-sm font-bold text-slate-700 mb-3">Categorías</h2>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Link
                            key={cat.id}
                            to={cat.path}
                            className="flex flex-col items-center group focus:outline-none"
                        >
                            <div className="w-16 h-16 rounded-2xl border border-blue-200 bg-blue-50/50 flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                                <Icon size={28} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs text-slate-600 mt-1.5 font-medium group-hover:text-blue-600">
                                {cat.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}