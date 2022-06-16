import { CountriesResponse, Country } from 'types/apis';
import { CountryList, CountryListWrapper } from './EditCountriesList.styled';
import { Item } from './EditCountryItem';

type EditCountriesListType = {
  isEditingCountry: boolean;
  isLoading: boolean;
  setIsEditingCountry: (arg: boolean) => void;
  countries?: CountriesResponse;
  closeCountiesList: () => void;
};

export const EditCountriesList = ({
  countries,
  isEditingCountry,
  setIsEditingCountry,
  closeCountiesList,
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
            closeCountiesList={closeCountiesList}
            isLoading={isLoading}
          />
        ))}
      </CountryList>
    </CountryListWrapper>
  );
};
