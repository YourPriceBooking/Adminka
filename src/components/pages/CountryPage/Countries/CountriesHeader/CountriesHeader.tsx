import { BackButton } from '../BackButton';
import { Countries, SelectCountries } from '../Countries';
import { Languages, SelectLanguages } from '../../Languages';
import { DevelopModeButton } from './DevelopModeButton';
import { CountriesHeaderStyled } from './CountriesHeader.styled';

export const CountriesHeader = () => (
  <CountriesHeaderStyled>
    <BackButton />

    <Countries>
      <SelectCountries />
    </Countries>

    <Languages>
      <SelectLanguages />
    </Languages>

    <DevelopModeButton />
  </CountriesHeaderStyled>
);
