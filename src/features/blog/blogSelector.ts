import type { RootState } from 'App/store';

export const getPost = (state: RootState, id: number) => {
  const { posts } = state.blog;

  return posts.find(post => post.id === id);
};
