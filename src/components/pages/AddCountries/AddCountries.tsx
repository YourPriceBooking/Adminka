import {
  AddCountriesStyled,
  AddCountryButton,
  AddCountryForm,
  AddCountryInput,
  AddCountryText,
  CountryEditorWrapper,
  CountryInputLabel,
  CountryList,
  CountryListWrapper,
  EditCountryForm,
  Expandable,
  ShowEditorButton,
} from './AddCountries.styled';

import { ChangeEvent, FormEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { Lang, selectActiveCountryName, selectActiveLang, setActiveCountry } from 'redux/slices';

import iconEdit from 'assets/icons/iconEdit.svg';

import styled from 'styled-components/macro';
import { useAddCountryMutation, useEditCountryMutation, useGetCountriesQuery } from 'redux/apis';
import { CountriesResponse, Country } from 'types/apis';

export const EditCountryInput = styled.input`
  font-size: 20px;
  padding: 4px 8px;
`;

const Item = ({
  _id,
  country,
  langCode,
  setShowCountries,
}: Country & { setShowCountries: (arg: boolean) => void }) => {
  const [editCountry] = useEditCountryMutation();
  const appDispatch = useAppDispatch();

  const [inputDisabled, setInputDisabled] = useState(true);
  const [localValue, setLocalValue] = useState(country);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const editedCountryName = formData.get('editedCountryName')?.toString().trim();
      if (!editedCountryName) return;

      try {
        await editCountry({ _id, country: editedCountryName, langCode });
      } catch (error) {
        console.log(error);
      }
      setInputDisabled(true);
    },
    [_id, editCountry, langCode]
  );

  const edit = useCallback(() => setInputDisabled(false), []);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setLocalValue(e.currentTarget.value),
    []
  );

  const selectActiveCountry = async () => {
    appDispatch(setActiveCountry({ _id, country, langCode }));
    setShowCountries(false);
  };

  return (
    <li>
      <EditCountryForm onSubmit={handleSubmit}>
        <CountryInputLabel onClick={selectActiveCountry}>
          <EditCountryInput
            type="text"
            value={localValue}
            onChange={onChange}
            disabled={inputDisabled}
            name="editedCountryName"
          />
        </CountryInputLabel>

        {inputDisabled && (
          <button onClick={edit} type="button" disabled={!inputDisabled}>
            <img src={iconEdit} alt="" width={24} height={22} />
          </button>
        )}

        {!inputDisabled && (
          <button type="submit" disabled={inputDisabled || !localValue.trim()}>
            Done
          </button>
        )}
      </EditCountryForm>
    </li>
  );
};

type ExpandType = {
  countries: CountriesResponse;
  isEng: boolean;
  add: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  setShowCountries: (arg: boolean) => void;
  toggleButtonRef: RefObject<HTMLButtonElement>;
};

const Expand = ({ toggleButtonRef, setShowCountries, countries, isEng, add }: ExpandType) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = async (e: MouseEvent) => {
      if (toggleButtonRef.current === e.target) {
        return setShowCountries(true);
      }

      const { target } = e;
      if (target instanceof Node && !wrapperRef.current?.contains(target)) {
        setShowCountries(false);
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [setShowCountries, toggleButtonRef]);

  return (
    <Expandable ref={wrapperRef}>
      <CountryListWrapper>
        <CountryList>
          {countries?.map((country: Country) => (
            <Item key={country._id} {...country} setShowCountries={setShowCountries} />
          ))}
        </CountryList>
      </CountryListWrapper>

      {isEng && (
        <AddCountryForm onSubmit={add}>
          <AddCountryText>You can add a country, enter the name in English</AddCountryText>

          <AddCountryInput name="newCountryName" type="text" />
          <p>name of the country in the English language</p>

          <AddCountryButton type="submit">Add country</AddCountryButton>
        </AddCountryForm>
      )}
    </Expandable>
  );
};

export default function AddCountries() {
  const { data: countries } = useGetCountriesQuery();
  const [addCountry] = useAddCountryMutation();
  // const { data: languages } = useGetLanguagesQuery();
  // console.log("AddCountries ~ languages", languages)
  const activeCountryName = useAppSelector(selectActiveCountryName);
  const [showCountries, setShowCountries] = useState(false);

  const activeLang = useAppSelector<Lang[]>(selectActiveLang);

  const isEng = activeLang[0]?.language === 'EN';

  const add = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const country = formData.get('newCountryName')?.toString().trim();
      if (!country) return;

      try {
        await addCountry({ country });
      } catch (error) {
        console.log(error);
      }

      form.reset();
    },
    [addCountry]
  );

  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ShowEditorButton
          type="button"
          onClick={() => setShowCountries(!showCountries)}
          ref={toggleButtonRef}
        >
          {activeCountryName}
        </ShowEditorButton>

        {showCountries && (
          <Expand
            toggleButtonRef={toggleButtonRef}
            setShowCountries={setShowCountries}
            countries={countries}
            isEng={isEng}
            add={add}
          />
        )}
      </CountryEditorWrapper>
    </AddCountriesStyled>
  );
}
