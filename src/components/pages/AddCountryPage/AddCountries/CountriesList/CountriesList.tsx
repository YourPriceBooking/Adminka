import { useAppSelector } from 'App';
import { selectActiveLangId } from 'features/common';
import { CountryListStyled } from './CountriesList.styled';
import { CountryItem } from './CountryItem';

type CountriesListProps = {
  isEditingCountry: boolean;
  isLoading: boolean;
  setIsEditingCountry: (arg: boolean) => void;
  closeCountriesList: () => void;
};

const ids = ['1', '2'];
const useSelectCountriesIds = () => {
  const languageId = useAppSelector(selectActiveLangId);
  console.log('useSelectCountriesIds ~ languageId', languageId);

  return ids;
};

export const CountriesList = ({
  isEditingCountry, // 1
  isLoading,
  setIsEditingCountry,
  closeCountriesList,
}: CountriesListProps) => {
  const countryIds = useSelectCountriesIds();

  return (
    <CountryListStyled>
      {countryIds.map(countryId => (
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
