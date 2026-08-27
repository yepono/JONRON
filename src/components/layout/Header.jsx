import { Search } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchQuery);
    };

    return (
        <header className="bg-[#0047AB] text-white pt-3 pb-6 px-5 rounded-b-3xl shadow-md">

            {/* Título principal */}
            <h1 className="text-3xl font-black text-center tracking-wider mb-4 uppercase">
                JONRÓN
            </h1>

            {/* Barra de búsqueda */}
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="buscar..."
                    className="w-full py-2 pl-4 pr-10 rounded-xl bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-inner"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <Search size={18} />
                </button>
            </form>
        </header>
    );
}