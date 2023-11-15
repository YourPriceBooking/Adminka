import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  ResponseVerificationCountryList,
  ResponseVerificationObject,
  ResponseVerificationTypeObjects,
  VerificationState,
} from 'types/apis/verification';
import {
  fetchObjectTypes,
  fetchVerification,
  fetchVerificationObject,
} from './verificationOperation';

const verificationInitialState: VerificationState = {
  verification: {
    result: null,
  },
  objects: [],
  types: null,
  isLoadingVerification: false,
  error: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState: verificationInitialState,
  reducers: {
    clearVerificationObject: state => {
      state.objects = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVerification.pending, state => {
        state.isLoadingVerification = true;
      })
      .addCase(
        fetchVerification.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationCountryList>) => {
          state.isLoadingVerification = false;
          state.verification = { ...payload };
        }
      )
      .addCase(fetchVerification.rejected, (state, { payload }) => {
        state.isLoadingVerification = false;
        state.error = payload;
      })
      // GET VERIFICATION OBJECTS
      .addCase(
        fetchVerificationObject.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationObject>) => {
          state.objects.push({
            result: { ...payload.result[payload.result.length - 1] },
          });
        }
      )

      // GET TYPES OBJECT
      .addCase(
        fetchObjectTypes.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationTypeObjects>) => {
          state.types = payload.data;
        }
      );
  },
});

export const { clearVerificationObject } = verificationSlice.actions;

export const verificationReducer = verificationSlice.reducer;
