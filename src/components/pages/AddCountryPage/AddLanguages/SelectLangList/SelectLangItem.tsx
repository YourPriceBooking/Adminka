import slang from '../AddLanguages.module.scss';
import { Language } from 'types/apis';

import { useDeleteLanguageMutation } from 'redux/apis';
import { DeleteButton, SelectButton } from './SelectLangItem.styled';

type LanguageItemProps = Language & { selectLang: (arg: Language) => void };

export const LanguageItem = ({
  _id,
  lang,
  code,
  createdAt,
  updatedAt,
  selectLang,
  countries,
}: LanguageItemProps) => {
  const [deleteLanguage, { isLoading: isDeletingLanguage }] = useDeleteLanguageMutation();

  return (
    <li className={slang.block_lang_li} value={code} key={code}>
      <SelectButton
        onClick={e => selectLang({ _id, lang, code, createdAt, updatedAt, countries })}
        disabled={isDeletingLanguage}
      >
        <span>{lang}</span>

        <span className={slang.block_lang_li_p}>{code}</span>
      </SelectButton>

      <DeleteButton
        onClick={async e => await deleteLanguage({ _id })}
        disabled={isDeletingLanguage}
      >
        Delete
      </DeleteButton>
    </li>
  );
};
