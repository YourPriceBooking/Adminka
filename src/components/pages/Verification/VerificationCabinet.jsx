import { PendingObjects } from './PendingObjects';
import { MainWrapper } from './VerificationCabinet.styled';
import { VerificationHeader } from './VerifierLogin/VerificationHeader/VerificationHeader';

export const VerificationCabinet = () => (
  <div>
    <MainWrapper>
      <VerificationHeader />
      <PendingObjects />
    </MainWrapper>
  </div>
);
