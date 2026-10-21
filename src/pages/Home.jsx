import { useState, useEffect, useCallback } from 'react';
import Header from '../components/layout/Header';
import CategoryGrid from '../components/home/CategoryGrid';
import PostCard from '../components/home/PostCard';
import { getPosts } from '../services/postService';
import { ADMIN_SESSION_CHANGED_EVENT, getAdminSession } from '../services/adminAuthService';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PostDetailModal from '../components/home/PostDetailModal';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => Boolean(getAdminSession()));
  const [selectedPost, setSelectedPost] = useState(null);

  const closePostModal = useCallback(() => setSelectedPost(null), []);

  useEffect(() => {
    const syncAdminSession = () => setIsAdmin(Boolean(getAdminSession()));
    window.addEventListener(ADMIN_SESSION_CHANGED_EVENT, syncAdminSession);
    window.addEventListener('storage', syncAdminSession);
    return () => {
      window.removeEventListener(ADMIN_SESSION_CHANGED_EVENT, syncAdminSession);
      window.removeEventListener('storage', syncAdminSession);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error al cargar publicaciones:', error);
        setLoadError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const normalizedQuery = searchQuery.trim().toLocaleLowerCase('es');
  const filteredPosts = posts.filter((post) => {
    const searchableText = [post.title, post.author?.name, post.author?.tagline, post.content]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('es');
    return searchableText.includes(normalizedQuery);
  });

  return (
    <div className="min-h-full bg-slate-50 pb-6">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CategoryGrid />

      <section className="mt-6 px-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-700">Publicaciones</h2>
          {isAdmin && (
            <Link
              to="/admin/publicar"
              className="inline-flex items-center gap-1 rounded-lg bg-[#0047AB] px-3 py-2 text-[11px] font-bold text-white shadow-sm transition hover:bg-blue-800"
            >
              <Plus size={14} />
              Nueva publicación
            </Link>
          )}
        </div>

        {loading ? (
          <div className="text-center py-6 text-xs text-slate-400">Cargando noticias...</div>
        ) : loadError ? (
          <div role="alert" className="rounded-xl bg-white p-5 text-center text-xs text-red-700">
            {loadError}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-xl bg-white p-5 text-center text-xs text-slate-500">
            No hay publicaciones que coincidan con “{searchQuery}”.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onReadMore={() => setSelectedPost(post)} />
          ))
        )}
      </section>

      <PostDetailModal post={selectedPost} onClose={closePostModal} />
    </div>
  );
}