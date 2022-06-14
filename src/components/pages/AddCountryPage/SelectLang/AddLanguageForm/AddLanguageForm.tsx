import slang from '../SelectLang.module.scss';
import { onSubmitFormType } from 'types/apis';
import { useState } from 'react';

type AddLanguageFormProps = onSubmitFormType & { isLoading: boolean };

export const AddLanguageForm = ({ onSubmit, isLoading }: AddLanguageFormProps) => {
  const [localNewLangName, setLocalNewLangName] = useState('');
  const [localNewLangCode, setLocalNewLangCode] = useState('');

  const isSubmitDisabled = !localNewLangName.trim() || !localNewLangCode.trim() || isLoading;

  return (
    <form className={slang.block_add_lang_text} onSubmit={onSubmit}>
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
