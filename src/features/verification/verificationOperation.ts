import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl, endpoints } from 'features/api';
import { logout } from 'features/common/auth/authSlice';
import { setToken } from 'features/access/tokenSlice';
import type {
  ResponseVerificationCountryList,
  ResponseVerificationObject,
  ResponseVerificationTypeObjects,
  ResponseInWorkingCountryList,
  RequestInWorkingCountry,
} from 'types/apis/verification';

const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Unexpected error occurred';
};

export const fetchVerification = createAsyncThunk<ResponseVerificationCountryList>(
  'verification/fetchVerification',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/acsess-to-admin${endpoints.amountObjectInCountry}`,
        { withCredentials: true }
      );

      if (!response.data) throw new Error('No data in response');

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchVerificationObject = createAsyncThunk<ResponseVerificationObject, string>(
  'verification/fetchVerificationObject',
  async (country: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/acsess-to-admin${endpoints.verificationObjects}?country=${country}`,
        { withCredentials: true }
      );

      if (!response.data) throw new Error('No data in response');

      return { ...response.data, country };
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
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

      if (!response.data) throw new Error('No data in response');

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchInWorkingVerifier = createAsyncThunk<ResponseInWorkingCountryList>(
  'verification/fetchInWorkingVerifier',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const currentState: any = getState();
      const { token } = currentState.enterToken;

      const response = await axios.get(`${baseUrl}${endpoints.objectInWorkingByVerifier}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) throw new Error('No data in response');

      return response.data;
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      const serverMessage = error?.response?.data?.message;

      if (
        errorMessage === 'jwt expired' ||
        errorMessage === 'jwt malformed' ||
        serverMessage === 'jwt expired' ||
        serverMessage === 'jwt malformed'
      ) {
        dispatch(setToken(null));
        dispatch(logout());
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchObjectInWorking = createAsyncThunk<RequestInWorkingCountry, object>(
  'verification/fetchObjectInWorking',
  async (takeObject: object, { getState, rejectWithValue }) => {
    try {
      const currentState: any = getState();
      const { token } = currentState.enterToken;

      const response = await axios.post(`${baseUrl}${endpoints.objectInWorking}`, takeObject, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) throw new Error('No data in response');

      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
