import type { CountryItem } from '../EditCountriesList/EditCountryItem';
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import {
  selectActiveLangCode,
  selectIsEnglishActiveLang,
  setActiveCountry,
  selectDev,
} from 'redux/slices';
import { useEditCountryMutation, useDeleteCountryMutation } from 'redux/apis';
import { toast } from 'react-toastify';
import {
  CountryInputLabel,
  EditCountryFormStyled,
  EditCountryInput,
} from './EditCountryForm.styled';

import { EditButton } from '../EditButton/EditButton';

export const EditCountryForm = ({
  _id,
  country,
  langCode,
  international,
  __v,

  closeCountriesList,
  isEditingCountry,
  setIsEditingCountry,
  isLoading,
}: CountryItem) => {
  const [editCountry, { isLoading: isLoadingEditedCountry }] = useEditCountryMutation();
  const [deleteCountry, { isLoading: isDeletingCountry }] = useDeleteCountryMutation();
  const appDispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEngActive = useAppSelector(selectIsEnglishActiveLang);
  const showDev = useAppSelector(selectDev);

  const [inputDisabled, setInputDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [localValue, setLocalValue] = useState(country);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const editedCountryName = formData.get('editedCountryName')?.toString().trim();
      if (!editedCountryName) return;

      const editedCountry = {
        _id,
        country: editedCountryName,
        langCode: activeLangCode,
        international: isEngActive ? editedCountryName : international,
      };

      try {
        const editedResponse = await editCountry(editedCountry).unwrap();
        if (editedResponse) {
          toast.success(`${editedResponse.country} updated!`);
        }
      } catch (error) {
        toast.error(JSON.stringify(error));
        console.log(error);
      } finally {
        setInputDisabled(true);
        setIsSubmitButtonDisabled(true);
      }
    },
    [_id, activeLangCode, editCountry, international, isEngActive]
  );

  const onDeleteCountry = useCallback(async () => {
    try {
      await deleteCountry({ _id });
    } catch (error) {}
  }, [_id, deleteCountry]);

  const startEditing = useCallback(() => {
    if (isEditingCountry) return;
    console.log('editing');

    setIsEditingCountry(true);
    setInputDisabled(false);
    setIsSubmitButtonDisabled(false);
  }, [isEditingCountry, setIsEditingCountry]);

  const stopEditing = useCallback(() => {
    if (!isEditingCountry) return;
    console.log('stopped editing');

    setIsEditingCountry(false);
    setInputDisabled(true);
    setIsSubmitButtonDisabled(true);
  }, [isEditingCountry, setIsEditingCountry]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLocalValue(e.currentTarget.value),
    []
  );

  const selectActiveCountry = useCallback(async () => {
    if (isEditingCountry) return;

    appDispatch(setActiveCountry({ _id, country, langCode, international, __v }));
    closeCountriesList();
  }, [
    __v,
    _id,
    appDispatch,
    country,
    international,
    isEditingCountry,
    langCode,
    closeCountriesList,
  ]);

  const isFirstEdit = langCode?.toUpperCase() === 'EN' && !isEngActive;

  const isPending = isLoading || isLoadingEditedCountry || isDeletingCountry;

  useEffect(() => {
    if (inputDisabled) return;

    const onOutsideFormClickReset = (e: MouseEvent) => {
      const { target } = e;
      if (!(target instanceof Node)) return;
      if (formRef.current?.contains(target)) return;

      console.log({ target });

      formRef.current?.reset();
      stopEditing();
      setLocalValue(country);
    };

    const timer = setTimeout(() => {
      document.addEventListener('click', onOutsideFormClickReset, { passive: true, capture: true });
      console.log('Click listen added');
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', onOutsideFormClickReset, { capture: true });
      stopEditing();
      console.log('Click listen removed');
    };
  }, [country, inputDisabled, stopEditing]);

  return (
    <EditCountryFormStyled onSubmit={handleSubmit} ref={formRef}>
      <CountryInputLabel onClick={selectActiveCountry}>
        <EditCountryInput
          type="text"
          value={localValue}
          onChange={onChange}
          disabled={inputDisabled}
          name="editedCountryName"
        />
      </CountryInputLabel>

      {inputDisabled && (
        <EditButton
          onClick={startEditing}
          $isFirstEdit={isFirstEdit}
          disabled={!inputDisabled || isPending}
        />
      )}

      {!isSubmitButtonDisabled && (
        <button type="submit" disabled={isSubmitButtonDisabled || !localValue.trim() || isPending}>
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
