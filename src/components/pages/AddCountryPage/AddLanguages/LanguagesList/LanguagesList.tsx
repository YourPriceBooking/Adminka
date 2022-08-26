import { useAppSelector } from 'App';
import { ListLoader } from 'components/shared/Loader/Loader';
import { selectLanguagesIds } from 'features/languages';
import type { SelectLangType } from 'types/apis';
import slang from '../AddLanguages.module.scss';
import { LanguageItem } from './LanguageItem';

type LanguagesListProps = {
  setActiveLanguage: SelectLangType;
};

export const LanguagesList = ({ setActiveLanguage }: LanguagesListProps) => {
  const languagesIds = useAppSelector(selectLanguagesIds);

  const showLanguagesList = !languagesIds?.length ? (
    <ListLoader height={320} />
  ) : (
    languagesIds.map(languageId => (
      <LanguageItem key={languageId} languageItem={{ languageId, setActiveLanguage }} />
    ))
  );

  return <ul className={slang.block_lang_ul}>{showLanguagesList}</ul>;
};
