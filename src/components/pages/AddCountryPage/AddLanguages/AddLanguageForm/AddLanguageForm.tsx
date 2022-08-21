import type { AddLanguage, SelectLangType } from 'types/apis';
import { FormEvent, useState } from 'react';

import { toast } from 'react-toastify';
import { selectAllLanguagesCodes, useAddLanguageMutation } from 'features/languages';
import { useAppSelector } from 'App';
import slang from '../AddLanguages.module.scss';

type AddLanguageFormProps = {
  closeModal: () => void;
  setActiveLanguage: SelectLangType;
};

export const AddLanguageForm = ({ closeModal, setActiveLanguage }: AddLanguageFormProps) => {
  const [addLanguage, { isLoading }] = useAddLanguageMutation();
  const allLanguagesCodes = useAppSelector(selectAllLanguagesCodes);

  const [localNewLangName, setLocalNewLangName] = useState('');
  const [localNewLangCode, setLocalNewLangCode] = useState('');

  const isSubmitDisabled = isLoading || !localNewLangName.trim() || !localNewLangCode.trim();

  const onSubmitAddLanguage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    const lang = localNewLangName.trim();
    const code = localNewLangCode.trim().toUpperCase();
    if (!lang || !code) return;

    if (allLanguagesCodes?.includes(code)) {
      toast.info(`Code ${code} exists. Enter a new one`);
      return;
    }

    const newLanguage: AddLanguage = { lang, code };

    try {
      const addedLanguage = await addLanguage(newLanguage).unwrap();
      console.log({ addedLanguage });

      if (addedLanguage) {
        const newLangId = Object.values(addedLanguage.entities).find(
          language => language?.code === code
        )?._id;

        if (newLangId) {
          setActiveLanguage(newLangId);
          toast.success(`${newLanguage.lang} language added`);
        }
      }
    } catch (error: any) {
      toast.error(`Language not added ${error?.data?.message}`);
    } finally {
      setLocalNewLangName('');
      setLocalNewLangCode('');
      closeModal();
    }
  };

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
