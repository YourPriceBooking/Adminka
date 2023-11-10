import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ResponseVerificationData, VerificationState } from 'types/apis/verification';
import { fetchVerification } from './verificationOperation';

const verificationInitialState: VerificationState = {
  verification: {
    result: null,
  },
  isLoadingVerification: false,
  error: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState: verificationInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVerification.pending, state => {
        state.isLoadingVerification = true;
      })
      .addCase(
        fetchVerification.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationData>) => {
          state.isLoadingVerification = false;
          state.verification = { ...payload };
        }
      )
      .addCase(fetchVerification.rejected, (state, { payload }) => {
        state.isLoadingVerification = false;
        state.error = payload;
      });
  },
});

export const verificationReducer = verificationSlice.reducer;
