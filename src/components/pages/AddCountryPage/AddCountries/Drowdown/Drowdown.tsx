import { FormEvent, RefObject, useEffect, useRef, useState } from 'react';
import { CountriesResponse } from 'types/apis';
import { DropdownStyled } from './Drowdown.styled';
import { EditCountriesList } from '../EditCountriesList/EditCountriesList';
import { AddCountryForm } from '../AddCountryForm/AddCountryForm';

type DropdownType = {
  countries?: CountriesResponse;
  isEng: boolean;
  onSubmitAddCountry: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  toggleCountiesList: () => void;
  isLoading: boolean;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

export const Dropdown = ({
  countries,
  isEng,
  onSubmitAddCountry,
  toggleCountiesList,
  isLoading,
  toggleButtonRef,
}: DropdownType) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isEditingCountry, setIsEditingCountry] = useState(false);

  useEffect(() => {
    const isClickOutsideDropdown = (e: MouseEvent) => {
      if (
        !(e.target instanceof Node) ||
        e.target === toggleButtonRef.current ||
        wrapperRef.current?.contains(e.target)
      ) {
        return;
      }

      toggleCountiesList();
    };

    document.addEventListener('click', isClickOutsideDropdown);
    return () => {
      document.removeEventListener('click', isClickOutsideDropdown);
    };
  }, [toggleButtonRef, toggleCountiesList]);

  return (
    <DropdownStyled ref={wrapperRef}>
      {countries?.length ? (
        <EditCountriesList
          countries={countries}
          isEditingCountry={isEditingCountry}
          setIsEditingCountry={setIsEditingCountry}
          toggleCountiesList={toggleCountiesList}
          isLoading={isLoading}
        />
      ) : null}

      {isEng && <AddCountryForm onSubmit={onSubmitAddCountry} isLoading={isLoading} />}
    </DropdownStyled>
  );
};
