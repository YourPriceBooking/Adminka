import { CountriesResponse, Country } from 'types/apis';
import { CountryList, CountryListWrapper } from './EditCountriesList.styled';
import { Item } from './EditCountryItem';

type EditCountriesListType = {
  isEditingCountry: boolean;
  isLoading: boolean;
  setIsEditingCountry: (arg: boolean) => void;
  countries?: CountriesResponse;
  closeCountriesList: () => void;
};

export const EditCountriesList = ({
  countries,
  isEditingCountry,
  setIsEditingCountry,
  closeCountriesList,
  isLoading,
}: EditCountriesListType) => (
  <CountryListWrapper>
    <CountryList>
      {countries?.map((country: Country) => (
        <Item
          key={country._id}
          countryItem={{
            country,
            setIsEditingCountry,
            isEditingCountry,
            closeCountriesList,
            isLoading,
          }}
        />
      ))}
    </CountryList>
  </CountryListWrapper>
);
