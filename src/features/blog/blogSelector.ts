import type { RootState } from 'App/store';
import type { Post } from 'components/pages/Blog/BlogPage/types/Post';

export const getPost = (state: RootState, id: string) => {
  const { posts } = state.blog;

  return posts.find((post: Post) => post._id === id);
};

export const getAllPosts = (state: RootState) => state.blog.posts;
