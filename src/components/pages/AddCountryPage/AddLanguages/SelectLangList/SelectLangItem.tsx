import { Language } from 'types/apis';

import { useDeleteLanguageMutation } from 'redux/apis';
import { selectDev } from 'redux/slices';
import { useAppSelector } from 'hooks/redux/hooks';
import { DeleteButton, DeleteIcon, SelectButton } from './SelectLangItem.styled';
import slang from '../AddLanguages.module.scss';
import type { SelectLanguage } from './SelectLangList';

type LanguageItemProps = {
  languageItem: {
    language: Language;
    selectLang: SelectLanguage;
  };
};

export const LanguageItem = ({
  languageItem: {
    language: { _id, lang, code, createdAt, updatedAt, countries },
    selectLang,
  },
}: LanguageItemProps) => {
  const [deleteLanguage, { isLoading: isDeletingLanguage }] = useDeleteLanguageMutation();
  const showDev = useAppSelector(selectDev);

  return (
    <li className={slang.block_lang_li} value={code} key={code}>
      <SelectButton
        onClick={() => selectLang({ _id, lang, code, createdAt, updatedAt, countries })}
        disabled={isDeletingLanguage}
      >
        <span>{lang}</span>

        <span className={slang.block_lang_li_p}>{code}</span>
      </SelectButton>

      {showDev && (
        <DeleteButton onClick={() => deleteLanguage({ _id })} disabled={isDeletingLanguage}>
          <DeleteIcon />
        </DeleteButton>
      )}
    </li>
  );
};
