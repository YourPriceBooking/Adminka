import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    // showModal: false,
    openedModalCount: 0,
  },
  reducers: {
    increaseModalCount: state => void (state.openedModalCount += 1),
    decreaseModalCount: state => void (state.openedModalCount -= 1),
    // openModal: state => void (state.showModal = true),
    // closeModal: state => void (state.showModal = false),
  },
});

export const { increaseModalCount, decreaseModalCount /* openModal, closeModal */ } =
  modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;

// export const selectShowModal = (state: RootState) => state.modal.showModal;
export const selectModalCount = (state: RootState) => state.modal.openedModalCount;
