import type { Language } from 'types/apis';
import { FormEvent, useCallback, useState } from 'react';
import { useAddLanguageMutation } from 'redux/apis';
import { toast } from 'react-toastify';
import slang from '../AddLanguages.module.scss';

type AddLanguageFormProps = {
  closeModal: () => void;
  selectLang: (activeLang: Language) => void;
  isLoading: boolean;
};

export const AddLanguageForm = ({ closeModal, selectLang, isLoading }: AddLanguageFormProps) => {
  const [addLanguage, { isLoading: isAddingLanguage }] = useAddLanguageMutation();

  const [localNewLangName, setLocalNewLangName] = useState('');
  const [localNewLangCode, setLocalNewLangCode] = useState('');

  const isSubmitDisabled =
    !localNewLangName.trim() || !localNewLangCode.trim() || isLoading || isAddingLanguage;

  const onSubmitAddLanguage = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const lang = formData.get('newLanguageName')?.toString().trim();
      const code = formData.get('newLanguageCode')?.toString().trim().toUpperCase();
      // console.log({ code, lang });
      if (!lang || !code) return;

      const newLanguage = { lang, code };

      try {
        const payload = await addLanguage(newLanguage).unwrap();
        if (payload) {
          selectLang(payload);
        }
      } catch (error) {
        toast.error('Language not added - please try again');
        // console.log(error);
      } finally {
        form.reset();
        closeModal();
      }
    },
    [addLanguage, closeModal, selectLang]
  );

  return (
    <form className={slang.block_add_lang_text} onSubmit={onSubmitAddLanguage}>
      <h5 className={slang.text_add_lang1}>
        You can add a language, enter the name of the language in the original language and its
        international designation
      </h5>

      <input
        className={slang.lang_block_input2}
        name="newLanguageName"
        type="text"
        value={localNewLangName}
        onChange={e => setLocalNewLangName(e.currentTarget.value)}
        maxLength={20}
      />

      <h5 className={slang.text_add_lang2}>name of the language in the original language</h5>

      <input
        className={slang.lang_block_input3}
        name="newLanguageCode"
        type="text"
        value={localNewLangCode}
        onChange={e => setLocalNewLangCode(e.currentTarget.value)}
        maxLength={2}
      />

      <h5 className={slang.text_add_lang3}>international designation</h5>

      <button
        className={
          isSubmitDisabled ? slang.language_btn_style_disable : slang.language_btn_style_open
        }
        disabled={isSubmitDisabled}
        type="submit"
      >
        Add language
      </button>
    </form>
  );
};
