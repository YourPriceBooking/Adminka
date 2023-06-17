import { fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
import type { Dispatch } from 'redux';
import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputEmail } from '../Access/InputEmail';
import { Inner, Wrapper } from './Statistics.styled';
import { StatisticsBody } from './StatisticsBody/StatisticsBody';
import { StatisticsHeader } from './StatisticsHeader/StatisticsHeader';
import { Hoteliers } from './Hoteliers/Hoteliers';

export const StatisticsPage = () => {
  const [isShowPage, setIsShowPage] = useState<boolean>(false);
  const { hoteliers } = useSelector(selectorHoteliers);
  // eslint-disable-next-line
  type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();

  useEffect(() => {
    if (hoteliers.length > 0) return;
    dispatch(fetchHoteliers());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Wrapper>
      <Inner>
        <StatisticsHeader type="Statistic" />
        <StatisticsBody setIsShowPage={setIsShowPage} isShowPage={isShowPage} />
      </Inner>
      {isShowPage && <Hoteliers />}
    </Wrapper>
  );
};

export const Statistics = () => (
  <div>
    <InputEmail component={StatisticsPage} />
  </div>
);
