import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
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
import {
  LanguageInputLabel,
  EditLanguageFormStyled,
  EditLanguageInput,
} from './EditLanguageForm.styled';

import { EditButton } from '../../Countries/EditButton';

export type EditLanguageFormType = {
  LanguageItem: {
    LanguageId: EntityId;
    closeLanguagesList: () => void;
    setIsEditingLanguage: (arg: boolean) => void;
    isEditingLanguage: boolean;
    isLoading: boolean;
  };
};

export const EditLanguageForm = ({
  LanguageItem: {
    LanguageId,
    closeLanguagesList,
    isEditingLanguage,
    setIsEditingLanguage,
    isLoading,
  },
}: EditLanguageFormType) => {
  const [editLanguage, { isLoading: isLoadingEditedLanguage }] = useEditLanguageMutation();

  const languageObj = useAppSelector(state => selectLanguageById(state, LanguageId));
  const activeLangId = useAppSelector(selectActiveLanguageId);
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const [localLanguageName, setLocalLanguageName] = useState(languageObj?.lang);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  const appDispatch = useAppDispatch();

  const startEditing = useCallback(() => {
    if (isEditingLanguage) return;

    setIsEditingLanguage(true);
    setInputDisabled(false);
    setIsSubmitButtonDisabled(false);
  }, [isEditingLanguage, setIsEditingLanguage]);

  const stopEditing = useCallback(() => {
    if (!isEditingLanguage) return;

    setIsEditingLanguage(false);
    setInputDisabled(true);
    setIsSubmitButtonDisabled(true);
  }, [isEditingLanguage, setIsEditingLanguage]);

  const onClickChooseActiveLanguageId = useCallback(async () => {
    if (isEditingLanguage) return;

    appDispatch(chooseLanguage(languageObj?._id));
    closeLanguagesList();
  }, [isEditingLanguage, appDispatch, languageObj?._id, closeLanguagesList]);

  useEffect(() => {
    if (inputDisabled) return () => {};

    const onOutsideFormClickReset = (e: MouseEvent) => {
      const { target } = e;
      if (!(target instanceof Node)) return;
      if (formRef.current?.contains(target)) return;

      formRef.current?.reset();
      stopEditing();
      setLocalLanguageName(languageObj?.lang);
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', onOutsideFormClickReset, {
        passive: true,
        capture: true,
      });
    }, 0);

    const clearGarbage = () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', onOutsideFormClickReset, { capture: true });
      stopEditing();
    };

    return clearGarbage;
  }, [languageObj?.lang, inputDisabled, stopEditing]);

  if (!languageObj) return null;
  const { _id: id, lang, code } = languageObj;

  const isPending = isLoading || isLoadingEditedLanguage;
  const isDisabledEdit = !inputDisabled || isPending;
  const isDisabledSubmit =
    !lang || !code || isSubmitButtonDisabled || isPending || !activeLangId || !activeLangCode;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabledSubmit || !localLanguageName?.trim()) return;
    const editedLanguageName = localLanguageName?.trim();
    if (!editedLanguageName) return;

    const editedLanguage: EditLanguage = {
      _id: id,
      lang: editedLanguageName,
      code: activeLangCode,
    };

    try {
      const editedResponse = await editLanguage(editedLanguage).unwrap();

      if (editedResponse) {
        toast.success(`${editedResponse.entities[languageObj._id]?.lang} Language updated!`);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
      setLocalLanguageName(languageObj.lang);
    } finally {
      setInputDisabled(true);
      setIsSubmitButtonDisabled(true);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setLocalLanguageName(e.currentTarget.value);

  const isFirstEdit = code === 'EN' && !isEng;

  const editLanguageFormInterface = (
    <LanguageInputLabel onClick={onClickChooseActiveLanguageId}>
      <EditLanguageInput
        type="text"
        value={localLanguageName}
        onChange={onChange}
        disabled={inputDisabled}
        name="editedLanguageName"
      />
    </LanguageInputLabel>
  );

  const showOverlay = (
    <>
      {inputDisabled && (
        <EditButton onClick={startEditing} $isFirstEdit={isFirstEdit} disabled={isDisabledEdit} />
      )}

      {!isSubmitButtonDisabled && (
        <button type="submit" disabled={isDisabledSubmit}>
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
