import { useCallback } from 'react';
import { useAppDispatch } from 'App';
import type { SelectLanguageType } from 'types/apis';
import { setActiveLanguageId } from 'features/languages';
import { setActiveCountryId } from 'features/countries';

export const useSetActiveLanguage = (closeModal: () => void) => {
  const appDispatch = useAppDispatch();

  const setActiveLanguage = useCallback(
    (newActiveLanguageId: SelectLanguageType) => {
      if (!newActiveLanguageId) return;

      appDispatch(setActiveLanguageId(newActiveLanguageId));

      appDispatch(setActiveCountryId());
      // if (activeLang.code === 'EN') { refetch() }

      closeModal();
    },
    [appDispatch, closeModal]
  );

  return setActiveLanguage;
};
