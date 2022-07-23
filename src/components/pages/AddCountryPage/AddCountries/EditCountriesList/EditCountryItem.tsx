import type { Country } from 'types/apis';
import { EditCountryItem } from './EditCountriesList.styled';

import { EditCountryForm } from '../EditCountryForm/EditCountryForm';

export type CountryItem = Country & {
  closeCountriesList: () => void;
  setIsEditingCountry: (arg: boolean) => void;
  isEditingCountry: boolean;
  isLoading: boolean;
};

export const Item = (countryItem: CountryItem) => (
  <EditCountryItem>
    <EditCountryForm {...countryItem} />
  </EditCountryItem>
);
