import { Home, Video, Calendar, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
    const navItems = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/videos', label: 'Videos', icon: Video },
        { to: '/calendario', label: 'Calendario', icon: Calendar },
        { to: '/perfil', label: 'Perfil', icon: User },
    ];

    return (
        <nav className="relative z-50 w-full shrink-0 border-t border-blue-800 bg-[#0047AB] pb-[env(safe-area-inset-bottom)] text-white">
            <div className="flex h-16 items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-white font-semibold' : 'text-blue-200 hover:text-white'
                                }`
                            }
                        >
                            <Icon size={22} />
                            <span className="text-xs mt-1">{item.label}</span>
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}