import type { AmountOfBonus, ResponseFinanceAmountOfBonus } from 'types/apis/finance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, endpoints } from 'features/api';
import axios from 'axios';
import type { RootState } from 'App/store';

export const fetchTotalBonus = createAsyncThunk<AmountOfBonus>(
  'finance/fetchTotalBonus',
  async (_, { rejectWithValue, getState }) => {
    try {
      const authToken = getState() as RootState;

      const response = await axios.get(`${baseUrl}/acsess-to-admin${endpoints.getTotalBonus}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
          Authorization: `Bearer ${authToken.enterToken.token!}`,
        },
        withCredentials: true,
      });
      const data = response.data as ResponseFinanceAmountOfBonus;
      return data.amountOfBonus[0];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
