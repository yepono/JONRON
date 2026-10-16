import { useState, useEffect } from 'react';
import PostCard from '../components/home/PostCard';
import { getVideos } from '../services/postService';
import Header from '../components/layout/Header';



export default function Videos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getVideos();
        setPosts(data);
      } catch (error) {
        console.error('Error al cargar publicaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('es');
  const filteredVideos = posts.filter((video) =>
    [video.mediaUrl, video.author?.name, video.content]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('es')
      .includes(normalizedQuery),
  );

  return (
    
    <div className="min-h-full bg-slate-50 pb-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchPlaceholder="Buscar videos por URL o ID..."
      />
      <section className="mt-6 px-4">
        <h2 className="text-sm font-bold text-slate-700 mb-3">Videos recientes</h2>

        {loading ? (
          <div className="text-center py-6 text-xs text-slate-400">Cargando noticias...</div>
        ) : filteredVideos.length === 0 ? (
          <div className="rounded-xl bg-white p-5 text-center text-xs text-slate-500">
            No hay videos que coincidan con “{searchQuery}”. Busca por URL o identificador del video.
          </div>
        ) : (
          filteredVideos.map((post) => <PostCard key={post.id} post={post} mediaOnly />)
        )}
      </section>
    </div>
  );
}