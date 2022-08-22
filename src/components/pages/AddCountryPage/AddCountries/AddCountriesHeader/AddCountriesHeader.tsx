import { BackButton } from '../BackButton';
import { AddCountries, SelectCountries } from '../AddCountries';
import { AddLanguages, SelectLanguages } from '../../AddLanguages';
import { DevelopModeButton } from './DevelopModeButton';
import { AddCountriesHeaderStyled } from './AddCountriesHeader.styled';

export const AddCountriesHeader = () => (
  <AddCountriesHeaderStyled>
    <BackButton />

    <AddCountries>
      <SelectCountries />
    </AddCountries>

    <AddLanguages>
      <SelectLanguages />
    </AddLanguages>

    <DevelopModeButton />
  </AddCountriesHeaderStyled>
);
