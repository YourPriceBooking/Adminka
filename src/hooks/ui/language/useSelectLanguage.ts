import { useCallback } from 'react';
import { useAppDispatch } from 'components/App';
import type { SelectLanguageType } from 'types/apis';
import { setActiveLang } from 'redux/slices';

export const useSelectLanguage = (closeModal: () => void) => {
  const appDispatch = useAppDispatch();

  const selectLang = useCallback(
    (activeLang: SelectLanguageType) => {
      if (!activeLang) return;

      appDispatch(setActiveLang(activeLang));

      // if (activeLang.code === 'EN') { refetch() }

      closeModal();
    },
    [appDispatch, closeModal]
  );

  return selectLang;
};
