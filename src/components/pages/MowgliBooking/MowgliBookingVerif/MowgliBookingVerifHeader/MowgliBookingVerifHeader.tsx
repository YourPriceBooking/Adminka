import { BackButton } from 'components/pages/CountryPage/Countries/BackButton';

import { MowgliVerifier } from './MowgliVerifier';

import { HeaderWrapper } from "./MowgliBookingVerifHeader.styled"
import { MowgliVerificationDocuments } from './MowgliVerificationDocuments';

export const MowgliBookingVerifHeader = () => (
  <HeaderWrapper>
    <BackButton />
    <MowgliVerifier />
    <MowgliVerificationDocuments />
  </HeaderWrapper>
);
