import { RefObject, useCallback, useRef, useState } from 'react';
import { useAppSelector } from 'App';

import { selectActiveCountryId, selectCountryById, useGetCountriesQuery } from 'features/countries';
import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';
import { Dropdown } from './Drowdown';

type ExpandButtonProps = {
  toggleCountiesList: () => void;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

const ActiveCountryButton = ({ toggleCountiesList, toggleButtonRef }: ExpandButtonProps) => {
  const id = useAppSelector(selectActiveCountryId) ?? '';
  const activeCountry = useAppSelector(state => selectCountryById(state, id));

  return (
    <ShowEditorButton type="button" ref={toggleButtonRef} onClick={toggleCountiesList}>
      {activeCountry?.country || 'Select country'}
    </ShowEditorButton>
  );
};

const SelectCountries = () => {
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [showCountries, setShowCountries] = useState(false);
  const closeCountriesList = useCallback(() => setShowCountries(false), []);
  const toggleCountiesList = useCallback(() => setShowCountries(show => !show), []);

  const isLoading = false;

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ActiveCountryButton
          toggleCountiesList={toggleCountiesList}
          toggleButtonRef={toggleButtonRef}
        />

        {showCountries && (
          <Dropdown
            closeCountriesList={closeCountriesList}
            isLoading={isLoading}
            toggleButtonRef={toggleButtonRef}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
};

export const AddCountries = () => {
  useGetCountriesQuery();

  return <SelectCountries />;
};
