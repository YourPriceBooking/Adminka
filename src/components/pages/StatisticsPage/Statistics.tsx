import { fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
import type { Dispatch } from 'redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Inner, Wrapper } from './Statistics.styled';
import { StatisticsBody } from './StatisticsBody/StatisticsBody';
import { StatisticsHeader } from './StatisticsHeader/StatisticsHeader';
import { Hoteliers } from './Hoteliers/Hoteliers';
import { Users } from './Users/Users';
import Objects from './Objects/ObjectsData';

export const StatisticsPage = () => {
  const [isShowHotelierPage, setIsShowHotelierPage] = useState<boolean>(false);
  const [isShowUsersPage, setIsShowUsersPage] = useState(false);
  const [isShowObjectsPage, setIsShowObjectsPage] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();

  useEffect(() => {
    dispatch(fetchHoteliers());
  }, [dispatch]);

  return (
    <Wrapper>
      <Inner>
        <StatisticsHeader type="Statistic" />
        <StatisticsBody
          setIsShowHotelierPage={setIsShowHotelierPage}
          isShowHotelierPage={isShowHotelierPage}
          isShowUsersPage={isShowUsersPage}
          setIsShowUsersPage={setIsShowUsersPage}
          isShowObjectsPage={isShowObjectsPage}
          setIsShowObjectsPage={setIsShowObjectsPage}
        />
      </Inner>
      {isShowHotelierPage && <Hoteliers />}
      {isShowUsersPage && <Users />}
      {isShowObjectsPage && <Objects />}
    </Wrapper>
  );
};

export const Statistics = () => <StatisticsPage />;
