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

        payload.result.forEach((obj: any) => {
          const newObject: VerificationObject = {
            address: obj.hotels.address,
            _id: obj._id,
            type: obj.hotels.type,
            objectName: obj.objectName,
            photos: obj.hotels.photos,
          };

          if (obj.hotels.location.international === 'USA') {
            if (!state.objects.USA.some(item => item._id === newObject._id)) {
              state.objects.USA.push(newObject);
            }
          } else if (obj.hotels.location.international === 'Ukraine') {
            if (!state.objects.Ukraine.some(item => item._id === newObject._id)) {
              state.objects.Ukraine.push(newObject);
            }
          } else if (obj.hotels.location.international === 'Poland') {
            if (!state.objects.Poland.some(item => item._id === newObject._id)) {
              state.objects.Poland.push(newObject);
            }
          } else if (obj.hotels.location.international === 'Singapore') {
            if (!state.objects.Singapore.some(item => item._id === newObject._id)) {
              state.objects.Singapore.push(newObject);
            }
          } else if (obj.hotels.location.international === 'Australia') {
            if (!state.objects.Australia.some(item => item._id === newObject._id)) {
              state.objects.Australia.push(newObject);
            }
          } else if (obj.hotels.location.international === 'Canada') {
            if (!state.objects.Canada.some(item => item._id === newObject._id)) {
              state.objects.Canada.push(newObject);
            }
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
