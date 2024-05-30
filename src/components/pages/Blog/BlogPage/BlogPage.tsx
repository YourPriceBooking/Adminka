import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { getAllPosts } from 'features/blog/blogSelector';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from 'features/blog/blogOperation';
import { BlogContainer, Header, PostsList } from './Blog.styled';
import { Button } from './components/Button/Button';
import { ListItem } from './components/ListItem';

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
          <Button type="navigate" onClick={() => navigate(`/blog/post/authors`)}>
            Authors
          </Button>
        </div>
      </Header>

      <PostsList>
        {[...posts].map(post => (
          <ListItem key={post._id} post={post} onClick={() => navigate(`/blog/post/${post._id}`)} />
        ))}
      </PostsList>
    </BlogContainer>
  );
};
