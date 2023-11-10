import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import type { ResponseVerificationData } from 'types/apis/verification';

export const fetchVerification = createAsyncThunk<ResponseVerificationData>(
  'verification/fetchVerification',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/acsess-to-admin${endpoints.amountObjectInCountry}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data as ResponseVerificationData;

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
