import { createAsyncThunk } from '@reduxjs/toolkit';
import { blogBaseUrl } from 'features/api';
import axios from 'axios';

const pageTypes = ['home', 'ukraine', 'poland', 'usa', 'canada'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchBlogPosts = createAsyncThunk<any>(
  'blog/fetchBlogPosts',
  async (_, { rejectWithValue }) => {
    try {
      const requests = pageTypes.map(page =>
        axios.get(`${blogBaseUrl}/post/get-all?typeOfPage=${page}`, {
          withCredentials: true,
        })
      );

      const responses = await Promise.all(requests);

      const allPosts = responses.flatMap(response => response.data.result).reverse();

      return allPosts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
