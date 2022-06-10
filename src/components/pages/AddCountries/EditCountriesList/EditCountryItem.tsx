import { CountryInputLabel, EditCountryForm, EditCountryInput } from './EditCountriesList.styled';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppDispatch } from 'hooks/redux/hooks';
import { setActiveCountry } from 'redux/slices';

import iconEdit from 'assets/icons/iconEdit.svg';

import { useEditCountryMutation } from 'redux/apis';
import { Country } from 'types/apis';

type CountryItem = Country & {
  toggleCountiesList: () => void;
  setIsEditingCountry: (arg: boolean) => void;
  isEditingCountry: boolean;
};

export const Item = ({
  _id,
  country,
  langCode,
  toggleCountiesList,
  isEditingCountry,
  setIsEditingCountry,
}: CountryItem) => {
  const [editCountry] = useEditCountryMutation();
  const appDispatch = useAppDispatch();

  const [inputDisabled, setInputDisabled] = useState(true);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [localValue, setLocalValue] = useState(country);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const editedCountryName = formData.get('editedCountryName')?.toString().trim();
      if (!editedCountryName) return;

      try {
        await editCountry({ _id, country: editedCountryName, langCode });
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitButtonDisabled(true);
      }
      setInputDisabled(true);
    },
    [_id, editCountry, langCode]
  );

  const edit = useCallback(() => {
    setIsEditingCountry(true);
    setInputDisabled(false);
    setSubmitButtonDisabled(false);
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
          <button onClick={edit} type="button" disabled={!inputDisabled}>
            <img src={iconEdit} alt="" width={24} height={22} />
          </button>
        )}

        {!submitButtonDisabled && (
          <button type="submit" disabled={submitButtonDisabled || !localValue.trim()}>
            Done
          </button>
        )}
      </EditCountryForm>
    </li>
  );
};
