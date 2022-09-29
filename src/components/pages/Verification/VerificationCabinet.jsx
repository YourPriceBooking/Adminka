import { HotelCards } from './HotelCards/HotelCards';
import { PendingObjects } from './PendingObjects';
import { VerificationHeader } from './VerificationHeader';

export const VerificationCabinet = () => (
  <>
    <VerificationHeader />
    <PendingObjects />
    <HotelCards city="Флорида" hotel="Маямский Би" address="Проспект Ватутина, д. 15, кв. 6" />
    <HotelCards city="Сан-Франциско" hotel="Маямский Би" address="Проспект Ватутина, д. 15, кв. 6" />
    <HotelCards city="Вашингтон" hotel="Маямский Би" address="Проспект Ватутина, д. 15, кв. 6" />
  </>
);