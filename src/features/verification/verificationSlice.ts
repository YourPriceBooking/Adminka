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
    onVerification: null,
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
      // SET VERIFICATION OBJECTS
      .addCase(
        fetchVerificationObject.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationObject>) => {
          let countryObjectsCount = -1;

          if (state.verification.onVerification) {
            countryObjectsCount = state.verification.onVerification[payload.country];
          }

          if (countryObjectsCount !== 0) {
            if (state.objects.length > 0) {
              const findCountry = state.objects.filter(
                object => object.country === payload.country
              );

              if (findCountry.length > 0) {
                state.objects.push({
                  country: payload.country,
                  result: { ...payload.result[payload.result.length - (findCountry.length + 1)] },
                });
              } else {
                state.objects.push({
                  country: payload.country,
                  result: { ...payload.result[payload.result.length - 1] },
                });
              }
            } else {
              state.objects.push({
                country: payload.country,
                result: { ...payload.result[payload.result.length - 1] },
              });
            }

            if (state.verification.onVerification) {
              const findCountry = state.objects.filter(
                object => object.country === payload.country
              );

              const newCout = payload.result.length - findCountry.length;

              state.verification.onVerification[payload.country] = newCout;
            }
          }
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
