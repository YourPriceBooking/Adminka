import type { Language } from 'types/apis';
import slang from '../AddLanguages.module.scss';
import { LanguageItem } from './SelectLangItem';

export type SelectLanguageType = {
  _id: string;
  lang: string;
  code: string;
  dbLangCode: string;
  createdAt: string;
  updatedAt: string;
};

export type SelectLanguage = (arg: SelectLanguageType) => void;

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
