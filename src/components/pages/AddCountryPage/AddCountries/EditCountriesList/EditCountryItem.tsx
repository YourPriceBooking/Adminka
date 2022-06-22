import { EditCountryItem } from './EditCountriesList.styled';

import type { Country } from 'types/apis';
import { EditCountryForm } from '../EditCountryForm/EditCountryForm';

export type CountryItem = Country & {
  closeCountriesList: () => void;
  setIsEditingCountry: (arg: boolean) => void;
  isEditingCountry: boolean;
  isLoading: boolean;
};

export const Item = (countryItem: CountryItem) => {
  return (
    <EditCountryItem>
      <EditCountryForm {...countryItem} />
    </EditCountryItem>
  );
};
