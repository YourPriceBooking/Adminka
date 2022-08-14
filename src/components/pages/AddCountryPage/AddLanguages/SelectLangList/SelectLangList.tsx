import type { LanguageWithoutCountries, SelectLangType } from 'types/apis';
import slang from '../AddLanguages.module.scss';
import { LanguageItem } from './SelectLangItem';

type SelectLangListType = {
  selectLang: SelectLangType;
  languages?: LanguageWithoutCountries;
};

export const SelectLangList = ({ languages, selectLang }: SelectLangListType) => (
  <ul className={slang.block_lang_ul}>
    {languages?.map(language => (
      <LanguageItem key={language._id} languageItem={{ language, selectLang }} />
    ))}
  </ul>
);
