import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { ListLoader } from 'components/shared/Loader';
import { getStatistic } from 'features/statistic/statisticSelectors';
import { ListItem, TextItem, TextSpan, WrapperBody } from './StatisticsBody.styled';

type Statistic = {
  title: string;
  value: number | undefined;
  isClicked: boolean;
};

type Prop = {
  isShowPage: boolean;
  setIsShowPage: React.Dispatch<React.SetStateAction<boolean>>;
  isShowUsersPage: boolean;
  setIsShowUsersPage: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StatisticsBody: React.FC<Prop> = ({
  isShowPage,
  setIsShowPage,
  isShowUsersPage,
  setIsShowUsersPage,
}) => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(-1);
  const { hoteliers, isLoadingHoteliers } = useSelector(selectorHoteliers);
  const statisticsObjects = useSelector(getStatistic);

  console.log(activeIndex);

  useEffect(() => {
    const initialStatisticsData: Statistic[] = [
      { title: 'Hoteliers:', value: hoteliers.length, isClicked: false },
      { title: 'Objects:', value: undefined, isClicked: false }, // Replace these values with actual data if available
      { title: 'Booking Options:', value: undefined, isClicked: false },
      { title: 'Users:', value: 103, isClicked: false },
      { title: 'Completed bookings:', value: undefined, isClicked: false },
      { title: 'Agents:', value: 89, isClicked: false },
    ];

    // Update the statistics with actual data from the store
    const updatedStatistics = initialStatisticsData.map(statistic => {
      const key = statistic.title.slice(0, -1).toLowerCase(); // removes colon and converts to lowercase
      const valueFromStore = statisticsObjects.result.amount[key] || statistic.value;
      return { ...statistic, value: valueFromStore };
    });

    setStatistics(updatedStatistics);
  }, [hoteliers, statisticsObjects]);


  const handleClick = (index: number) => {
    setActiveIndex(prevIndex => (index !== prevIndex ? index : null));
    const updatedStatistics = statistics.map((stat, i) => ({
      ...stat,
      isClicked: i === index,
    }));
    setStatistics(updatedStatistics);
  };

  const togglePage = (title: string) => {
    if (title === 'Hoteliers:') {
      setIsShowPage(!isShowPage);
    } else if (title === 'Users:') {
      setIsShowUsersPage(!isShowUsersPage);
    } else {
      setIsShowPage(false);
      setIsShowUsersPage(false);
    }
  };

  return (
    <WrapperBody>
      {isLoadingHoteliers ? (
        <ListLoader />
      ) : (
        statistics.map(({ title, value, isClicked }, index) => (
          <ListItem
            key={title}
            onClick={() => handleClick(index)}
            isClicked={isClicked}
            className={`${value === undefined ? 'disabled' : ''}`}
          >
            <TextItem onClick={() => togglePage(title)}>{title} </TextItem>
            <TextSpan>{value === undefined ? 'None' : value}</TextSpan>
          </ListItem>
        ))
      )}
    </WrapperBody>
  );
};
