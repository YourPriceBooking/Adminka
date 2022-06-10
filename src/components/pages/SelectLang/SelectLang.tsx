import { FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
// import {
//   selectLanguageList,
//   generateLanguage,
//   selectLocationObj,
// } from '../../Location/LocationSlicer';
// import { selectLanguage, generate } from '../ListSlicer'
import slang from './SelectLang.module.scss';
import Modal from 'components/shared/Modal/Modal';
import { selectActiveLang, setLang } from 'redux/slices';
import { useAddLanguageMutation, useGetLanguagesQuery } from 'redux/apis';
import { Language } from 'types/apis';
import { AddLanguageForm } from './AddLanguageForm/AddLanguageForm';
import { SelectLangList } from './SelectLangList/SelectLangList';

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
  const toggleModal = useCallback(
    () => setShowLanguagesList(!showLanguagesList),
    [showLanguagesList]
  );

  const selectLang = useCallback(
    (activeLang: Language) => {
      appDispatch(setLang(activeLang));
      console.log({ activeLang });
      setShowLanguagesList(false);
    },
    [appDispatch]
  );

  const openLanguagesList = useCallback(() => setShowLanguagesList(true), []);

  const onSubmitAddLanguage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const lang = formData.get('newLanguageName')?.toString().trim();
      const code = formData.get('newLanguageCode')?.toString().trim().toUpperCase();
      console.log('code', code);
      console.log('lang', lang);
      if (!lang || !code) return;

      try {
        await addLanguage({ lang, code });
      } catch (error) {
        console.log(error);
      }

      setShowLanguagesList(false);
      form.reset();
    },
    [addLanguage]
  );

  return (
    <>
      <div className={slang.lang_container} onClick={openLanguagesList}>
        <p className={slang.block_lang_p}>{activeLang.lang}</p>
        <p className={slang.block_lang_p2}>{activeLang.code}</p>
      </div>

      {showLanguagesList && (
        <Modal toggleModal={toggleModal}>
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
