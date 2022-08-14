import { RefObject, useCallback, useRef, useState } from 'react';
import { useAppSelector } from 'App';
import { selectActiveCountryName } from 'redux/slices';
import { useSelectCountries } from 'redux/apis';
import { EntityId } from '@reduxjs/toolkit';
import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';
import { Dropdown } from './Drowdown/Drowdown';

type ExpandButtonProps = {
  toggleCountiesList: () => void;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

const ActiveCountryButton = ({ toggleCountiesList, toggleButtonRef }: ExpandButtonProps) => {
  const activeCountryName = useAppSelector(selectActiveCountryName) ?? 'Select country';

  return (
    <ShowEditorButton type="button" ref={toggleButtonRef} onClick={toggleCountiesList}>
      {activeCountryName}
    </ShowEditorButton>
  );
};

const render = {
  AddCountries: 0,
};

type SelectCountriesProps = {
  countryIds: EntityId[] | undefined;
};

const SelectCountries = ({ countryIds }: SelectCountriesProps) => {
  console.log({ AddCountries: (render.AddCountries += 1) });
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [showCountries, setShowCountries] = useState(false);
  const closeCountriesList = useCallback(() => setShowCountries(false), []);
  const toggleCountiesList = useCallback(() => setShowCountries(show => !show), []);

  const isLoading = false;

  // <CountryListItem countryId={countryId}>

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ActiveCountryButton
          toggleCountiesList={toggleCountiesList}
          toggleButtonRef={toggleButtonRef}
        />

        {showCountries && (
          <Dropdown
            countryIds={countryIds}
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
  const countryIds = useSelectCountries();

  return <SelectCountries countryIds={countryIds} />;
};
