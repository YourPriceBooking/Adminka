import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Post } from 'components/pages/Blog/BlogPage/types/Post';
import { fetchBlogPosts } from './blogOperation';

type BlogState = {
  posts: Post[];
};

const initialState: BlogState = {
  posts: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(fetchBlogPosts.fulfilled, (state, { payload }: PayloadAction<any>) => {
      state.posts = [...payload];
    });
  },
});

// export const { } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
