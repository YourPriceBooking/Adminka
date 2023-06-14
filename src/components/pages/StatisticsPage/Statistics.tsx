import { fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputEmail } from '../Access/InputEmail';
import { Inner, Wrapper } from './Statistics.styled';
import { StatisticsBody } from './StatisticsBody/StatisticsBody';
import { StatisticsHeader } from './StatisticsHeader/StatisticsHeader';
import { Hoteliers } from './Hoteliers/Hoteliers';

export const StatisticsPage = () => {
  const [isShowPage, setIsShowPage] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHoteliers() as any);
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
