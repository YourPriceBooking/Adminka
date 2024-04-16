import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { VerifyObjectsState, ResponseVerifyObjectsData } from 'types/apis/verifyObjects';
import { fetchVerifyObjects } from './verifyObjectsOperation';

const verifyObjectsInitialState: VerifyObjectsState = {
  amountObject: 0,
  isLoadingObjects: false,
  error: null,
};

const verifyObjectsSlice = createSlice({
  name: 'verifyObjects',
  initialState: verifyObjectsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVerifyObjects.pending, state => {
        state.isLoadingObjects = true;
      })
      .addCase(
        fetchVerifyObjects.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerifyObjectsData>) => {
          state.isLoadingObjects = false;
          state.amountObject = payload.amountObject;
        }
      )
      .addCase(fetchVerifyObjects.rejected, (state, { payload }) => {
        state.isLoadingObjects = false;
        state.error = payload;
      });
  },
});

export const verifyObjectsReducer = verifyObjectsSlice.reducer;
