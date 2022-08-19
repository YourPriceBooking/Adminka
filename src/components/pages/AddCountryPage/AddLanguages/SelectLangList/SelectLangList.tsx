import { useAppSelector } from 'App';
import { selectLanguagesIds } from 'features/languages';
import type { SelectLangType } from 'types/apis';
import slang from '../AddLanguages.module.scss';
import { LanguageItem } from './SelectLangItem';

type SelectLangListProps = {
  setActiveLanguage: SelectLangType;
};

export const SelectLangList = ({ setActiveLanguage }: SelectLangListProps) => {
  const languagesIds = useAppSelector(selectLanguagesIds);

  return (
    <ul className={slang.block_lang_ul}>
      {languagesIds?.map(languageId => (
        <LanguageItem key={languageId} languageItem={{ languageId, setActiveLanguage }} />
      ))}
    </ul>
  );
};
