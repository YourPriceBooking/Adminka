import type { PayloadAction} from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { BookingOptionsState, ResponseBookingOptionsData } from 'types/apis/bookingOptions';
import { fetchBookingOptions } from './bookingOptionsOperations';

const bookingOptionsInitialState: BookingOptionsState = {
  result: 0,
  isLoadingObjects: false,
  error: null,
};

const bookingOptionsSlice = createSlice({
  name: 'bookingOptions',
  initialState: bookingOptionsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBookingOptions.pending, state => {
        state.isLoadingObjects = true;
      })
      .addCase(
        fetchBookingOptions.fulfilled,
        (state, { payload }: PayloadAction<ResponseBookingOptionsData>) => {
          state.isLoadingObjects = false;
          state.result = payload.result;
        }
      )
      .addCase(fetchBookingOptions.rejected, (state, { payload }) => {
        state.isLoadingObjects = false;
        state.error = payload;
      });
  },
});

export const bookingOptionsReducer = bookingOptionsSlice.reducer;
