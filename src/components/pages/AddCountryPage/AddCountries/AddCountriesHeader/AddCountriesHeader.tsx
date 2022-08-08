import { BackButton } from 'components/pages/AddCountryPage/AddCountries/BackButton';
import { AddCountries } from 'components/pages/AddCountryPage/AddCountries';
import { SelectLang as AddLanguages } from 'components/pages/AddCountryPage/AddLanguages';

import { useAppDispatch, useAppSelector } from 'hooks/redux/hooks';
import { useCallback } from 'react';
import { selectDev, toggleDev } from 'redux/slices';
import {
  AddCountriesHeaderStyled,
  DevButton,
} from 'components/pages/AddCountryPage/AddCountries/AddCountriesHeader/AddCountriesHeader.styled';

export const AddCountriesHeader = () => {
  const appDispatch = useAppDispatch();
  const toggleDeleteButtons = useCallback(() => {
    appDispatch(toggleDev());
  }, [appDispatch]);

  const showDev = useAppSelector(selectDev);

  return (
    <AddCountriesHeaderStyled>
      <BackButton />
      <AddCountries />
      <AddLanguages />

      <DevButton onClick={toggleDeleteButtons}>{showDev ? 'Dev 👨‍💻' : 'Prod 🤴'}</DevButton>
    </AddCountriesHeaderStyled>
  );
};
