import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { toast } from 'react-toastify';
import type { EntityId } from '@reduxjs/toolkit';
import {
  chooseLanguage,
  selectActiveLangCode,
  selectActiveLanguageId,
  selectIsEnglishActiveLang,
  selectLanguageById,
  useEditLanguageMutation,
} from 'features/languages';
import { EditLanguage } from 'types/apis';
import { EditButton } from 'components/shared/Buttons';
import {
  LanguageInputLabel,
  EditLanguageFormStyled,
  EditLanguageInput,
} from './EditLanguageForm.styled';

export type EditLanguageFormType = {
  languageId: EntityId;
};

export const EditLanguageForm = ({ languageId }: EditLanguageFormType) => {
  const [editLanguage, { isLoading: isLoadingEditedLanguage }] = useEditLanguageMutation();

  const languageObj = useAppSelector(state => selectLanguageById(state, languageId));
  const activeLangId = useAppSelector(selectActiveLanguageId);
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const formRef = useRef<HTMLFormElement>(null);
  const appDispatch = useAppDispatch();

  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const startEditing = useCallback(() => setIsEditingLanguage(true), []);
  const stopEditing = useCallback(() => setIsEditingLanguage(false), []);

  const onClickChooseActiveLanguageId = useCallback(async () => {
    if (isEditingLanguage) return;

    appDispatch(chooseLanguage(languageObj?._id));
    // closeLanguagesList(); TODO
  }, [appDispatch, isEditingLanguage, languageObj?._id]);

  useEffect(() => {
    if (!isEditingLanguage) return () => {};

    const onOutsideFormClickReset = (e: MouseEvent) => {
      const { target } = e;
      if (!(target instanceof Node)) return;
      if (!formRef.current || formRef.current.contains(target)) return;

      formRef.current.reset();
      stopEditing();
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', onOutsideFormClickReset, {
        passive: true,
        capture: true,
      });
    }, 0);

    const clear = () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', onOutsideFormClickReset, { capture: true });
      stopEditing();
    };

    return clear;
  }, [isEditingLanguage, languageObj?.lang, stopEditing]);

  if (!languageObj) return null;
  const { _id: id, lang, code } = languageObj;

  const isPending = isLoadingEditedLanguage;
  const isSubmitDisabled = !lang || !code || isPending || !activeLangId || !activeLangCode;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const editedLanguageName = formData.get('languageName')?.toString().trim();

    if (isSubmitDisabled || !editedLanguageName) {
      toast.info('Please provide language');
      return;
    }

    const editedLanguage: EditLanguage = {
      _id: id,
      lang: editedLanguageName,
      code,
    };

    try {
      const editedResponse = await editLanguage(editedLanguage).unwrap();

      if (editedResponse) {
        toast.success(`Language ${editedResponse.entities[languageObj._id]?.lang} updated!`);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    } finally {
      stopEditing();
    }
  };

  const editLanguageFormInterface = (
    <LanguageInputLabel onClick={onClickChooseActiveLanguageId}>
      <EditLanguageInput
        type="text"
        name="languageName"
        defaultValue={lang}
        disabled={!isEditingLanguage}
      />
    </LanguageInputLabel>
  );

  const isFirstEdit = code === 'EN' && !isEng;
  const showOverlay = (
    <>
      {!isEditingLanguage && (
        <EditButton onClick={startEditing} $isFirstEdit={isFirstEdit} disabled={isSubmitDisabled} />
      )}

      {isEditingLanguage && (
        <button type="submit" disabled={isSubmitDisabled}>
          Done
        </button>
      )}
    </>
  );

  return (
    <EditLanguageFormStyled onSubmit={handleSubmit} ref={formRef}>
      {editLanguageFormInterface}

      {showOverlay}
    </EditLanguageFormStyled>
  );
};
