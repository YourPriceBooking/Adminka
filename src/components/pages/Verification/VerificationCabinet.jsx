import { PendingObjects } from './PendingObjects';
import { MainWrapper } from './VerificationCabinet.styled';
import { VerificationHeader } from './VerificationHeader';

export const VerificationCabinet = () => (
  <MainWrapper>
    <VerificationHeader />
    <PendingObjects />
  </MainWrapper>
);