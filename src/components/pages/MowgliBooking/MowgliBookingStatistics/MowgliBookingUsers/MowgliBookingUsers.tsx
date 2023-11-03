// import { ReactSVG } from 'react-svg';
import { useState } from 'react';
import { MowgliBookingStatisticsHeader } from '../MowgliBookingStatisticsHeader/MowgliBookingStatisticsHeader';
import { MowgliBookingUsersList } from './MowgliBookingUsersList/MowgliBookingUsersList';
import { Wrapper, WrapperArrow } from './MowgliBookingUsers.styled';
// import arrow from '../../../../assets/icons/arrowHoteliers.svg';

type Prop = {
  page?: string;
};

export const MowgliBookingUsers: React.FC<Prop> = ({ page }) => {
  const [isShowUsers, setIsShowUsers] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const closeAccount = () => {
    setIsShowUsers(null);
    setIsClicked(false);
  };

  return (
    <Wrapper padding={typeof isShowUsers === 'number'}>
      {typeof isShowUsers === 'number' && (
        <WrapperArrow onClick={closeAccount}>{/* <ReactSVG src={arrow} /> */}</WrapperArrow>
      )}
      <MowgliBookingStatisticsHeader type="Users" isShowUsers={isShowUsers} />
      <MowgliBookingUsersList
        type={page}
        isShowUsers={isShowUsers}
        setIsShowUsers={setIsShowUsers}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      />
    </Wrapper>
  );
};
