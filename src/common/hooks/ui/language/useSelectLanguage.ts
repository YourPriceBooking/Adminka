import { useCallback } from 'react';
import { useAppDispatch } from 'App';
import type { SelectLanguageType } from 'types/apis';
import { setActiveLangId } from 'features/common';

export const useSetActiveLanguage = (closeModal: () => void) => {
  const appDispatch = useAppDispatch();

  const setActiveLanguage = useCallback(
    (newActiveLangId: SelectLanguageType) => {
      if (!newActiveLangId) return;

      appDispatch(setActiveLangId(newActiveLangId));

      // if (activeLang.code === 'EN') { refetch() }

      closeModal();
    },
    [appDispatch, closeModal]
  );

  return setActiveLanguage;
};
