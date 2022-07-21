import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
// import {
//   selectLanguageList,
//   generateLanguage,
//   selectLocationObj,
// } from '../../Location/LocationSlicer';
// import { selectLanguage, generate } from '../ListSlicer'
import slang from './AddLanguages.module.scss';
import Modal from 'components/shared/Modal/Modal';
import {
  decreaseModalCount,
  increaseModalCount,
  selectActiveLang,
  setActiveLang,
} from 'redux/slices';
import { useGetLanguagesQuery } from 'redux/apis';
import { Language } from 'types/apis';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { ShowLanguagesButton } from './AddLanguages.styled';

export const SelectLang = () => {
  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
  } = useGetLanguagesQuery();

  const isLoading = isLoadingLanguagesFirstTime || isFetching;

  const appDispatch = useAppDispatch();
  const activeLang = useAppSelector(selectActiveLang);

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
    (activeLang: Language) => {
      appDispatch(setActiveLang(activeLang));
      console.log({ activeLang });
      setShowLanguagesList(false);
    },
    [appDispatch]
  );

  return (
    <>
      <div className={slang.lang_container}>
        <ShowLanguagesButton onClick={openModal}>
          <p className={slang.block_lang_p}>{activeLang.lang}</p>
          <p className={slang.block_lang_p2}>{activeLang.code}</p>
        </ShowLanguagesButton>
      </div>

      {showLanguagesList && (
        <Modal toggleModal={closeModal}>
          <div className={slang.modal__backdrop}>
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
          </div>
        </Modal>
      )}
    </>
  );
};
