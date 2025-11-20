import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import type { ResponseVerificationDocument } from 'types/apis/objectOnVerify';

export const fetchVerifierData = createAsyncThunk(
  'objectOnVerify/fetchVerifier',
  async (id: string, { getState, rejectWithValue }) => {
    const rootState = getState() as RootState;
    try {
      const response = await axios.get(`${baseUrl}${endpoints.getIdVerificationObject}`, {
        params: { hotelsId: id },
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${rootState.enterToken.token}`,
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

export const addTranslation = createAsyncThunk(
  'objectOnVerify/addTranslation',
  async (
    { id, description, languages }: { id: string; description: string; languages: string[] },
    { getState, rejectWithValue }
  ) => {
    const rootState = getState() as RootState;
    try {
      const response = await axios.patch(
        `${baseUrl}${endpoints.addATranslation}`,
        { id, description, languages },
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${rootState.enterToken.token}`,
          },
          withCredentials: true,
        }
      );

      const data = response.data.translate as Record<string, string>;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
