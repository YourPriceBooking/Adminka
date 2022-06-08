import {
  AddCountriesStyled,
  CountryEditorWrapper,
  Expandable,
  ShowEditorButton,
} from './AddCountries.styled';
import { Container } from 'components/shared/Container';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveCountryName, selectActiveLang } from 'redux/slices';

import iconEdit from 'assets/icons/iconEdit.svg';

import styled from 'styled-components';
import { useAddCountryMutation, useEditCountryMutation, useGetCountriesQuery } from 'redux/apis';
import { CountriesResponse, Country } from 'types/apis';

export const EditCountryInput = styled.input`
  font-size: 20px;
  padding: 4px 8px;
`;

let renderCount = 0;

const Item = ({ _id, country, langCode }: Country) => {
  const [editCountry, { data: editedCountry }] = useEditCountryMutation();
  console.log({ editedCountry, renderCount: (renderCount += 1) });

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
      <form onSubmit={handleSubmit}>
        <EditCountryInput
          type="text"
          value={localValue}
          onChange={onChange}
          disabled={inputDisabled}
          name="editedCountryName"
        />
        <button onClick={edit} type="button" disabled={!inputDisabled}>
          <img src={iconEdit} alt="" width={24} height={22} />
        </button>

        <button type="submit" disabled={inputDisabled || !localValue.trim()}>
          Done
        </button>
      </form>
    </li>
  );
};

interface ExpandInterface {
  showEditor: boolean;
  countries: CountriesResponse;
  isEng: boolean;
  add: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  delay: number;
}

const Expand = ({ showEditor, countries, isEng, add, delay }: ExpandInterface) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, [delay]);

  return (
    <Expandable showEditor={showEditor} className={mounted ? '' : 'isHidden'}>
      <ul>
        {countries?.map((country: Country) => (
          <Item key={country._id} {...country} />
        ))}
      </ul>

      {isEng && (
        <form onSubmit={add}>
          <input name="newCountryName" type="text" />
          <input name="newCountryLangCode" type="text" />
          <button type="submit">Add country</button>
        </form>
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
  const isEng = activeLang === 'eng';

  const add = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      const country = formData.get('newCountryName')?.toString().trim();
      const langCode = formData.get('newCountryLangCode')?.toString().trim();
      if (!country || !langCode) return;

      try {
        await addCountry({ country, langCode });
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
      <Container>
        <CountryEditorWrapper>
          <ShowEditorButton type="button" onClick={toggleEditor}>
            {activeCountryName}
          </ShowEditorButton>

          {showEditor && (
            <Expand
              showEditor={showEditor}
              countries={countries}
              isEng={isEng}
              add={add}
              delay={250}
            />
          )}
        </CountryEditorWrapper>
        Hello, Salut!
      </Container>
    </AddCountriesStyled>
  );
}
