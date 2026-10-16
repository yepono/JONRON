import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import CategoryGrid from '../components/home/CategoryGrid';
import PostCard from '../components/home/PostCard';
import { getPosts } from '../services/postService';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
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
  const filteredPosts = posts.filter((post) => {
    const searchableText = [post.author?.name, post.author?.tagline, post.content]
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
        <h2 className="text-sm font-bold text-slate-700 mb-3">Publicaciones</h2>

        {loading ? (
          <div className="text-center py-6 text-xs text-slate-400">Cargando noticias...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-xl bg-white p-5 text-center text-xs text-slate-500">
            No hay publicaciones que coincidan con “{searchQuery}”.
          </div>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>
    </div>
  );
}