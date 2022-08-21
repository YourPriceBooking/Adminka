import { useAppSelector } from 'App';
import { selectVisibleCountriesIds } from 'features/languages';
import { CountryListStyled } from './CountriesList.styled';
import { CountryItem } from './CountryItem';

type CountriesListProps = {
  isEditingCountry: boolean;
  isLoading: boolean;
  setIsEditingCountry: (arg: boolean) => void;
  closeCountriesList: () => void;
};

export const CountriesList = ({
  isEditingCountry, // 1
  isLoading,
  setIsEditingCountry,
  closeCountriesList,
}: CountriesListProps) => {
  const countriesIds = useAppSelector(selectVisibleCountriesIds);
  console.log('countriesIds', countriesIds);

  return (
    <CountryListStyled>
      {countriesIds?.map(countryId => (
        <CountryItem
          key={countryId}
          countryItem={{
            countryId,
            isEditingCountry,
            isLoading,
            setIsEditingCountry,
            closeCountriesList,
          }}
        />
      ))}
    </CountryListStyled>
  );
};
