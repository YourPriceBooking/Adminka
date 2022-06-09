import AddCountries from 'components/pages/AddCountries';
import { Container } from 'components/shared/Container';
import AddLanguagePage from './AddLanguagePage';

import styled from 'styled-components/macro';
const Row = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 54px;
`;
export default function AddCountryPage() {
  return (
    <Container>
      <Row>
        <AddCountries />;
        <AddLanguagePage />;
      </Row>
    </Container>
  );
}
