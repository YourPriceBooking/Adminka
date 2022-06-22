import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from 'redux/store';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },

  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) =>
      void (state.value += action.payload),
  },
});

export const { incrementCounter } = counterSlice.actions;
export const counterSliceReducer = counterSlice.reducer;
// export const selectCounterValue = (state: RootState) => state.counter.value;
