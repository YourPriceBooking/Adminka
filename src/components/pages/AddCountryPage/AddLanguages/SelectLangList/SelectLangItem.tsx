import type { SelectLangType, SelectLanguageType } from 'types/apis';
import { useDeleteLanguageMutation } from 'features/apis';
import { selectDev, setActiveLang } from 'features/slices';
import { useAppDispatch, useAppSelector } from 'App';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DeleteButton, DeleteIcon, SelectButton } from './SelectLangItem.styled';
import slang from '../AddLanguages.module.scss';

type LanguageItemProps = {
  languageItem: {
    language: SelectLanguageType;
    selectLang: SelectLangType;
  };
};

export const LanguageItem = ({ languageItem: { language, selectLang } }: LanguageItemProps) => {
  const [deleteLanguage, { isLoading: isDeletingLanguage }] = useDeleteLanguageMutation();
  const showDev = useAppSelector(selectDev);

  const appDispatch = useAppDispatch();

  const onDeleteLanguage = useCallback(() => {
    if (!language) return;
    deleteLanguage({ _id: language._id });
    appDispatch(setActiveLang(null));
    toast.success('Language deleted');
  }, [appDispatch, deleteLanguage, language]);

  const selectLanguage = () => {
    if (!language) return;
    selectLang(language);
  };

  return (
    <li className={slang.block_lang_li}>
      <SelectButton onClick={selectLanguage} disabled={isDeletingLanguage}>
        <span>{language.lang}</span>

        <span className={slang.block_lang_li_p}>{language.code}</span>
      </SelectButton>

      {showDev && (
        <DeleteButton onClick={onDeleteLanguage} disabled={isDeletingLanguage}>
          <DeleteIcon />
        </DeleteButton>
      )}
    </li>
  );
};
