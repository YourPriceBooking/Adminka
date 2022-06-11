import { CountryInputLabel, EditCountryForm, EditCountryInput } from './EditCountriesList.styled';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { selectActiveLangCode, setActiveCountry } from 'redux/slices';

import { ReactComponent as IconEdit } from 'assets/icons/iconEdit.svg';

import { useAddCountryNotEngMutation, useEditCountryInEngMutation } from 'redux/apis';
import type { Country } from 'types/apis';

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
  toggleCountiesList,
  isEditingCountry,
  setIsEditingCountry,
  isLoading,
}: CountryItem) => {
  const [editCountryInEng, { isLoading: isEditingCountryInEng }] = useEditCountryInEngMutation();
  const [addCountryNotEng, { isLoading: isAddingCountryNotEng }] = useAddCountryNotEngMutation();
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

      try {
        if (activeLangCode === 'EN') {
          await editCountryInEng({ _id, country: editedCountryName });
        } else {
          await addCountryNotEng({ country: editedCountryName, langCode: activeLangCode });
          // appDispatch(addEditedEngCountryId);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitButtonDisabled(true);
      }
      setInputDisabled(true);
    },
    [_id, activeLangCode, addCountryNotEng, editCountryInEng]
  );

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

    appDispatch(setActiveCountry({ _id, country, langCode }));
    toggleCountiesList();
  }, [_id, appDispatch, country, isEditingCountry, langCode, toggleCountiesList]);

  const isFirstEdit = langCode?.toUpperCase() === 'EN';
  console.log({ isFirstEdit });

  const isPending = isLoading || isEditingCountryInEng || isAddingCountryNotEng;

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
          <button onClick={edit} type="button" disabled={!inputDisabled || isPending}>
            <IconEdit style={{ fill: isFirstEdit ? 'orange' : '#9B9B9B' }} />
          </button>
        )}

        {!isSubmitButtonDisabled && (
          <button
            type="submit"
            disabled={isSubmitButtonDisabled || !localValue.trim() || isPending}
          >
            Done
          </button>
        )}
      </EditCountryForm>
    </li>
  );
};
