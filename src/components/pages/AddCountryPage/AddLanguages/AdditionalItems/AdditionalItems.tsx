import { useAppSelector } from 'App';
import { selectActiveLangCode, selectActiveLangName } from 'features/languages';
import slang from '../AddLanguages.module.scss';
import { ShowLanguagesButton } from '../AddLanguages.styled';

export type ButtonSelectLanguageType = {
  openModal: () => void;
};

export const ButtonSelectLanguage = ({ openModal }: ButtonSelectLanguageType) => {
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const activeLangName = useAppSelector(selectActiveLangName);

  return (
    <ShowLanguagesButton onClick={openModal} type="button">
      {activeLangCode && (
        <>
          <p className={slang.block_lang_p}>{activeLangName}</p>
          <p className={slang.block_lang_p2}>{activeLangCode}</p>
        </>
      )}

      {!activeLangCode && <p className={slang.block_lang_p}>Select language</p>}
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
