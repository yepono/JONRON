function getYoutubeEmbedUrl(mediaUrl) {
    try {
        const url = new URL(mediaUrl);
        let videoId = url.searchParams.get('v');

        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1);
        } else if (url.pathname.startsWith('/shorts/')) {
            videoId = url.pathname.split('/')[2];
        }

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
        return null;
    }
}

export default function PostCard({ post, mediaOnly = false }) {
    const { author, content, mediaUrl, createdAt } = post;
    const youtubeEmbedUrl = mediaUrl ? getYoutubeEmbedUrl(mediaUrl) : null;

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
                <div className="w-full aspect-video bg-slate-100 overflow-hidden">
                    {youtubeEmbedUrl ? (
                        <iframe
                            src={youtubeEmbedUrl}
                            title="Video de YouTube"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    ) : (
                        <img
                            src={mediaUrl}
                            alt="Contenido de publicación"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            )}
        </article>
    );
}