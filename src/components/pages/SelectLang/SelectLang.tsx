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
import { useGetLanguagesQuery } from 'redux/apis';
import { Language, onSubmitFormType } from 'types/apis';

type LanguageItemProps = Language & { selectLang: (arg: Language) => void };

const LanguageItem = ({ _id, lang, code, createdAt, updatedAt, selectLang }: LanguageItemProps) => {
  return (
    <li
      className={slang.block_lang_li}
      value={code}
      key={code}
      onClick={e => selectLang({ _id, lang, code, createdAt, updatedAt })}
    >
      {lang}
      <p className={slang.block_lang_li_p}>{code}</p>
    </li>
  );
};

const AddLanguageForm = ({ onSubmit }: onSubmitFormType) => {
  return (
    <form className={slang.block_add_lang_text} onSubmit={onSubmit}>
      <h5 className={slang.text_add_lang1}>
        You can add a language, enter the name of the language in the original language and its
        international designation
      </h5>

      <input
        type="text"
        name="lang"
        className={slang.lang_block_input2}
        // onChange={onChange2}
        maxLength={20}
        // value={language3.landTex}
      />

      <h5 className={slang.text_add_lang2}>name of the language in the original language</h5>

      <input type="text" name="code" className={slang.lang_block_input3} maxLength={2} />

      <h5 className={slang.text_add_lang3}>international designation</h5>

      <button type="submit">Add language</button>
    </form>
  );
};

export default function SelectLang() {
  const { data: languages } = useGetLanguagesQuery();

  const appDispatch = useAppDispatch();
  const activeLang = useAppSelector(selectActiveLang);

  const [touch, setTouch] = useState(false);
  const toggleModal = useCallback(() => setTouch(!touch), [touch]);

  const selectLang = (activeLang: Language) => {
    console.log({ activeLang });
    appDispatch(setLang(activeLang));
    setTouch(false);
  };

  const codeTouch = () => {
    setTouch(true);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouch(false);
  };

  return (
    <>
      <div className={slang.lang_container} onClick={codeTouch}>
        <p className={slang.block_lang_p}>{activeLang.lang}</p>
        <p className={slang.block_lang_p2}>{activeLang.code}</p>
      </div>

      {touch && (
        <Modal toggleModal={toggleModal}>
          <div className={slang.modal__backdrop}>
            <div className={slang.container_add_lang}>
              <div className={slang.block_lang}>
                <ul className={slang.block_lang_ul}>
                  {languages.map((language: Language) => (
                    <LanguageItem key={language.code} selectLang={selectLang} {...language} />
                  ))}
                </ul>
              </div>

              <AddLanguageForm onSubmit={onSubmit} />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
