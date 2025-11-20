import React, { useState } from 'react';

import { ListItem, TextItem, TextSpan, WrapperBody } from './MowgliBookingStatisticsBody.styled';

type Statistic = {
  title: string;
  value: number | null;
  isClicked: boolean;
};

type Prop = {
  isShowPage: boolean;
  setIsShowPage: React.Dispatch<React.SetStateAction<boolean>>;
  isShowUsersPage: boolean;
  setIsShowUsersPage: React.Dispatch<React.SetStateAction<boolean>>;
};

const statisticsData: Statistic[] = [
  { title: 'Hoteliers:', value: null, isClicked: false },
  { title: 'Objects:', value: null, isClicked: false },
  { title: 'Booking Options:', value: null, isClicked: false },
  { title: 'Users:', value: null, isClicked: false },
  { title: 'Completed bookings:', value: null, isClicked: false },
  { title: 'Agents:', value: null, isClicked: false },
];

export const MowgliBookingStatisticsBody: React.FC<Prop> = ({
  isShowPage,
  setIsShowPage,
  isShowUsersPage,
  setIsShowUsersPage,
}) => {
  const [statistics, setStatistics] = useState(statisticsData);
  const [activeIndex, setActiveIndex] = useState<number | null>(-1);

  const handleClick = (index: number) => {
    setActiveIndex(index !== activeIndex ? index : null);
    const updatedStatistics = statistics.map((stat, i) => ({
      ...stat,
      isClicked: i === index,
    }));
    setStatistics(updatedStatistics);
  };

  const togglePage = (title: string) => {
    if (title === 'Hoteliers:') {
      setIsShowPage(!isShowPage);
    } else setIsShowPage(false);
    if (title === 'Users:') {
      setIsShowUsersPage(!isShowUsersPage);
    } else setIsShowUsersPage(false);
  };

  return (
    <div>
      <WrapperBody>
        {statistics.map(({ title, value, isClicked }, index) => (
          <ListItem key={title} onClick={() => handleClick(index)} isClicked={isClicked}>
            <TextItem onClick={() => togglePage(title)}>{title} </TextItem>
            <TextSpan>{
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              value || 'None'
            }</TextSpan>
          </ListItem>
        ))}
      </WrapperBody>
    </div>
  );
};
