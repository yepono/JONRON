import mockPosts from '../data/posts.json';
import mockVideos from '../data/videos.json';


export const getPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPosts]);
    }, 200);
  });
};

export const getVideos = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockVideos]);
    }, 200);
  });
};