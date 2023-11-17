
import { fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
import type { Dispatch } from 'redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { MowgliBookingStatisticsHeader } from './MowgliBookingStatisticsHeader/MowgliBookingStatisticsHeader';
import { MowgliBookingStatisticsBody } from './MowgliBookingStatisticsBody/MowgliBookingStatisticsBody';

import { MowgliBookingHoteliers } from './MowgliBookingHotelier/MowgliBookingHotelier';
import { MowgliBookingUsers } from './MowgliBookingUsers/MowgliBookingUsers';

import { MowgliBookingMainStatistics, Inner, Main } from './MowgliBookingStatistics.styled';

// console.log(routes)

export const MowgliBookingStatistics = () => {
    const [isShowPage, setIsShowPage] = useState<boolean>(false);
    const [isShowUsersPage, setIsShowUsersPage] = useState(false);
    // eslint-disable-next-line
    type DispatchAction = Dispatch<any>;
    const dispatch: DispatchAction = useDispatch();

    useEffect(() => {
        dispatch(fetchHoteliers());
     
    }, [dispatch]);
    return (
      <Main>
        <MowgliBookingMainStatistics>
          <Inner>
            <MowgliBookingStatisticsHeader type="Statistic" />
            <MowgliBookingStatisticsBody
              setIsShowPage={setIsShowPage}
              isShowPage={isShowPage}
              isShowUsersPage={isShowUsersPage}
              setIsShowUsersPage={setIsShowUsersPage}
            />
          </Inner>
          {isShowPage && <MowgliBookingHoteliers />}
          {isShowUsersPage     && <MowgliBookingUsers />}
        </MowgliBookingMainStatistics>
      </Main>
    );
};
