import type { EntityId } from '@reduxjs/toolkit';
import type { SelectLangType } from 'types/apis';
import { useAppDispatch, useAppSelector } from 'App';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { setActiveLangId } from 'features/common';
import { selectDev } from 'features/countries';
import { useDeleteLanguageMutation, useSelectLanguageById } from 'features/languages';
import { DeleteButton, DeleteIcon, SelectButton } from './SelectLangItem.styled';
import slang from '../AddLanguages.module.scss';

type LanguageItemProps = {
  languageItem: {
    languageId: EntityId;
    setActiveLanguage: SelectLangType;
  };
};

export const LanguageItem = ({
  languageItem: { languageId, setActiveLanguage },
}: LanguageItemProps) => {
  const language = useSelectLanguageById(languageId);

  const [deleteLanguage, { isLoading: isDeletingLanguage }] = useDeleteLanguageMutation();
  const showDev = useAppSelector(selectDev);

  const appDispatch = useAppDispatch();

  const onDeleteLanguage = useCallback(() => {
    if (!language) return;
    deleteLanguage({ _id: language._id });
    appDispatch(setActiveLangId());
    toast.success('Language deleted');
  }, [appDispatch, deleteLanguage, language]);

  if (!language) return null;
  const { _id: id, code, lang } = language;

  const selectLanguage = () => {
    setActiveLanguage(id);
  };

  return (
    <li className={slang.block_lang_li}>
      <SelectButton onClick={selectLanguage} disabled={isDeletingLanguage}>
        <span>{lang}</span>

        <span className={slang.block_lang_li_p}>{code}</span>
      </SelectButton>

      {showDev && (
        <DeleteButton onClick={onDeleteLanguage} disabled={isDeletingLanguage}>
          <DeleteIcon />
        </DeleteButton>
      )}
    </li>
  );
};
