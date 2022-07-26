import { Language } from 'types/apis';
import slang from '../AddLanguages.module.scss';
import { LanguageItem } from './SelectLangItem';

export type SelectLanguage = (arg: Language) => void;

type SelectLangListType = {
  selectLang: SelectLanguage;
  languages?: Language[];
};

export const SelectLangList = ({ languages, selectLang }: SelectLangListType) => (
  <ul className={slang.block_lang_ul}>
    {languages?.map((language: Language) => (
      <LanguageItem key={language._id} languageItem={{ language, selectLang }} />
    ))}
  </ul>
);
