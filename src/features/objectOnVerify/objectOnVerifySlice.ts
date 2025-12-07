import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  ResponseVerificationDocument,
  VerificationDocumentState,
} from 'types/apis/objectOnVerify';
import { addTranslation, fetchVerifierData } from './objectOnVerifyOperation';

const initialState: VerificationDocumentState = {
  isLoading: false,
  isPendingTranslate: false,
  error: null,
  data: {
    hotels: {
      address: {
        country: '',
        state: '',
        city: '',
        street: '',
        house: '',
        apartment: '',
        zipCode: '',
        phone: '',
        email: '',
      },
      location: {
        cityName: '',
        stateName: '',
        country: '',
        international: '',
        _id: '',
      },
      type: { id: '', type: '' },
      _id: '',
      objectName: '',
      photos: [],
      payments: [],
      services: [],
      language: 'en',
      status: '',
      time: { checkin: '', checkout: '' },
      description: '',
      translation: {},
    },
    video: [],
    documents: [],
    selfie: [],
    link: [],
    owner: '',
    createdAt: '',
    updatedAt: '',
    pointOnTheMap: '',
    youTubeLink: '',
    nextVerificationDate: '',
    phone1: '',
    phone2: '',
    chatHistory: {
      hotelier: [],
      verifier: [],
    },
  },
};

const objectOnVerifySlice = createSlice({
  name: 'objectOnVerify',
  initialState,
  reducers: {
    clearObjectOnVerify: state => {
      state.data = initialState.data;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchVerifierData.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchVerifierData.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationDocument>) => {
          state.isLoading = false;
          if (payload && payload.hotels) {
            state.data = payload;
            state.data.hotels.translation = {
              original: payload.hotels.description || '',
              ...(payload.hotels.translation || {}),
            };
          }
        }
      )
      .addCase(fetchVerifierData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addTranslation.pending, state => {
        state.isPendingTranslate = true;
      })
      .addCase(
        addTranslation.fulfilled,
        (state, { payload }: PayloadAction<Record<string, string>>) => {
          state.isPendingTranslate = false;
          state.data.hotels.translation = { original: state.data.hotels.description, ...payload };
        }
      )
      .addCase(addTranslation.rejected, (state, { payload }) => {
        state.isPendingTranslate = false;
        state.error = payload;
      });
  },
});

export const { clearObjectOnVerify } = objectOnVerifySlice.actions;
export const objectOnVerifyReducer = objectOnVerifySlice.reducer;
