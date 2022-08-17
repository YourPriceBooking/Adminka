import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { incrementCounter } = counterSlice.actions;
export const counterSliceReducer = counterSlice.reducer;
export const selectCounterValue = (state: RootState) => state.counter.value;
