import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'App/store';

interface Email {
  email: string;
  objects: boolean;
  languages: boolean;
  statistics: boolean;
  finance: boolean;
  blog: boolean;
}

interface EmailsState {
  emails: Email[];
}

const initialState: EmailsState = {
  emails: [],
};

const emailsSlice = createSlice({
  name: 'emails',
  initialState,
  reducers: {
    addEmail: (state, action: PayloadAction<Email>) => {
      state.emails.push(action.payload);
    },
  },
});

export const { addEmail } = emailsSlice.actions;
export const accessReducer = emailsSlice.reducer;
export const selectEmailSlice = (state: RootState) => state.access.emails;
