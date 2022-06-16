import { FormEvent, useCallback, useEffect, useState } from 'react';
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
import { useAddLanguageMutation, useGetLanguagesQuery } from 'redux/apis';
import { Language } from 'types/apis';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';
import { toast } from 'react-toastify';
import { ShowLanguagesButton } from './AddLanguages.styled';

export default function SelectLang() {
  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
  } = useGetLanguagesQuery();

  const [addLanguage, { isLoading: isAddingLanguage }] = useAddLanguageMutation();

  const isLoading = isLoadingLanguagesFirstTime || isFetching || isAddingLanguage;

  const appDispatch = useAppDispatch();
  const activeLang = useAppSelector(selectActiveLang);

  const [showLanguagesList, setShowLanguagesList] = useState(false);

  // useEffect(() => {

  // }, [appDispatch, showLanguagesList]);

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

    setShowLanguagesList(showLanguagesList => !showLanguagesList);
  }, [appDispatch, showLanguagesList]);

  const selectLang = useCallback(
    (activeLang: Language) => {
      appDispatch(setActiveLang(activeLang));
      console.log({ activeLang });
      setShowLanguagesList(false);
    },
    [appDispatch]
  );

  const onSubmitAddLanguage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const lang = formData.get('newLanguageName')?.toString().trim();
      const code = formData.get('newLanguageCode')?.toString().trim().toUpperCase();
      console.log({ code, lang });
      if (!lang || !code) return;

      const newLanguage = { lang, code };

      try {
        const payload = await addLanguage(newLanguage).unwrap();
        if (payload) {
          selectLang(payload);
        }
      } catch (error) {
        toast.error('Language not added - please try again');
        console.log(error);
      } finally {
        setShowLanguagesList(false);
        form.reset();
      }
    },
    [addLanguage, selectLang]
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

              <AddLanguageForm onSubmit={onSubmitAddLanguage} isLoading={isLoading} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
