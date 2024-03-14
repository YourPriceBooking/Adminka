import type { RootState } from 'App/store';
import type { Post } from 'components/pages/Blog/BlogPage/types/Post';

export const getPost = (state: RootState, id: string) => {
  if (id === 'new') {
    return {
      id: 0,
      title: '',
      publicationDate: new Date('12/10/2023'),
      changeDate: new Date('12/10/2023'),
      author: '',
      imageUrl: '',
      description: '',
    };
  }

  const { posts } = state.blog;

  return posts.find((post: Post) => post.id === Number(id));
};

export const getAllPosts = (state: RootState) => state.blog.posts;
