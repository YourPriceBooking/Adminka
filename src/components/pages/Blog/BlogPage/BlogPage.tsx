import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { getAllPosts } from 'features/blog/blogSelector';
import { useNavigate } from 'react-router-dom';
import { fetchBlogPosts } from 'features/blog/blogOperation';
import { BlogContainer, Buttons, Header, PostsList } from './Blog.styled';
import { Button } from './components/Button/Button';
import { ListItem } from './components/ListItem';
import classes from '../AuthorsPage/AuthorsPage.module.css';

export const BlogPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('home');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const posts = useAppSelector(getAllPosts);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  const filteredPosts = selectedCountry
    ? posts.filter(post => post.country === selectedCountry)
    : posts;

  const countries = ['home', 'ukraine', 'poland', 'usa', 'canada', 'singapore', 'australia','uncharted-planet'];

  return (
    <BlogContainer>
      <Header className={classes.headerBlog}>
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
        <div>
          <Button type="navigate" onClick={() => navigate(`/blog/video-blog`)}>
            Video blogers
          </Button>
        </div>
      </Header>

      <Buttons>
        {countries.map(item => (
          <button
            key={item}
            onClick={() => setSelectedCountry(item)}
            type="button"
            className={selectedCountry === item ? 'active' : ''}
          >
            {item}
          </button>
        ))}
      </Buttons>

      <PostsList>
        {filteredPosts.map(post => (
          <ListItem
            key={post._id}
            country={post.country}
            post={post}
            onClick={() => navigate(`/blog/post/${post._id}`)}
          />
        ))}
      </PostsList>
    </BlogContainer>
  );
};
