import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from 'assets/icons/ArrowBack.svg';
import classes from './VideoPostAddPage.module.css';
import { BlogContainer, Header } from '../BlogPage/Blog.styled';
import { countries } from '../VideoBlogPage/VideoBlogPage';

const filters: string[] = [
  'City Travel',
  'Nature and National Parks',
  'Adventure Tourism',
  'Budget Travel',
  'Luxury Travel',
  'Culinary Tourism',
  'Cultural Tours',
  'Historical Sites and Archaeological Excavations',
  'Family Travel',
  'Senior Travel',
  'Business Tourism',
  'Hitchhiking and Vanlife',
  'Digital Nomads',
  'Ecotourism and Sustainable Tourism',
  'Seasonal Travel',
  'Wellness Tourism',
  'Water Travel',
  'Film Tourism',
  'Literary Tourism',
  'Music Tourism',
  'Military Tourism',
  'Adult Tourism',
  'Agritourism',
  'Medical Tourism',
  'Religious and Pilgrimage Tourism',
];

const VideoPostAddPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSelectFilter = (newFilter: string) => {
    if (selectedFilters.includes(newFilter)) {
      setSelectedFilters(prev => prev.filter(item => item !== newFilter));
    } else {
      setSelectedFilters(prev => [...prev, newFilter]);
    }
  };
  return (
    <BlogContainer>
      <Header>
        <div className={classes.handleClickToBack}>
          <img
            onClick={() => navigate('/blog/video-blog')}
            src={backArrow}
            alt="arrow"
            aria-hidden="true"
          />
        </div>
      </Header>
      <div className={classes.formWrapper}>
        <div className={classes.submitButtonsWrapper}>
          <button type="submit">Submit</button>
          <button type="submit">Add later</button>
        </div>

        <div className={classes.inputsWrapper}>
          <div className={classes.inputWrapper}>
            <label htmlFor="heading">Heading H1</label>
            <input type="text" id="heading" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="video">URL video</label>
            <input type="text" id="video" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value=""> </option>

              {countries.map((item: string) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={classes.filtersWrapper}>
          {filters.map((item: string) => (
            <button
              type="submit"
              onClick={() => handleSelectFilter(item)}
              className={selectedFilters.includes(item) ? classes.active : ''}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </BlogContainer>
  );
};

export default VideoPostAddPage;
