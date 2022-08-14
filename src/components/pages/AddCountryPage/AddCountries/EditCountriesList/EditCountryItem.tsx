import { EditCountryForm, type EditCountryFormType } from '../EditCountryForm/EditCountryForm';
import { EditCountryItem } from './EditCountriesList.styled';

export type CountryItem = EditCountryFormType;

export const Item = ({ countryId, countryItem }: CountryItem) => (
  <EditCountryItem>
    <EditCountryForm countryId={countryId} countryItem={countryItem} />
  </EditCountryItem>
);
