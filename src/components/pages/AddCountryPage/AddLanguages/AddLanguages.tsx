import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
// import {
//   selectLanguageList,
//   generateLanguage,
//   selectLocationObj,
// } from '../../Location/LocationSlicer';
// import { selectLanguage, generate } from '../ListSlicer'
import { Modal } from 'components/shared/Modal/Modal';
import {
  decreaseModalCount,
  increaseModalCount,
  selectActiveLang,
  setActiveLang,
} from 'redux/slices';
import { useGetLanguagesQuery } from 'redux/apis';
import slang from './AddLanguages.module.scss';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { ShowLanguagesButton } from './AddLanguages.styled';
import type { SelectLanguageType } from './SelectLangList/SelectLangList';

const ButtonLabel = ({ activeLanguage }: { activeLanguage: SelectLanguageType }) => (
  <>
    <p className={slang.block_lang_p}>{activeLanguage.lang}</p>
    <p className={slang.block_lang_p2}>{activeLanguage.code}</p>
  </>
);

type ButtonSelectLanguageType = {
  openModal: () => void;
  activeLanguage: SelectLanguageType;
};

const ButtonSelectLanguage = ({ openModal, activeLanguage }: ButtonSelectLanguageType) => (
  <ShowLanguagesButton onClick={openModal} type="button">
    {activeLanguage.code ? (
      <ButtonLabel activeLanguage={activeLanguage} />
    ) : (
      <p className={slang.block_lang_p}>Select language</p>
    )}
  </ShowLanguagesButton>
);

export const SelectLang = () => {
  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
    refetch,
  } = useGetLanguagesQuery();

  const isLoading = isLoadingLanguagesFirstTime || isFetching;

  const appDispatch = useAppDispatch();
  const activeLanguage = useAppSelector(selectActiveLang);

  const [showLanguagesList, setShowLanguagesList] = useState(false);

  const openModal = useCallback(() => {
    if (!showLanguagesList) {
      appDispatch(increaseModalCount());
    }

    setShowLanguagesList(true);
  }, [appDispatch, showLanguagesList]);

  const closeModal = useCallback(() => {
    if (showLanguagesList) {
      appDispatch(decreaseModalCount());
    }

    setShowLanguagesList(false);
  }, [appDispatch, showLanguagesList]);

  const selectLang = useCallback(
    (activeLang: SelectLanguageType) => {
      appDispatch(setActiveLang(activeLang));
      if (activeLang.code === 'EN') {
        refetch();
      }

      closeModal();
    },
    [appDispatch, closeModal, refetch]
  );

  return (
    <>
      <div className={slang.lang_container}>
        <ButtonSelectLanguage activeLanguage={activeLanguage} openModal={openModal} />
      </div>

      {showLanguagesList && (
        <Modal closeModal={closeModal}>
          <div className={slang.container_add_lang}>
            <div className={slang.block_lang}>
              <SelectLangList languages={languages} selectLang={selectLang} />
            </div>

            <AddLanguageForm
              selectLang={selectLang}
              closeModal={closeModal}
              isLoading={isLoading}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
