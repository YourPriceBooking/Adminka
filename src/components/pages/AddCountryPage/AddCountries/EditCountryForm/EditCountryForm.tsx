import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'components/App';
import { setActiveCountry, selectDev, selectActiveLang } from 'redux/slices';
import { useEditCountryMutation, useDeleteCountryMutation } from 'redux/apis';
import { toast } from 'react-toastify';
import type { ActiveCountry, EditCountry } from 'types/apis';

import type { EntityId } from '@reduxjs/toolkit';
import {
  CountryInputLabel,
  EditCountryFormStyled,
  EditCountryInput,
} from './EditCountryForm.styled';

import { EditButton } from '../EditButton/EditButton';

export type EditCountryFormType = {
  countryId: EntityId;
  countryItem: {
    closeCountriesList: () => void;
    setIsEditingCountry: (arg: boolean) => void;
    isEditingCountry: boolean;
    isLoading: boolean;
  };
};

export const EditCountryForm = ({
  countryId,
  countryItem: { closeCountriesList, isEditingCountry, setIsEditingCountry, isLoading },
}: EditCountryFormType) => {
  const [editCountry, { isLoading: isLoadingEditedCountry }] = useEditCountryMutation();
  const [deleteCountry, { isLoading: isDeletingCountry }] = useDeleteCountryMutation();
  const appDispatch = useAppDispatch();
  const {
    country = '',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id = '',
    langCode = '',
    dbLangCode = '',
    international = '',
    createdAt = '',
    updatedAt = '',
  } = {};

  const formRef = useRef<HTMLFormElement>(null);

  console.log(countryId);

  const activeLang = useAppSelector(selectActiveLang);
  const showDev = useAppSelector(selectDev);
  const isEngActive = activeLang?.code === 'EN';

  const [localCountryName, setLocalCountryName] = useState(country);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const isPending = isLoading || isLoadingEditedCountry || isDeletingCountry;
  const isDisabledEdit = !inputDisabled || isPending;
  const isDisabledSubmit =
    isSubmitButtonDisabled || !localCountryName.trim() || isPending || !activeLang;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabledSubmit) return;
    const editedCountryName = localCountryName.trim();

    const editedCountry: EditCountry = {
      _id,
      country: editedCountryName,
      langCode: activeLang.code,
      international,
      activeLangId: activeLang._id,
    };

    try {
      const editedResponse = await editCountry(editedCountry).unwrap();
      console.log('editedResponse', editedResponse);

      if (editedResponse) {
        toast.success(`${editedResponse.country} updated!`);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
      setLocalCountryName(country);
    } finally {
      setInputDisabled(true);
      setIsSubmitButtonDisabled(true);
    }
  };

  const onDeleteCountry = useCallback(async () => {
    try {
      await deleteCountry({ _id }).unwrap();
      appDispatch(setActiveCountry(null));
      toast.success(`Country deleted`);
    } catch (error) {
      toast.error(`Error while deleting country with _id: ${_id}`);
    }
  }, [_id, appDispatch, deleteCountry]);

  const startEditing = useCallback(() => {
    if (isEditingCountry) return;
    // console.log('editing');

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

    const newActiveCountry: ActiveCountry = {
      _id,
      international,
      country,
      langCode,
      dbLangCode,
      createdAt,
      updatedAt,
    };

    appDispatch(setActiveCountry(newActiveCountry));
    closeCountriesList();
  }, [
    isEditingCountry,
    _id,
    international,
    country,
    langCode,
    dbLangCode,
    createdAt,
    updatedAt,
    appDispatch,
    closeCountriesList,
  ]);

  const isFirstEdit = langCode?.toUpperCase() === 'EN' && !isEngActive;

  useEffect(() => {
    if (inputDisabled) return () => {};

    const onOutsideFormClickReset = (e: MouseEvent) => {
      const { target } = e;
      if (!(target instanceof Node)) return;
      if (formRef.current?.contains(target)) return;

      formRef.current?.reset();
      stopEditing();
      setLocalCountryName(country);
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
  }, [country, inputDisabled, stopEditing]);

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
