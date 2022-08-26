import type { EntityId } from '@reduxjs/toolkit';
import type { SelectLangType } from 'types/apis';
import { useAppDispatch, useAppSelector } from 'App';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { selectDev, setActiveCountryId } from 'features/countries';
import { selectLanguageById, chooseLanguage, useDeleteLanguageMutation } from 'features/languages';
import { DeleteButton, DeleteIcon, SelectButton } from './LanguageItem.styled';
import slang from '../Languages.module.scss';

type LanguageItemProps = {
  languageItem: {
    languageId: EntityId;
    setActiveLanguage: SelectLangType;
  };
};

export const LanguageItem = ({
  languageItem: { languageId, setActiveLanguage },
}: LanguageItemProps) => {
  const [deleteLanguage, { isLoading: isDeletingLanguage }] = useDeleteLanguageMutation();

  const language = useAppSelector(state => selectLanguageById(state, languageId));
  const showDev = useAppSelector(selectDev);
  const appDispatch = useAppDispatch();

  const onDeleteLanguage = useCallback(() => {
    if (!language) return;
    deleteLanguage(language._id);
    appDispatch(chooseLanguage(undefined));
    appDispatch(setActiveCountryId());

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
