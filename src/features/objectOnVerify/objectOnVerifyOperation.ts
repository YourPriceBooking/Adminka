import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import type { ResponseVerificationDocument } from 'types/apis/objectOnVerify';

export const fetchVerifierData = createAsyncThunk(
  'objectOnVerify/fetchVerifier',
  async (id: string, { getState, rejectWithValue }) => {
    const authToken = getState() as RootState;
    try {
      const response = await axios.get(`${baseUrl}${endpoints.getIdVerificationObject}`, {
        params: { hotelsId: id },
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${authToken.enterToken.token}`,
        },
        withCredentials: true,
      });
      const data = response.data.result[0] as ResponseVerificationDocument;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
