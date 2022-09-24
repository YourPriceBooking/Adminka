import { HotelCards } from './HotelCards/HotelCards';
import { PendingObjects } from './PendingObjects';
import { VerificationHeader } from './VerificationHeader';

export const VerificationCabinet = () => (
  <>
    <VerificationHeader />
    <PendingObjects />
    <HotelCards />
    <HotelCards />
    <HotelCards />
  </>
);