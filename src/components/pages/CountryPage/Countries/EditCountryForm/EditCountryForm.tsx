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
import type { EntityId } from '@reduxjs/toolkit';
import {
  selectActiveLangCode,
  selectActiveLanguageId,
  selectIsEnglishActiveLang,
} from 'features/languages';
import {
  CountryInputLabel,
  EditCountryFormStyled,
  EditCountryInput,
} from './EditCountryForm.styled';
import { EditButton } from '../EditButton';

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

  const countryObj = useAppSelector(state => selectCountryById(state, countryId));
  const activeLangId = useAppSelector(selectActiveLanguageId);
  const activeLangCode = useAppSelector(selectActiveLangCode);
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const showDev = useAppSelector(selectDev);
  const [localCountryName, setLocalCountryName] = useState(countryObj?.country);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const formRef = useRef<HTMLFormElement>(null);

  const appDispatch = useAppDispatch();

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

  const onClickSetActiveCountryId = useCallback(async () => {
    if (isEditingCountry) return;

    appDispatch(setActiveCountryId(countryObj?._id));
    closeCountriesList();
  }, [isEditingCountry, appDispatch, countryObj?._id, closeCountriesList]);

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
  }, [countryObj?.country, inputDisabled, stopEditing]);

  if (!countryObj) return null;
  const { _id: id, country, international } = countryObj;

  const isPending = isLoading || isLoadingEditedCountry || isDeletingCountry;
  const isDisabledEdit = !inputDisabled || isPending;
  const isDisabledSubmit =
    !country ||
    !international ||
    isSubmitButtonDisabled ||
    isPending ||
    !activeLangId ||
    !activeLangCode;

  const isDeleteDisabled = isPending;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabledSubmit || !localCountryName?.trim()) return;
    const editedCountryName = localCountryName?.trim();
    if (!editedCountryName) return;

    const editedCountry: EditCountry = {
      _id: id,
      country: editedCountryName,
      langCode: activeLangCode,
      international,
    };

    try {
      const editedResponse = await editCountry(editedCountry).unwrap();

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setLocalCountryName(e.currentTarget.value);

  const isFirstEdit = countryObj?.langCode === 'EN' && !isEng;

  // countryObj

  const editCountryFormInterface = (
    <CountryInputLabel onClick={onClickSetActiveCountryId}>
      <EditCountryInput
        type="text"
        value={localCountryName}
        onChange={onChange}
        disabled={inputDisabled}
        name="editedCountryName"
      />
    </CountryInputLabel>
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

      {showDev && (
        <button type="button" onClick={onDeleteCountry} disabled={isDeleteDisabled}>
          Delete
        </button>
      )}
    </>
  );

  return (
    <EditCountryFormStyled onSubmit={handleSubmit} ref={formRef}>
      {editCountryFormInterface}

      {showOverlay}
    </EditCountryFormStyled>
  );
};
