import type { SelectLanguageType } from 'types/apis';
import { useAppSelector } from 'components/App';
import { selectActiveLang } from 'redux/slices';
import slang from '../AddLanguages.module.scss';
import { ShowLanguagesButton } from '../AddLanguages.styled';

export const ButtonLabel = ({ activeLanguage }: { activeLanguage: SelectLanguageType }) => (
  <>
    <p className={slang.block_lang_p}>{activeLanguage.lang}</p>
    <p className={slang.block_lang_p2}>{activeLanguage.code}</p>
  </>
);

export type ButtonSelectLanguageType = {
  openModal: () => void;
};

export const ButtonSelectLanguage = ({ openModal }: ButtonSelectLanguageType) => {
  const activeLanguage = useAppSelector(selectActiveLang);

  return (
    <ShowLanguagesButton onClick={openModal} type="button">
      {activeLanguage?.code ? (
        <ButtonLabel activeLanguage={activeLanguage} />
      ) : (
        <p className={slang.block_lang_p}>Select language</p>
      )}
    </ShowLanguagesButton>
  );
};

export const FetchErrorPlaceholder = () => (
  <div style={{ padding: '20px' }}>
    <p>Fetch error</p>
    <p>
      Admin: Please try to <strong>reload</strong>
    </p>

    <p>
      Dev: <strong>Is server online?</strong>
    </p>
  </div>
);

type LangContainerProps = {
  openModal: () => void;
};

export const ActiveLangButtonContainer = ({ openModal }: LangContainerProps) => (
  <div className={slang.lang_container}>
    <ButtonSelectLanguage openModal={openModal} />
  </div>
);
