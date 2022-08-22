import { ReactNode, RefObject, useCallback, useRef, useState } from 'react';
import { useAppSelector } from 'App';

import { selectActiveCountryName, useGetCountriesQuery } from 'features/countries';
import { logRender } from 'common/utils';
import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';
import { Dropdown } from './Drowdown';

type ExpandButtonProps = {
  toggleCountriesList: () => void;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

const ActiveCountryButton = ({ toggleCountriesList, toggleButtonRef }: ExpandButtonProps) => {
  const activeCountryName = useAppSelector(selectActiveCountryName) ?? 'Select country';

  return (
    <ShowEditorButton type="button" ref={toggleButtonRef} onClick={toggleCountriesList}>
      {activeCountryName}
    </ShowEditorButton>
  );
};

export const SelectCountries = () => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [showCountries, setShowCountries] = useState(false);
  const closeCountriesList = useCallback(() => setShowCountries(false), []);
  const toggleCountriesList = useCallback(() => setShowCountries(show => !show), []);

  const isLoading = false;

  const showDropdown = showCountries && (
    <Dropdown
      closeCountriesList={closeCountriesList}
      isLoading={isLoading}
      toggleButtonRef={toggleButtonRef}
    />
  );

  logRender('SelectCountries', undefined, true);

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ActiveCountryButton
          toggleCountriesList={toggleCountriesList}
          toggleButtonRef={toggleButtonRef}
        />

        {showDropdown}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
};

export const AddCountries = ({ children }: { children?: ReactNode }) => {
  useGetCountriesQuery();

  return <div>{children}</div>;
};
