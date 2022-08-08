import { Container } from 'components/shared/Container';
import { AddLocations } from 'components/pages/AddCountryPage/AddLocations';
import { AddCountriesHeader } from 'components/pages/AddCountryPage/AddCountries/AddCountriesHeader';

const AddCountryPage = () => (
  <Container>
    <AddCountriesHeader />
    <AddLocations />
  </Container>
);

export default AddCountryPage;
