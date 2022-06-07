import { AddCountriesStyled, ShowEditorButton } from './AddCountries.styled';
import { Container } from 'components/shared/Container';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectActiveCountryName } from 'redux/slices';

import iconEdit from 'assets/icons/iconEdit.svg';

import styled from 'styled-components';
import { useAddCountryMutation, useEditCountryMutation, useGetCountriesQuery } from 'redux/apis';
import { Country } from 'types/apis';

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

export default function AddCountries() {
  const { data: countries } = useGetCountriesQuery();
  const [addCountry] = useAddCountryMutation();
  // const { data: languages } = useGetLanguagesQuery();
  const activeCountryName = useAppSelector(selectActiveCountryName);
  const [showEditor, setShowEditor] = useState(false);

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
        <div>
          <h1>Countries Page</h1>

          <ShowEditorButton type="button" onClick={toggleEditor}>
            {activeCountryName}
          </ShowEditorButton>

          {showEditor && (
            <div>
              <ul>
                {countries?.map(country => (
                  <Item key={country._id} {...country} />
                ))}
              </ul>

              <form onSubmit={add} onReset={e => e}>
                <input name="newCountryName" type="text" />
                <input name="newCountryLangCode" type="text" />
                <button type="submit">Add country</button>
              </form>
            </div>
          )}
        </div>
      </Container>
    </AddCountriesStyled>
  );
}
