import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { getAllPosts } from 'features/blog/blogSelector';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from 'features/blog/blogOperation';
import { BlogContainer, Header, PostsList } from './Blog.styled';
import { Button } from './components/Button/Button';
import { ListItem } from './components/ListItem';

const mockLanguage = [
  {
    id: 0,
    code: 'EN',
    isActive: true,
  },
  {
    id: 1,
    code: 'PL',
  },
  {
    id: 2,
    code: 'UA',
  },
  {
    id: 3,
    code: 'RU',
  },
];
export const BlogPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const posts = useAppSelector(getAllPosts);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  return (
    <BlogContainer>
      <Header>
        <div>
          <Button type="navigate" onClick={() => navigate(`/blog/post/new`)}>
            Add New
          </Button>
          <p>PUBLICATIONS</p>
        </div>
        <div>
          {mockLanguage.map(lang => (
            <Button key={lang.id} type="navigate" onClick={() => console.log(lang.code)}>
              {lang.code}
            </Button>
          ))}
        </div>
      </Header>

      <PostsList>
        {[...posts].reverse().map(post => (
          <ListItem key={post._id} post={post} onClick={() => navigate(`/blog/post/${post._id}`)} />
        ))}
      </PostsList>
    </BlogContainer>
  );
};
