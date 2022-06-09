import AddCountries from 'components/pages/AddCountries';
import { Container } from 'components/shared/Container';
import { Row } from 'components/pages/AddCountries/AddCountries.styled';
import { BackButton } from 'components/pages/AddCountries/BackButton';
import AddLanguagePage from './AddLanguagePage';

export default function AddCountryPage() {
  return (
    <Container>
      <Row>
        <BackButton />
        <AddCountries />
        <AddLanguagePage />
      </Row>
    </Container>
  );
}
