import { Container } from 'components/shared/Container';
import { Header } from 'components/pages/AddCountryPage/AddCountries/AddCountries.styled';
import { BackButton } from 'components/pages/AddCountryPage/AddCountries/BackButton';
import AddCountries from 'components/pages/AddCountryPage/AddCountries';
import AddLanguages from 'components/pages/AddCountryPage/AddLanguages';
import AddLocations from 'components/pages/AddCountryPage/AddLocations';

export default function AddCountryPage() {
  return (
    <Container>
      <Header>
        <BackButton />
        <AddCountries />
        <AddLanguages />
      </Header>

      <AddLocations />
    </Container>
  );
}
