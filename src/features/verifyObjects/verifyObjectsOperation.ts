import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, endpoints } from 'features/api';
import type { RootState } from 'App/store';
import type { ResponseVerifyObjectsData } from 'types/apis/verifyObjects';

export const fetchVerifyObjects = createAsyncThunk<ResponseVerifyObjectsData>(
  'verifyObjects/fetchVerifyObjects',
  async (_, { rejectWithValue, getState }) => {
    try {
      const authToken = getState() as RootState;

      const response = await axios.get(
        `${baseUrl}/acsess-to-admin${endpoints.amountVerifyObject}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            Authorization: `Bearer ${authToken.enterToken.token!}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data as ResponseVerifyObjectsData;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
