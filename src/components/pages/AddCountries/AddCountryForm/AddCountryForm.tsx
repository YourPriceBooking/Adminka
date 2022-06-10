import { onSubmitFormType } from 'types/apis';

import {
  AddCountryButton,
  AddCountryFormStyled,
  AddCountryInput,
  AddCountryText,
} from './AddCountryForm.styled';

export const AddCountryForm = ({ onSubmit }: onSubmitFormType) => {
  return (
    <AddCountryFormStyled onSubmit={onSubmit}>
      <AddCountryText>You can add a country, enter the name in English</AddCountryText>

      <AddCountryInput name="newCountryName" type="text" />
      <p>name of the country in the English language</p>

      <AddCountryButton type="submit">Add country</AddCountryButton>
    </AddCountryFormStyled>
  );
};
