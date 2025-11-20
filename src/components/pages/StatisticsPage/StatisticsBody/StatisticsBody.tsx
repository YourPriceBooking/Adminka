import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { ListLoader } from 'components/shared/Loader';
import { getStatistic } from 'features/statistic/statisticSelectors';
import { getVerifyObjects } from 'features/verifyObjects/verifyObjectsSelectors';
import type { VerifyObjectsData } from 'types/apis/verifyObjects';
import type { BookingOptionsData } from 'types/apis/bookingOptions';
import { getBookingOptions } from 'features/bookingOptions/bookingOptionsSelectors';
import { ListItem, TextItem, TextSpan, WrapperBody } from './StatisticsBody.styled';

type Statistic = {
  title: string;
  value: number | undefined;
  isClicked: boolean;
};

type Prop = {
  isShowHotelierPage: boolean;
  setIsShowHotelierPage: React.Dispatch<React.SetStateAction<boolean>>;
  isShowUsersPage: boolean;
  setIsShowUsersPage: React.Dispatch<React.SetStateAction<boolean>>;
  isShowObjectsPage: boolean;
  setIsShowObjectsPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const createStatistic = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  statisticsObjects: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hoteliers: any,
  verifyObjects: VerifyObjectsData,
  bookingOptions: BookingOptionsData
) => {
  const initialStatisticsData: Statistic[] = [
    { title: 'Hoteliers:', value: hoteliers.length, isClicked: false },
    { title: 'Objects:', value: verifyObjects.amountObject || 0, isClicked: false },
    { title: 'Booking Options:', value: bookingOptions.result, isClicked: false },
    { title: 'Users:', value: 103, isClicked: false },
    { title: 'Completed bookings:', value: undefined, isClicked: false },
    { title: 'Agents:', value: 89, isClicked: false },
  ];

  const updatedStatistics = initialStatisticsData.map(statistic => {
    const key = statistic.title.slice(0, -1).toLowerCase(); // removes colon and converts to lowercase
    const valueFromStore = statisticsObjects.result.amount[key] || statistic.value;
    return { ...statistic, value: valueFromStore };
  });

  return updatedStatistics;
};

export const StatisticsBody: React.FC<Prop> = ({
  isShowHotelierPage,
  setIsShowHotelierPage,
  isShowUsersPage,
  setIsShowUsersPage,
  isShowObjectsPage,
  setIsShowObjectsPage,
}) => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const { hoteliers, isLoadingHoteliers } = useSelector(selectorHoteliers);
  const statisticsObjects = useSelector(getStatistic);
  const verifyObjects = useSelector(getVerifyObjects);
  const bookingOptions = useSelector(getBookingOptions);

  useEffect(() => {
    setStatistics(createStatistic(statisticsObjects, hoteliers, verifyObjects, bookingOptions));
  }, [statisticsObjects, hoteliers, verifyObjects, bookingOptions]);

  const handleClick = (index: number) => {
    const oldStatistic = createStatistic(
      statisticsObjects,
      hoteliers,
      verifyObjects,
      bookingOptions
    );

    const updatedStatistics = oldStatistic.map((stat, i) => ({
      ...stat,
      isClicked: i === index,
    }));

    setStatistics(updatedStatistics);
  };

  const togglePage = (title: string) => {
    switch (title) {
      case 'Hoteliers:':
        setIsShowHotelierPage(!isShowHotelierPage);
        setIsShowUsersPage(false);
        setIsShowObjectsPage(false);
        break;
      case 'Users:':
        setIsShowUsersPage(!isShowUsersPage);
        setIsShowHotelierPage(false);
        setIsShowObjectsPage(false);
        break;
      case 'Objects:':
        setIsShowObjectsPage(!isShowObjectsPage);
        setIsShowUsersPage(false);
        setIsShowHotelierPage(false);
        break;

      default:
        setIsShowHotelierPage(false);
        setIsShowUsersPage(false);
        break;
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
