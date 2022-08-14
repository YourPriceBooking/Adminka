import type { EntityId } from '@reduxjs/toolkit';

import { CountryList } from './EditCountriesList.styled';
import { Item } from './EditCountryItem';

type EditCountriesListType = {
  countryIds: EntityId[];
  isEditingCountry: boolean;
  isLoading: boolean;
  setIsEditingCountry: (arg: boolean) => void;
  closeCountriesList: () => void;
};

export const EditCountriesList = ({
  countryIds,
  isEditingCountry,
  setIsEditingCountry,
  closeCountriesList,
  isLoading,
}: EditCountriesListType) => (
  <CountryList>
    {countryIds.map(countryId => (
      <Item
        key={countryId}
        countryId={countryId}
        countryItem={{
          setIsEditingCountry,
          isEditingCountry,
          closeCountriesList,
          isLoading,
        }}
      />
    ))}
  </CountryList>
);
