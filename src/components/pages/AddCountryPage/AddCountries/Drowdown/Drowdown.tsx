import { RefObject, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'App';
import { selectIsEnglishActiveLang } from 'features/languages';
import { DropdownStyled } from './Drowdown.styled';
import { AddCountryForm } from '../AddCountryForm/AddCountryForm';
import { CountriesList } from '../CountriesList/CountriesList';

type DropdownType = {
  closeCountriesList: () => void;
  isLoading: boolean;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

export const Dropdown = ({ closeCountriesList, isLoading, toggleButtonRef }: DropdownType) => {
  const isEng = useAppSelector(selectIsEnglishActiveLang);
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
      <CountriesList
        isEditingCountry={isEditingCountry}
        setIsEditingCountry={setIsEditingCountry}
        closeCountriesList={closeCountriesList}
        isLoading={isLoading}
      />

      {isEng && <AddCountryForm isLoading={isLoading} />}
    </DropdownStyled>
  );
};
