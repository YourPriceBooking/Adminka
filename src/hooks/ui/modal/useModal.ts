import { useAppDispatch } from 'components/App';
import { useCallback, useMemo, useState } from 'react';

import { decreaseModalCount, increaseModalCount } from 'redux/slices';

export const useModal = () => {
  const appDispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    if (!showModal) {
      appDispatch(increaseModalCount());
    }

    setShowModal(true);
  }, [appDispatch, showModal, setShowModal]);

  const closeModal = useCallback(() => {
    if (showModal) {
      appDispatch(decreaseModalCount());
    }

    setShowModal(false);
  }, [appDispatch, showModal, setShowModal]);

  return useMemo(() => ({ showModal, openModal, closeModal }), [closeModal, openModal, showModal]);
};
