import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

type ModalState = {
  openedModalCount: number;
};

const initialState: ModalState = {
  openedModalCount: 0,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    increaseModalCount: state => {
      state.openedModalCount += 1;
    },
    decreaseModalCount: state => {
      state.openedModalCount -= 1;
    },
    // openModal: state => void (state.showModal = true),
    // closeModal: state => void (state.showModal = false),
  },
});

export const { increaseModalCount, decreaseModalCount /* openModal, closeModal */ } =
  modalSlice.actions;

export const modalSliceReducer = modalSlice.reducer;

// export const selectShowModal = (state: RootState) => state.modal.showModal;
export const selectModalCount = (state: RootState) => state.modal.openedModalCount;
export const selectIsModalOpen = (state: RootState) => state.modal.openedModalCount > 0;
