import slang from '../AddLanguages.module.scss';
import { Language } from 'types/apis';

import { useDeleteLanguageMutation } from 'redux/apis';
import { DeleteButton, DeleteIcon, SelectButton } from './SelectLangItem.styled';
import { selectShowDeleteButtons } from 'redux/slices';
import { useAppSelector } from 'hooks/redux/hooks';

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
  const showDeleteButtons = useAppSelector(selectShowDeleteButtons);

  return (
    <li className={slang.block_lang_li} value={code} key={code}>
      <SelectButton
        onClick={e => selectLang({ _id, lang, code, createdAt, updatedAt, countries })}
        disabled={isDeletingLanguage}
      >
        <span>{lang}</span>

        <span className={slang.block_lang_li_p}>{code}</span>
      </SelectButton>

      {showDeleteButtons && (
        <DeleteButton
          onClick={async e => await deleteLanguage({ _id })}
          disabled={isDeletingLanguage}
        >
          <DeleteIcon />
        </DeleteButton>
      )}
    </li>
  );
};
