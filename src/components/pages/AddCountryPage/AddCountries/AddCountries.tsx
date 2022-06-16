import { AddCountriesStyled, CountryEditorWrapper, ShowEditorButton } from './AddCountries.styled';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import {
  selectActiveCountryName,
  selectActiveLangId,
  selectIsEnglishActiveLang,
  setActiveCountry,
} from 'redux/slices';

import { useAddCountryEngMutation, useGetLanguagesQuery } from 'redux/apis';
import { Dropdown } from './Drowdown/Drowdown';
import { toast } from 'react-toastify';

export default function AddCountries() {
  const appDispatch = useAppDispatch();

  const {
    data: languages,
    isLoading: isLoadingLanguagesFirstTime,
    isFetching,
  } = useGetLanguagesQuery();

  const [addCountryEng, { isLoading: isAddingCountry, error: addCountryEngMutationError }] =
    useAddCountryEngMutation();

  useEffect(() => {
    if (!addCountryEngMutationError || !('data' in addCountryEngMutationError)) return;

    toast.error(<p>{JSON.stringify(addCountryEngMutationError.data, null, 2)}</p>);
  }, [addCountryEngMutationError]);

  const isLoading = isLoadingLanguagesFirstTime || isFetching || isAddingCountry;
  const isEng = useAppSelector(selectIsEnglishActiveLang);
  const activeLangId = useAppSelector(selectActiveLangId);

  const activeCountryName = useAppSelector(selectActiveCountryName) ?? 'Select country';

  const derivedVisibleCountries = useMemo(
    () => languages?.find(language => language._id === activeLangId)?.countries,
    [activeLangId, languages]
  );

  // const { data: visibleCountries } = useGetCountriesQuery();

  const [showCountries, setShowCountries] = useState(false);

  const onSubmitAddCountry = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const country = formData.get('newCountryName')?.toString().trim();
      if (!country) {
        toast('Kindly provide country name');
        return;
      }
      if (!isEng) {
        toast('Please select English language to add countries');
        return;
      }

      const newCountry = { country, international: country };

      try {
        const addedCountry = await addCountryEng(newCountry).unwrap();
        if (addedCountry) {
          appDispatch(setActiveCountry(addedCountry));
          toast.success(`${addedCountry} added`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Country not added. Let's try again");
      } finally {
        form.reset();
      }
    },
    [addCountryEng, appDispatch, isEng]
  );

  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const toggleCountiesList = useCallback(() => setShowCountries(!showCountries), [showCountries]);

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ShowEditorButton type="button" ref={toggleButtonRef} onClick={toggleCountiesList}>
          {activeCountryName}
        </ShowEditorButton>

        {showCountries && (
          <Dropdown
            toggleCountiesList={toggleCountiesList}
            countries={derivedVisibleCountries}
            isEng={isEng}
            onSubmitAddCountry={onSubmitAddCountry}
            isLoading={isLoading}
            toggleButtonRef={toggleButtonRef}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
}
