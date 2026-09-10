import { useState, useEffect } from 'react';
import PostCard from '../components/home/PostCard';
import { getVideos } from '../services/postService';
import Header from '../components/layout/Header';



export default function Videos() {
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

  return (
    
    <div className="min-h-screen bg-slate-50 pb-6">
      <Header />
      <section className="mt-6 px-4">
        <h2 className="text-sm font-bold text-slate-700 mb-3">Videos recientes</h2>

        {loading ? (
          <div className="text-center py-6 text-xs text-slate-400">Cargando noticias...</div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} mediaOnly />)
        )}
      </section>
    </div>
  );
}