import React, { useState } from 'react';
import { ListItem, TextItem, TextSpan, WrapperBody } from './StatisticsBody.styled';

type Statistic = {
  title: string;
  value: string;
  isClicked: boolean;
};

const statisticsData: Statistic[] = [
  { title: 'Hoteliers:', value: '75', isClicked: false },
  { title: 'Objects:', value: '30', isClicked: false },
  { title: 'Booking Options:', value: '1555', isClicked: false },
  { title: 'Users:', value: '103', isClicked: false },
  { title: 'Completed bookings:', value: '1555', isClicked: false },
  { title: 'Agents:', value: '89', isClicked: false },
];

export const StatisticsBody: React.FC = () => {
 const [statistics, setStatistics] = useState(statisticsData);

  const handleClick = (index: number) => {
    const updatedStatistics = [...statistics];
    updatedStatistics[index].isClicked = true;
    setStatistics(updatedStatistics);
  };

  return (
    <WrapperBody>
      {statistics.map(({ title, value, isClicked }, index) => (
        <ListItem key={title} onClick={() => handleClick(index)} isClicked={isClicked}>
          <TextItem>{title} </TextItem>{' '}
          <TextSpan>{value}</TextSpan>
        </ListItem>
      ))}
    </WrapperBody>
  );
};
