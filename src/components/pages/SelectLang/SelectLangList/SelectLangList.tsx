import slang from '../SelectLang.module.scss';
import { Language } from 'types/apis';
import { LanguageItem } from './SelectLangItem';

type SelectLangListType = {
  selectLang: (arg: Language) => void;
  languages: Language[];
};

export const SelectLangList = ({ languages, selectLang }: SelectLangListType) => {
  return (
    <ul className={slang.block_lang_ul}>
      {languages.map((language: Language) => (
        <LanguageItem key={language.code} selectLang={selectLang} {...language} />
      ))}
    </ul>
  );
};
