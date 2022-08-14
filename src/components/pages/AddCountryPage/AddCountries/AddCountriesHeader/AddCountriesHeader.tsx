import { BackButton } from '../BackButton';
import { AddCountries } from '../AddCountries';
import { LanguagesWithoutCountries } from '../../AddLanguages';
import { DevelopModeButton } from './DevelopModeButton';
import { AddCountriesHeaderStyled } from './AddCountriesHeader.styled';

export const AddCountriesHeader = () => (
  <AddCountriesHeaderStyled>
    <BackButton />
    <AddCountries />
    <LanguagesWithoutCountries />

    <DevelopModeButton />
  </AddCountriesHeaderStyled>
);
