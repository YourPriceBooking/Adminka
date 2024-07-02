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
  },
  types: null,
  isLoadingVerification: false,
  error: null,
};

const verificationSlice = createSlice({
  name: 'verification',
  initialState: verificationInitialState,
  reducers: {
    clearVerificationObject: state => {
      state.objects = {
        USA: [],
        Ukraine: [],
        Poland: [],
      };
    },
    deleteVerificationCountry: (state, { payload }: PayloadAction<{ country: string }>) => {
      delete state.objects[payload.country];
    },
  },
  extraReducers: builder => {
    // Обробники для fetchInWorkingVerifier
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
            if (state.objects) {
              if (state.objects[payload.country]) {
                state.objects[payload.country].push(
                  payload.result[
                    payload.result.length - (state.objects[payload.country].length + 1)
                  ]
                );
              } else {
                state.objects = {
                  ...state.objects,
                  [payload.country]: [
                    {
                      ...payload.result[payload.result.length - 1],
                    },
                  ],
                };
              }
            }

            if (state.verification.onVerification) {
              const countryList = state.objects[payload.country];

              const newCout = payload.result.length - countryList.length;

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

export const { clearVerificationObject, deleteVerificationCountry } = verificationSlice.actions;

export const verificationReducer = verificationSlice.reducer;
