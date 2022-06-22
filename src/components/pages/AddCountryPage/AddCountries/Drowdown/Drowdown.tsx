import { RefObject, useEffect, useRef, useState } from 'react';
import { CountriesResponse } from 'types/apis';
import { DropdownStyled } from './Drowdown.styled';
import { EditCountriesList } from '../EditCountriesList/EditCountriesList';
import { AddCountryForm } from '../AddCountryForm/AddCountryForm';

type DropdownType = {
  countries?: CountriesResponse;
  isEng: boolean;
  closeCountriesList: () => void;
  isLoading: boolean;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

export const Dropdown = ({
  countries,
  isEng,
  closeCountriesList,
  isLoading,
  toggleButtonRef,
}: DropdownType) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isEditingCountry, setIsEditingCountry] = useState(false);

  useEffect(() => {
    const isClickOutsideDropdown = (e: MouseEvent) => {
      const { target } = e;

      if (!(target instanceof Node)) return;
      if (dropdownRef.current?.contains(target)) return;
      if (toggleButtonRef.current === target) return;

      closeCountriesList();
    };

    document.addEventListener('click', isClickOutsideDropdown, { passive: true, capture: true });
    return () => document.removeEventListener('click', isClickOutsideDropdown, { capture: true });
  }, [toggleButtonRef, closeCountriesList]);

  return (
    <DropdownStyled ref={dropdownRef}>
      {countries?.length ? (
        <EditCountriesList
          countries={countries}
          isEditingCountry={isEditingCountry}
          setIsEditingCountry={setIsEditingCountry}
          closeCountriesList={closeCountriesList}
          isLoading={isLoading}
        />
      ) : null}

      {isEng && <AddCountryForm isLoading={isLoading} />}
    </DropdownStyled>
  );
};
