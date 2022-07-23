import { Container } from 'components/shared/Container';
import { Header } from 'components/pages/AddCountryPage/AddCountries/AddCountries.styled';
import { BackButton } from 'components/pages/AddCountryPage/AddCountries/BackButton';
import AddCountries from 'components/pages/AddCountryPage/AddCountries';
import { SelectLang as AddLanguages } from 'components/pages/AddCountryPage/AddLanguages';
import AddLocations from 'components/pages/AddCountryPage/AddLocations';
import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { useCallback } from 'react';
import { selectDev, toggleDev } from 'redux/slices';

import styled from 'styled-components/macro';

export const DevButton = styled.button`
  position: absolute;
  top: 0;
  left: 100%;
  padding: 4px 12px;
  width: fit-content;

  opacity: 0.1;

  :hover,
  :active {
    opacity: 0.8;
  }
`;

const AddCountryPage = () => {
  const appDispatch = useAppDispatch();
  const toggleDeleteButtons = useCallback(() => {
    appDispatch(toggleDev());
  }, [appDispatch]);

  const showDev = useAppSelector(selectDev);

  return (
    <Container>
      <Header>
        <BackButton />
        <AddCountries />
        <AddLanguages />

        <DevButton onClick={toggleDeleteButtons}>{showDev ? 'Dev 👨‍💻' : 'Prod 🤴'}</DevButton>
      </Header>

      <AddLocations />
    </Container>
  );
};

export default AddCountryPage;
