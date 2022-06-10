import { FormEvent, useRef, useState } from 'react';
import { CountriesResponse } from 'types/apis';
import { DropdownStyled } from './Drowdown.styled';
import { EditCountriesList } from '../EditCountriesList/EditCountriesList';
import { AddCountryForm } from '../AddCountryForm/AddCountryForm';

type DropdownType = {
  countries: CountriesResponse;
  isEng: boolean;
  add: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  toggleCountiesList: () => void;
};

export const Dropdown = ({ countries, isEng, add, toggleCountiesList }: DropdownType) => {
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

      {isEng && <AddCountryForm onSubmit={add} />}
    </DropdownStyled>
  );
};
