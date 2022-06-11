import { CountriesResponse, Country } from 'types/apis';
import { CountryList, CountryListWrapper } from './EditCountriesList.styled';
import { Item } from './EditCountryItem';

type EditCountriesListType = {
  isEditingCountry: boolean;
  isLoading: boolean;
  setIsEditingCountry: (arg: boolean) => void;
  countries?: CountriesResponse;
  toggleCountiesList: () => void;
};

export const EditCountriesList = ({
  countries,
  isEditingCountry,
  setIsEditingCountry,
  toggleCountiesList,
  isLoading,
}: EditCountriesListType) => {
  return (
    <CountryListWrapper>
      <CountryList>
        {countries?.map((country: Country) => (
          <Item
            key={country._id}
            {...country}
            setIsEditingCountry={setIsEditingCountry}
            isEditingCountry={isEditingCountry}
            toggleCountiesList={toggleCountiesList}
            isLoading={isLoading}
          />
        ))}
      </CountryList>
    </CountryListWrapper>
  );
};
