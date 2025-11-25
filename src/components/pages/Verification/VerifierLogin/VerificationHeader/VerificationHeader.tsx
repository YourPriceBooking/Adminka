import { BackButton } from 'components/pages/CountryPage/Countries/BackButton';
import { VerificationDocuments } from './VerificationDocuments';
import { HeaderWrapper } from './VerificationHeader.styled';
import { Verifier } from './Verifier';
import { ExitVerifierButton } from './ExitVerifierButton';
import { HeaderButtons } from './HeaderButtons.styled';

export const VerificationHeader = () => (
  <HeaderWrapper>

    <HeaderButtons>
      <BackButton />
      <ExitVerifierButton />
    </HeaderButtons>

    <Verifier />
    <VerificationDocuments />

  </HeaderWrapper>
);
