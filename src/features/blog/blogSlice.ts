import { createSlice } from '@reduxjs/toolkit';
import type { Post } from 'components/pages/Blog/BlogPage/types/Post';

type BlogState = {
  posts: Post[];
};

const initialState: BlogState = {
  posts: [
    {
      id: 1,
      title: 'Your Price Booking in the our life',
      publicationDate: new Date('12/10/2023'),
      changeDate: new Date('12/10/2023'),
      author: 'Taras Shevchenko',
      imageUrl: 'https://www.bing.com/',
      description: 'ololololol',
    },
    {
      id: 2,
      title: 'Your Price Booking in the our life',
      publicationDate: new Date('12/10/2023'),
      changeDate: new Date('12/10/2023'),
      author: 'Taras Shevchenko',
      imageUrl: 'https://www.bing.com/',
      description: 'ololololol',
    },
  ],
};

const blogSlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

// export const { } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
