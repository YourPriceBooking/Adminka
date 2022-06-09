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

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveCountryName, selectActiveLang } from 'redux/slices';

import iconEdit from 'assets/icons/iconEdit.svg';

import styled from 'styled-components/macro';
import { useAddCountryMutation, useEditCountryMutation, useGetCountriesQuery } from 'redux/apis';
import { CountriesResponse, Country } from 'types/apis';

export const EditCountryInput = styled.input`
  font-size: 20px;
  padding: 4px 8px;
`;

const Item = ({ _id, country, langCode }: Country) => {
  const [editCountry, { data: editedCountry }] = useEditCountryMutation();
  console.log({ editedCountry });

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
  return (
    <li>
      <EditCountryForm onSubmit={handleSubmit}>
        <CountryInputLabel>
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

interface ExpandInterface {
  countries: CountriesResponse;
  isEng: boolean;
  add: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  delay: number;
}

const Expand = ({ countries, isEng, add, delay }: ExpandInterface) => {
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    setIsHidden(false);
    return () => setIsHidden(true);
  }, [delay]);

  const onAnimationEnd = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  return (
    <Expandable isHidden={isHidden} onAnimationEnd={onAnimationEnd}>
      <CountryListWrapper>
        <CountryList>
          {countries?.map((country: Country) => (
            <Item key={country._id} {...country} />
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
  const [showEditor, setShowEditor] = useState(false);

  const activeLang = useAppSelector(selectActiveLang);

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

  const toggleEditor = useCallback(() => setShowEditor(!showEditor), [showEditor]);

  return (
    <AddCountriesStyled>
      <CountryEditorWrapper>
        <ShowEditorButton type="button" onClick={toggleEditor}>
          {activeCountryName}
        </ShowEditorButton>

        {showEditor && <Expand countries={countries} isEng={isEng} add={add} delay={250} />}
      </CountryEditorWrapper>
      Hello, Salut!
    </AddCountriesStyled>
  );
}
