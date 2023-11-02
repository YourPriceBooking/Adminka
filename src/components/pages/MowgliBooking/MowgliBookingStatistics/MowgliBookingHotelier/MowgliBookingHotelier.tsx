// import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import { MowgliBookingStatisticsHeader } from '../MowgliBookingStatisticsHeader/MowgliBookingStatisticsHeader';
import { Wrapper, WrapperArrow } from "./MowgliBookingHotelier.styled"
import { MowgliBookingHotelierList } from './MowgliBookingHotelierList/MowgliBookingHotelierList';
// import arrow from '../../../../assets/icons/arrowHoteliers.svg';

type Prop = {
  page?: string;
};

export const MowgliBookingHoteliers: React.FC<Prop> = ({ page }) => {
  const [isShowHotelier, setIsShowHotelier] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const closeAccount = () => {
    setIsShowHotelier(null);
    setIsClicked(false);
  };

  return (
    <Wrapper padding={typeof isShowHotelier === 'number'}>
      {typeof isShowHotelier === 'number' && (
        <WrapperArrow onClick={closeAccount}>
          {/* <ReactSVG src={arrow} /> */}
        </WrapperArrow>
      )}
      <MowgliBookingStatisticsHeader type="Hoteliers" isShowHotelier={isShowHotelier} />
      <MowgliBookingHotelierList
        type={page}
        isShowHotelier={isShowHotelier}
        setIsShowHotelier={setIsShowHotelier}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    </Wrapper>
  );
};
