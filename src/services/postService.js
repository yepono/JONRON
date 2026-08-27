import mockPosts from '../data/posts.json';

export const getPosts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockPosts]);
    }, 200);
  });
};