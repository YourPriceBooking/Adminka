import { Container } from 'components/shared/Container';
import { CountriesHeader } from 'components/pages/CountryPage/Countries/CountriesHeader';
import { Locations } from 'components/pages/CountryPage/Locations';

const CountryPage = () => (
  <Container>
    <CountriesHeader />
    <Locations />
  </Container>
);

export default CountryPage;
