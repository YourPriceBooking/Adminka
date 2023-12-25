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
            } else {
              const newObject = {
                [payload.country]: [
                  {
                    ...payload.result[payload.result.length - 1],
                  },
                ],
              };
              state.objects = newObject;
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
