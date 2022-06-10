import { FormEvent, useRef, useState } from 'react';
import { CountriesResponse } from 'types/apis';
import { DropdownStyled } from './Drowdown.styled';
import { EditCountriesList } from '../EditCountriesList/EditCountriesList';
import { AddCountryForm } from '../AddCountryForm/AddCountryForm';

type DropdownType = {
  countries: CountriesResponse;
  isEng: boolean;
  onSubmitAddCountry: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  toggleCountiesList: () => void;
  isLoading: boolean;
};

export const Dropdown = ({
  countries,
  isEng,
  onSubmitAddCountry,
  toggleCountiesList,
  isLoading,
}: DropdownType) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isEditingCountry, setIsEditingCountry] = useState(false);

  return (
    <DropdownStyled ref={wrapperRef}>
      <EditCountriesList
        countries={countries}
        isEditingCountry={isEditingCountry}
        setIsEditingCountry={setIsEditingCountry}
        toggleCountiesList={toggleCountiesList}
      />

      {isEng && <AddCountryForm onSubmit={onSubmitAddCountry} isLoading={isLoading} />}
    </DropdownStyled>
  );
};
