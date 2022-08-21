import type { AddCountry } from 'types/apis';
import { useAppDispatch } from 'App';
import { setActiveCountryId, useAddCountryEngMutation } from 'features/countries';
import { selectIsEnglishActiveLang } from 'features/languages';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  AddCountryButton,
  AddCountryFormStyled,
  AddCountryInput,
  AddCountryLabel,
  AddCountryText,
} from './AddCountryForm.styled';

type AddCountryFormProps = { isLoading: boolean };

export const AddCountryForm = ({ isLoading }: AddCountryFormProps) => {
  const [addCountryEng, { isLoading: isAddingCountry, error: addCountryEngMutationError }] =
    useAddCountryEngMutation();

  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (!addCountryEngMutationError || !('data' in addCountryEngMutationError)) return;

    toast.error(JSON.stringify(addCountryEngMutationError.data, null, 2));
  }, [addCountryEngMutationError]);

  const [localNewCountryName, setLocalNewCountryName] = useState('');

  const isSubmitDisabled = isLoading || !localNewCountryName.trim() || isAddingCountry;

  const isEngActive = useSelector(selectIsEnglishActiveLang);

  const onSubmitAddCountry = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitDisabled) return;

      const form = e.currentTarget;
      const formData = new FormData(form);
      const country = formData.get('newCountryName')?.toString().trim();
      if (!country) {
        toast('Kindly provide country name');
        return;
      }
      if (!isEngActive) {
        toast('Please select English to add countries');
        return;
      }

      const newCountry: AddCountry = {
        country,
        international: country,
        langCode: 'EN',
      };

      try {
        const addedCountry = await addCountryEng(newCountry).unwrap();

        if (addedCountry) {
          const newActiveCountryId = Object.values(addedCountry.entities).find(
            countryObj => countryObj?.international === country
          )?._id;

          if (newActiveCountryId) {
            appDispatch(setActiveCountryId(newActiveCountryId));
          }
        }
      } catch (error) {
        toast.error("Country not added. Let's try again");
      } finally {
        form.reset();
      }
    },
    [addCountryEng, appDispatch, isEngActive, isSubmitDisabled]
  );

  return (
    <AddCountryFormStyled onSubmit={onSubmitAddCountry}>
      <AddCountryText>You can add a country, enter the name in English</AddCountryText>

      <div>
        <AddCountryLabel>
          <AddCountryInput
            name="newCountryName"
            type="text"
            value={localNewCountryName}
            onChange={e => setLocalNewCountryName(e.currentTarget.value)}
            maxLength={20}
          />
        </AddCountryLabel>

        <p style={{ padding: '2px 0 0 8px' }}>name of the country in the English language</p>
      </div>

      <AddCountryButton disabled={isSubmitDisabled} type="submit">
        Add country
      </AddCountryButton>
    </AddCountryFormStyled>
  );
};
