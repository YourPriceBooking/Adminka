import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import axios from 'axios';
import type { ResponseBookingOptionsData } from 'types/apis/bookingOptions';
import { baseUrl, endpoints } from 'features/api';

export const fetchBookingOptions = createAsyncThunk<ResponseBookingOptionsData>(
  'bookingObjects/fetchBookingObjects',
  async (_, { rejectWithValue, getState }) => {
    try {
      const authToken = getState() as RootState;

      const response = await axios.get(`${baseUrl}/acsess-to-admin${endpoints.bookingOptions}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${authToken.enterToken.token!}`,
        },
        withCredentials: true,
      });
      const data = response.data as ResponseBookingOptionsData;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
