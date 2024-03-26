import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Post } from 'components/pages/Blog/BlogPage/types/Post';
import { fetchBlogPosts } from './blogOperation';

type BlogState = {
  posts: Post[];
};

const initialState: BlogState = {
  posts: [
    {
      _id: '1',
      title: 'Your Price Booking in the our life',
      // publicationDate: new Date('12/10/2023'),
      // changeDate: new Date('12/10/2023'),
      author: 'Taras Shevchenko',
      imageUrl: 'https://www.bing.com/',
      description: 'ololololol',
      articleUrl: '',
    },
    {
      _id: '2',
      title: 'Your Price Booking in the our life',
      // publicationDate: new Date('12/10/2023'),
      // changeDate: new Date('12/10/2023'),
      author: 'Taras Shevchenko',
      imageUrl: 'https://www.bing.com/',
      description: 'ololololol',
      articleUrl: '',
    },
  ],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBlogPosts.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.posts = [...payload];
    });
  },
});

// export const { } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
