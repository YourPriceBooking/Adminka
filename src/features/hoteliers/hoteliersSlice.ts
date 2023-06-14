import type { HoteliersState, Hoteliers, HotelsObjects } from 'types/apis';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { fetchHoteliers, fetchHotelsById } from './hoteliersOperation';


const hoteliersInitialState: HoteliersState = {
  hoteliers: [],
  isLoading: false,
  error: null,
};

const hoteliersSlice = createSlice({
  name: 'hoteliers',
  initialState: hoteliersInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHoteliers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchHoteliers.fulfilled, (state, { payload }: PayloadAction<Hoteliers>) => {
        state.isLoading = false;
        state.hoteliers = payload;
      })
      .addCase(fetchHoteliers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchHotelsById.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchHotelsById.fulfilled, (state, { payload }: PayloadAction<HotelsObjects>) => {
        state.isLoading = false;
        state.hoteliers = state.hoteliers.map(hotelier =>
          hotelier.owner === payload.ownerId ? { ...hotelier, hotels: payload.hotels } : hotelier
        );
      })
      .addCase(fetchHotelsById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
      
  },
});

export const hoteliersReducer = hoteliersSlice.reducer;
