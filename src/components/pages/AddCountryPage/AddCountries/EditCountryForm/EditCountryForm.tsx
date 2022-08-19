import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import { toast } from 'react-toastify';
import type { EditCountry } from 'types/apis';
import {
  selectCountryById,
  selectDev,
  setActiveCountryId,
  useDeleteCountryMutation,
  useEditCountryMutation,
} from 'features/countries';
import { selectActiveLangId } from 'features/common';
import { selectActiveLangCode, selectIsEnglishActiveLang } from 'features/languages';
// import { isEdited } from 'common/utils';
import type { EntityId } from '@reduxjs/toolkit';

import {
  CountryInputLabel,
  EditCountryFormStyled,
  EditCountryInput,
} from './EditCountryForm.styled';

import { EditButton } from '../EditButton/EditButton';

export type EditCountryFormType = {
  countryItem: {
    countryId: EntityId;
    closeCountriesList: () => void;
    setIsEditingCountry: (arg: boolean) => void;
    isEditingCountry: boolean;
    isLoading: boolean;
  };
};

export const EditCountryForm = ({
  countryItem: { countryId, closeCountriesList, isEditingCountry, setIsEditingCountry, isLoading },
}: EditCountryFormType) => {
  const [editCountry, { isLoading: isLoadingEditedCountry }] = useEditCountryMutation();
  const [deleteCountry, { isLoading: isDeletingCountry }] = useDeleteCountryMutation();
  const appDispatch = useAppDispatch();

  const countryObj = useAppSelector(state => selectCountryById(state, countryId));

  const formRef = useRef<HTMLFormElement>(null);

  const activeLangId = useAppSelector(selectActiveLangId);
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const showDev = useAppSelector(selectDev);

  const [localCountryName, setLocalCountryName] = useState(countryObj?.country);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const isPending = isLoading || isLoadingEditedCountry || isDeletingCountry;
  const isDisabledEdit = !inputDisabled || isPending;
  const isDisabledSubmit =
    !countryObj ||
    !countryObj.country ||
    isSubmitButtonDisabled ||
    !localCountryName?.trim() ||
    isPending ||
    !activeLangId ||
    !activeLangCode;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabledSubmit) return;
    const editedCountryName = localCountryName?.trim();
    if (!editedCountryName) return;

    const editedCountry: EditCountry = {
      _id: countryObj?._id,
      country: editedCountryName,
      langCode: activeLangCode,
    };

    try {
      const editedResponse = await editCountry(editedCountry).unwrap();
      console.log('editedResponse', editedResponse);

      if (editedResponse) {
        toast.success(`${editedResponse.entities[countryObj._id]?.country} country updated!`);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
      setLocalCountryName(countryObj.country);
    } finally {
      setInputDisabled(true);
      setIsSubmitButtonDisabled(true);
    }
  };

  const onDeleteCountry = useCallback(async () => {
    if (!countryObj?._id) return;

    try {
      await deleteCountry(countryObj?._id).unwrap();
      appDispatch(setActiveCountryId());
      toast.success(`Country deleted`);
    } catch (error) {
      toast.error(`Error while deleting country with _id: ${countryObj?._id}`);
    }
  }, [countryObj?._id, appDispatch, deleteCountry]);

  const startEditing = useCallback(() => {
    if (isEditingCountry) return;

    setIsEditingCountry(true);
    setInputDisabled(false);
    setIsSubmitButtonDisabled(false);
  }, [isEditingCountry, setIsEditingCountry]);

  const stopEditing = useCallback(() => {
    if (!isEditingCountry) return;

    setIsEditingCountry(false);
    setInputDisabled(true);
    setIsSubmitButtonDisabled(true);
  }, [isEditingCountry, setIsEditingCountry]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setLocalCountryName(e.currentTarget.value);

  const selectActiveCountry = useCallback(async () => {
    if (isEditingCountry) return;

    appDispatch(setActiveCountryId(countryObj?._id));
    closeCountriesList();
  }, [isEditingCountry, appDispatch, countryObj?._id, closeCountriesList]);

  const isFirstEdit = countryObj?.langCode?.toUpperCase() === 'EN' && !isEng;

  useEffect(() => {
    if (inputDisabled) return () => {};

    const onOutsideFormClickReset = (e: MouseEvent) => {
      const { target } = e;
      if (!(target instanceof Node)) return;
      if (formRef.current?.contains(target)) return;

      formRef.current?.reset();
      stopEditing();
      setLocalCountryName(countryObj?.country);
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', onOutsideFormClickReset, { passive: true, capture: true });
    }, 0);

    const clearGarbage = () => {
      clearTimeout(timer);
      document.removeEventListener('click', onOutsideFormClickReset, { capture: true });
      stopEditing();
    };

    return clearGarbage;
  }, [countryObj?.country, inputDisabled, stopEditing]);

  return (
    <EditCountryFormStyled onSubmit={handleSubmit} ref={formRef}>
      <CountryInputLabel onClick={selectActiveCountry}>
        <EditCountryInput
          type="text"
          value={localCountryName}
          onChange={onChange}
          disabled={inputDisabled}
          name="editedCountryName"
        />
      </CountryInputLabel>

      {inputDisabled && (
        <EditButton onClick={startEditing} $isFirstEdit={isFirstEdit} disabled={isDisabledEdit} />
      )}

      {!isSubmitButtonDisabled && (
        <button type="submit" disabled={isDisabledSubmit}>
          Done
        </button>
      )}

      {showDev && (
        <button type="button" onClick={onDeleteCountry}>
          Delete
        </button>
      )}
    </EditCountryFormStyled>
  );
};
