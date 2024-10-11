import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from 'assets/icons/ArrowBack.svg';
import classes from './VideoBlogPage.module.css';
import { BlogContainer, Header, Buttons, PostsList } from '../BlogPage/Blog.styled';
import { Button } from '../BlogPage/components/Button/Button';
import { VideoListItem } from './components/VideoListItem';

export const countries = ['ukraine', 'poland', 'usa', 'canada', 'australia'];

const VideoBlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string>('ukraine');

  const videoPosts = [
    {
      _id: 1,
      country: 'ukraine',
      title: 'Title',
      date: '10.10.2024',
      heading: 'Heading H1',
      url: 'URL Video',
      description:
        "Embark on a virtual odyssey with 'Exploring Horizons,' a collection of captivating tales from intrepid travelers. From vibrant Marrakech to serene Patagonia, immerse yourself in diverse cultures and breathtaking landscapes. Join the journey today!",
    },
  ];

  return (
    <BlogContainer>
      <Header>
        <div className={classes.handleClickToBack}>
          <img onClick={() => navigate('/blog')} src={backArrow} alt="arrow" aria-hidden="true" />
        </div>
        <div className={classes.addVideoBtn}>
          <Button type="navigate" onClick={() => navigate(`/blog/video-blog/add-video-post`)}>
            ADD NEW VIDEO
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
        {videoPosts.map(post => (
          <VideoListItem
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

export default VideoBlogPage;
