import { useState } from 'react';

function getYoutubeEmbedUrl(mediaUrl) {
    try {
        const url = new URL(mediaUrl);
        let videoId = url.searchParams.get('v');

        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1);
        } else if (url.pathname.startsWith('/shorts/')) {
            videoId = url.pathname.split('/')[2];
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}?controls=1&rel=0` : null;
    } catch {
        return null;
    }
}

export default function PostCard({ post, mediaOnly = false }) {
    const [effectsOpen, setEffectsOpen] = useState(false);
    const [selectedEffect, setSelectedEffect] = useState('none');
    const { author, content, mediaUrl, createdAt } = post;
    const youtubeEmbedUrl = mediaUrl ? getYoutubeEmbedUrl(mediaUrl) : null;

    const effects = [
        { id: 'rainbow', label: 'Efecto arcoiris' },
        { id: 'pink', label: 'Efecto rosa' },
        { id: 'blur', label: 'Efecto blur' },
        { id: 'invert', label: 'Colores invertidos' },
    ];

    const selectEffect = (effect) => {
        setSelectedEffect(effect);
        setEffectsOpen(false);
    };

    return (
        <article className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4">
            {!mediaOnly && (
                <>
                    <div className="p-3 flex items-center gap-3">
                        <img
                            src={author.avatarUrl}
                            alt={author.name}
                            className="w-10 h-10 rounded-full object-cover border border-blue-100"
                        />
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-800 leading-tight">
                                {author.name}
                            </h4>
                            <p className="text-xs text-slate-500 truncate">{author.tagline}</p>
                        </div>
                        <span className="text-[10px] text-slate-400">{createdAt}</span>
                    </div>

                    <p className="px-3 pb-2 text-xs text-slate-600 leading-relaxed">
                        {content}
                    </p>
                </>
            )}

            {/* Imagen multimedia */}
            {mediaUrl && (
                <div className="relative w-full aspect-video bg-slate-100 overflow-visible">
                    <div className="w-full h-full overflow-hidden">
                        {youtubeEmbedUrl ? (
                            <iframe
                                src={youtubeEmbedUrl}
                                title="Video de YouTube"
                                className={`relative z-0 block w-full h-full ${selectedEffect === 'pink' ? 'sepia saturate-200 hue-rotate-290' : ''} ${selectedEffect === 'invert' ? 'invert' : ''} ${selectedEffect === 'blur' ? 'blur-sm' : ''}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                loading="lazy"
                                allowFullScreen
                            />
                        ) : (
                            <img
                                src={mediaUrl}
                                alt="Contenido de publicación"
                                className={`w-full h-full object-cover ${selectedEffect === 'pink' ? 'sepia saturate-200 hue-rotate-290' : ''} ${selectedEffect === 'invert' ? 'invert' : ''} ${selectedEffect === 'blur' ? 'blur-sm' : ''}`}
                            />
                        )}
                        {selectedEffect === 'rainbow' && (
                            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(120deg,rgba(255,0,0,0.3),rgba(255,165,0,0.3),rgba(255,255,0,0.3),rgba(0,128,0,0.3),rgba(0,0,255,0.3),rgba(128,0,128,0.3))] mix-blend-color" />
                        )}
                    </div>

                    {mediaOnly && (
                        <div className="absolute top-2 right-2 z-10">
                            <button
                                type="button"
                                aria-expanded={effectsOpen}
                                aria-haspopup="menu"
                                aria-label="Abrir efectos de imagen"
                                onClick={() => setEffectsOpen((open) => !open)}
                                className="flex h-9 w-20 items-center justify-center rounded-full bg-black/70 text-lg text-white shadow-md transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-white"
                            >
                                <span aria-hidden="true">Efectos</span>
                            </button>
                        </div>
                    )}
                </div>
            )}

            {mediaOnly && effectsOpen && (
                <div className="border-t border-slate-100 bg-white p-2" role="menu">
                    <div className="flex flex-col gap-1">
                        {effects.map((effect) => (
                            <button
                                key={effect.id}
                                type="button"
                                role="menuitem"
                                onClick={() => selectEffect(effect.id)}
                                className={`w-full rounded-md px-3 py-2 text-left text-xs transition hover:bg-slate-100 ${selectedEffect === effect.id ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-600'}`}
                            >
                                {effect.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </article>
    );
}