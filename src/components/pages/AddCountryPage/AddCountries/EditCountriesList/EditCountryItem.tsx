import { CountryInputLabel, EditCountryForm, EditCountryInput } from './EditCountriesList.styled';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { selectActiveLangCode, setActiveCountry } from 'redux/slices';

import { useEditCountryMutation, useDeleteCountryMutation } from 'redux/apis';
import type { Country } from 'types/apis';
import { EditButton } from '../EditButton/EditButton';

type CountryItem = Country & {
  toggleCountiesList: () => void;
  setIsEditingCountry: (arg: boolean) => void;
  isEditingCountry: boolean;
  isLoading: boolean;
};

export const Item = ({
  _id,
  country,
  langCode,
  international,
  toggleCountiesList,
  isEditingCountry,
  setIsEditingCountry,
  isLoading,
}: CountryItem) => {
  const [editCountry, { isLoading: isLoadingEditedCountry }] = useEditCountryMutation();
  const [deleteCountry, { isLoading: isDeletingCountry }] = useDeleteCountryMutation();
  const appDispatch = useAppDispatch();

  const activeLangCode = useAppSelector(selectActiveLangCode);
  console.log({ activeLangCode });

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
        international: activeLangCode !== 'EN' ? international : editedCountryName,
      };

      try {
        await editCountry(editedCountry);
      } catch (error) {
        console.log(error);
      } finally {
        setInputDisabled(true);
        setIsSubmitButtonDisabled(true);
      }
    },
    [_id, activeLangCode, editCountry, international]
  );

  const onDeleteCountry = useCallback(async () => {
    try {
      await deleteCountry({ _id });
    } catch (error) {}
  }, [_id, deleteCountry]);

  const edit = useCallback(() => {
    setIsEditingCountry(true);
    setInputDisabled(false);
    setIsSubmitButtonDisabled(false);
  }, [setIsEditingCountry]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLocalValue(e.currentTarget.value),
    []
  );

  const selectActiveCountry = useCallback(async () => {
    if (isEditingCountry) return;

    appDispatch(setActiveCountry({ _id, country, langCode, international }));
    toggleCountiesList();
  }, [_id, appDispatch, country, international, isEditingCountry, langCode, toggleCountiesList]);

  const isFirstEdit =
    (langCode?.toUpperCase() === 'EN' && activeLangCode?.toUpperCase() !== 'EN') === true;
  console.log({ isFirstEdit });

  const isPending = isLoading || isLoadingEditedCountry || isDeletingCountry;

  return (
    <li>
      <EditCountryForm onSubmit={handleSubmit}>
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
            onClick={edit}
            $isFirstEdit={isFirstEdit}
            disabled={!inputDisabled || isPending}
          />
        )}

        {!isSubmitButtonDisabled && (
          <button
            type="submit"
            disabled={isSubmitButtonDisabled || !localValue.trim() || isPending}
          >
            Done
          </button>
        )}

        <button type="button" onClick={onDeleteCountry}>
          Delete
        </button>
      </EditCountryForm>
    </li>
  );
};
