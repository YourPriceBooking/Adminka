import { createAsyncThunk } from '@reduxjs/toolkit';
import { blogBaseUrl } from 'features/api';
import axios from 'axios';

export const fetchBlogPosts = createAsyncThunk<any>(
  'blog/fetchBlogPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${blogBaseUrl}/post/get-all?page=1&limit=3`, {
        withCredentials: true,
      });

      const { data } = response;

      return data.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
