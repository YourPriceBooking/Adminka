import { RefObject, useEffect, useRef, useState } from 'react';
import type { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'components/App';
import { selectIsEnglishActiveLang } from 'redux/slices';
import { DropdownStyled } from './Drowdown.styled';
import { EditCountriesList } from '../EditCountriesList/EditCountriesList';
import { AddCountryForm } from '../AddCountryForm/AddCountryForm';

type DropdownType = {
  countryIds: EntityId[] | [] | undefined | null;
  closeCountriesList: () => void;
  isLoading: boolean;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

export const Dropdown = ({
  countryIds,
  closeCountriesList,
  isLoading,
  toggleButtonRef,
}: DropdownType) => {
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
      {countryIds?.length ? (
        <EditCountriesList
          countryIds={countryIds}
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
