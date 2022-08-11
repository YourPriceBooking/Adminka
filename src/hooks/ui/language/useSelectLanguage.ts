import { useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux';
import type { SelectLanguageType } from 'types/apis';
import { setActiveLang } from 'redux/slices';

export const useSelectLanguage = (refetch: () => void, closeModal: () => void) => {
  const appDispatch = useAppDispatch();

  const selectLang = useCallback(
    (activeLang: SelectLanguageType) => {
      appDispatch(setActiveLang(activeLang));
      if (activeLang.code === 'EN') {
        refetch();
      }

      closeModal();
    },
    [appDispatch, closeModal, refetch]
  );

  return selectLang;
};
