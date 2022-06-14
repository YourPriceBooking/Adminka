import { useState } from 'react';
import { onSubmitFormType } from 'types/apis';
import {
  AddCountryButton,
  AddCountryFormStyled,
  AddCountryInput,
  AddCountryText,
} from './AddCountryForm.styled';

type AddCountryFormProps = onSubmitFormType & { isLoading: boolean };

export const AddCountryForm = ({ onSubmit, isLoading }: AddCountryFormProps) => {
  const [localNewCountryName, setLocalNewCountryName] = useState('');

  const isSubmitDisabled = !localNewCountryName.trim() || isLoading;

  return (
    <AddCountryFormStyled onSubmit={onSubmit}>
      <AddCountryText>You can add a country, enter the name in English</AddCountryText>

      <AddCountryInput
        name="newCountryName"
        type="text"
        value={localNewCountryName}
        onChange={e => setLocalNewCountryName(e.currentTarget.value)}
        maxLength={20}
      />

      <p>name of the country in the English language</p>

      <AddCountryButton disabled={isSubmitDisabled} type="submit">
        Add country
      </AddCountryButton>
    </AddCountryFormStyled>
  );
};
