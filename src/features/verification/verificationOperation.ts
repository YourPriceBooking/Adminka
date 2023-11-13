import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import type {
  ResponseVerificationCountryList,
  ResponseVerificationObject,
  ResponseVerificationTypeObjects,
} from 'types/apis/verification';

export const fetchVerification = createAsyncThunk<ResponseVerificationCountryList>(
  'verification/fetchVerification',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/acsess-to-admin${endpoints.amountObjectInCountry}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data as ResponseVerificationCountryList;

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchVerificationObject = createAsyncThunk<ResponseVerificationObject, string>(
  'verification/fetchVerificationObject',
  async (country: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/acsess-to-admin${endpoints.verificationObjects}?country=${country}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data as ResponseVerificationObject;

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchObjectTypes = createAsyncThunk<ResponseVerificationTypeObjects>(
  'verification/fetchObjectTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}${endpoints.getObjectTypes}?search=en`, {
        withCredentials: true,
      });

      const data = response.data as ResponseVerificationTypeObjects;

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
