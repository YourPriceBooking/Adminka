import { useGetLanguagesQuery } from 'redux/apis';
import { useCallback, useRef, useState } from 'react';
import { useAppSelector, useVisibleCountries } from 'hooks/redux';
import { selectActiveCountryInternational, selectIsEnglishActiveLang } from 'redux/slices';
import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';
import { Dropdown } from './Drowdown/Drowdown';

export const AddCountries = () => {
  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
  } = useGetLanguagesQuery();

  const visibleCountries = useVisibleCountries(languages);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [showCountries, setShowCountries] = useState(false);
  const closeCountriesList = useCallback(() => setShowCountries(false), []);
  const toggleCountiesList = useCallback(() => setShowCountries(show => !show), []);

  const isLoading = isLoadingLanguagesFirstTime || isFetching;

  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const activeCountryInternational =
    useAppSelector(selectActiveCountryInternational) ?? 'Select country';

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ShowEditorButton type="button" ref={toggleButtonRef} onClick={toggleCountiesList}>
          {activeCountryInternational}
        </ShowEditorButton>

        {showCountries && (
          <Dropdown
            closeCountriesList={closeCountriesList}
            countries={visibleCountries}
            isEng={isEng}
            isLoading={isLoading}
            toggleButtonRef={toggleButtonRef}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
};
