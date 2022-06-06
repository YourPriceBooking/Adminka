import { AddCountriesStyled, ShowEditorButton } from './AddCountries.styled';
import { Container } from 'components/shared/Container';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import {
  addCountry,
  CountryInterface,
  editCountry,
  selectActiveCountryName,
  selectCountries,
} from 'redux/slices';

import iconEdit from 'assets/icons/iconEdit.svg';

import styled from 'styled-components';
export const EditCountryInput = styled.input`
  font-size: 20px;
  padding: 4px 8px;
`;

const Item = ({ id, name }: CountryInterface) => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [localValue, setLocalValue] = useState(name);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newName = formData.get('newName')?.toString().trim();
    if (!newName) return;
    dispatch(editCountry({ id, name: newName }));
    setInputDisabled(true);
  };

  const edit = () => setInputDisabled(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setLocalValue(e.currentTarget.value);

  return (
    <li>
      <form onSubmit={handleSubmit}>
        <EditCountryInput
          type="text"
          value={localValue}
          onChange={onChange}
          disabled={inputDisabled}
          name="newName"
        />
        <button onClick={edit} type="button" disabled={!inputDisabled}>
          <img src={iconEdit} alt="" width={24} height={22} />
        </button>

        <button type="submit" disabled={inputDisabled || !name.trim()}>
          Done
        </button>
      </form>
    </li>
  );
};

export default function AddCountries() {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectCountries);
  const activeCountryName = useAppSelector(selectActiveCountryName);
  const [showEditor, setShowEditor] = useState(false);

  const add = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    if (!name) return;

    dispatch(addCountry({ name }));
    form.reset();
  };

  return (
    <AddCountriesStyled>
      <Container>
        <div>
          <h1>Countries Page</h1>

          <ShowEditorButton type="button" onClick={() => setShowEditor(!showEditor)}>
            {activeCountryName}
          </ShowEditorButton>

          {showEditor && (
            <div>
              <ul>
                {countries.map(country => (
                  <Item key={country.id} {...country} />
                ))}
              </ul>

              <form onSubmit={add} onReset={e => e}>
                <input name="name" type="text" />
                <button type="submit">Add country</button>
              </form>
            </div>
          )}
        </div>
      </Container>
    </AddCountriesStyled>
  );
}
