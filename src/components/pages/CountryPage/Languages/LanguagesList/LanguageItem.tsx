import type { EntityId } from '@reduxjs/toolkit';
import type { SelectLangType } from 'types/apis';
import { useAppSelector } from 'App';

import { selectLanguageById } from 'features/languages';
import { SelectButton } from './LanguageItem.styled';
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
  const language = useAppSelector(state => selectLanguageById(state, languageId));

  if (!language) return null;
  const { _id: id, code, lang } = language;

  const selectLanguage = () => {
    setActiveLanguage(id);
  };

  return (
    <li className={slang.block_lang_li}>
      <SelectButton onClick={selectLanguage}>
        <span>{lang}</span>

        <span className={slang.block_lang_li_p}>{code}</span>
      </SelectButton>
    </li>
  );
};
