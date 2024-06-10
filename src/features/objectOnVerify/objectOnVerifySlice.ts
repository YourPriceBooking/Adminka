import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type {
  ResponseVerificationDocument,
  VerificationDocumentState,
} from 'types/apis/objectOnVerify';
import { fetchVerifierData } from './objectOnVerifyOperation';

const initialState: VerificationDocumentState = {
  isLoading: false,
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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVerifierData.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchVerifierData.fulfilled,
        (state, { payload }: PayloadAction<ResponseVerificationDocument>) => {
          state.isLoading = false;
          state.data = payload;
        }
      )
      .addCase(fetchVerifierData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const objectOnVerifyReducer = objectOnVerifySlice.reducer;
