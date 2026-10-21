import { useEffect } from 'react';
import { CalendarDays, X } from 'lucide-react';

export default function PostDetailModal({ post, onClose }) {
    useEffect(() => {
        if (!post) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [post, onClose]);

    if (!post) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
            role="presentation"
            onClick={onClose}
        >
            <section
                aria-labelledby="post-detail-title"
                aria-modal="true"
                className="max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
                role="dialog"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
                    <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-[#0047AB]">{post.author.name}</p>
                        <p className="text-[11px] text-slate-500">{post.author.tagline}</p>
                    </div>
                    <button
                        type="button"
                        aria-label="Cerrar publicación"
                        onClick={onClose}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {post.mediaUrl && (
                    <div className="flex max-h-[58dvh] justify-center bg-slate-100 p-2">
                        <img
                            src={post.mediaUrl}
                            alt={post.title}
                            className="max-h-[54dvh] w-auto max-w-full object-contain"
                        />
                    </div>
                )}

                <div className="p-5">
                    <h2 id="post-detail-title" className="text-xl font-black leading-tight text-slate-900">
                        {post.title}
                    </h2>
                    <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                        <CalendarDays size={14} /> {post.createdAt}
                    </p>
                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {post.content}
                    </p>
                </div>
            </section>
        </div>
    );
}