import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  ResponseVerificationCountryList,
  ResponseVerificationObject,
  ResponseVerificationTypeObjects,
  VerificationObject,
  VerificationState,
} from 'types/apis/verification';
import {
  fetchObjectTypes,
  fetchVerification,
  fetchVerificationObject,
  fetchInWorkingVerifier,
} from './verificationOperation';

const verificationInitialState: VerificationState = {
  verification: {
    onVerification: null,
    added: null,
    amountOfAdded: 0,
    amountOnVerification: 0,
  },
  objects: {
    USA: [],
    Ukraine: [],
    Poland: [],
    Singapore: [],
    Australia: [],
    Canada: [],
  },
  types: null,
  isLoadingVerification: false,
  error: null,
};

const forcedCountries = ['Australia', 'Singapore', 'Canada'];

const verificationSlice = createSlice({
  name: 'verification',
  initialState: verificationInitialState,
  reducers: {
    clearVerificationObject: state => {
      state.objects = {
        USA: [],
        Ukraine: [],
        Poland: [],
        Singapore: [],
        Australia: [],
        Canada: [],
      };
    },
    deleteVerificationCountry: (state, { payload }: PayloadAction<{ country: string }>) => {
      delete state.objects[payload.country];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInWorkingVerifier.pending, state => {
        state.isLoadingVerification = true;
      })
      .addCase(fetchInWorkingVerifier.fulfilled, (state, { payload }) => {
        state.isLoadingVerification = false;

        const resultArray = Array.isArray(payload.result)
          ? payload.result
          : payload.result?.result || [];

        resultArray.forEach((obj: any) => {
          if (!obj || !obj.hotels || !obj.hotels.location || !obj.hotels._id) {
            return;
          }

          const country = obj.hotels.location.international;

          if (!country || typeof country !== 'string') {
            return;
          }

          const newObject: VerificationObject = {
            address: obj.hotels.address,
            _id: obj.hotels._id,
            type: obj.hotels.type,
            objectName: obj.objectName,
            photos: obj.hotels.photos,
          };

          if (!state.objects[country]) {
            state.objects[country] = [];
          }

          if (!state.objects[country].some(item => item._id === newObject._id)) {
            state.objects[country].push(newObject);
          }
        });
      })
      .addCase(fetchInWorkingVerifier.rejected, (state, { payload }) => {
        state.isLoadingVerification = false;
        state.error = payload;
      });
    builder
      .addCase(fetchVerification.pending, state => {
        state.isLoadingVerification = true;
      })
      .addCase(
        fetchVerification.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationCountryList>) => {
          state.isLoadingVerification = false;
          const verification = { ...payload };

          forcedCountries.forEach(country => {
            if (!verification.onVerification[country]) {
              verification.onVerification = {
                ...verification.onVerification,
                [country]: 0,
              };
            }
            if (!verification.added[country]) {
              verification.added = {
                ...verification.added,
                [country]: 0,
              };
            }
          });

          state.verification = verification;
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
          if (!state.objects[payload.country]) {
            state.objects[payload.country] = [];
          }

          if (state.objects[payload.country].length >= 5) {
            return;
          }

          const takenCount = state.objects[payload.country].length;
          const nextObject = payload.result[takenCount];

          if (nextObject) {
            state.objects[payload.country].push(nextObject);
          }

          if (state.verification.onVerification) {
            state.verification.onVerification[payload.country] =
              state.objects[payload.country].length;
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

export const { clearVerificationObject, deleteVerificationCountry } = verificationSlice.actions;

export const verificationReducer = verificationSlice.reducer;
