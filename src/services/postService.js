import mockVideos from '../data/videos.json';
import { supabase } from './supabaseClient';

function formatRelativeDate(value) {
  const publishedDate = new Date(value);
  if (Number.isNaN(publishedDate.getTime())) return '';

  const differenceInSeconds = Math.round((publishedDate.getTime() - Date.now()) / 1000);
  const formatter = new Intl.RelativeTimeFormat('es-MX', { numeric: 'auto' });
  const units = [
    { limit: 60, seconds: 1, unit: 'second' },
    { limit: 3600, seconds: 60, unit: 'minute' },
    { limit: 86400, seconds: 3600, unit: 'hour' },
    { limit: 604800, seconds: 86400, unit: 'day' },
  ];
  const unit = units.find(({ limit }) => Math.abs(differenceInSeconds) < limit);

  if (unit) {
    return formatter.format(Math.round(differenceInSeconds / unit.seconds), unit.unit);
  }

  return publishedDate.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
}

export const getPosts = async () => {
  if (!supabase) {
    throw new Error('Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para conectar Supabase.');
  }

  const { data, error } = await supabase
    .from('publications')
    .select('id, username, category, published_at, img, description, title')
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(`No se pudieron cargar las publicaciones: ${error.message}`);
  }

  return data.map((publication) => ({
    id: publication.id,
    title: publication.title,
    author: {
      name: publication.username,
      tagline: publication.category,
    },
    content: publication.description ?? '',
    mediaUrl: publication.img,
    createdAt: formatRelativeDate(publication.published_at),
  }));
};

export const getVideos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockVideos]);
    }, 200);
  });
};