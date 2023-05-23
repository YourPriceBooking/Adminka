import { ListItem, TextItem, TextSpan, WrapperBody } from './StatisticsBody.styled';

const statisticsData = [
  { title: 'Hoteliers:', value: '75' },
  { title: 'Objects:', value: '30' },
  { title: 'Booking Options:', value: '1555' },
  { title: 'Users:', value: '103' },
  { title: 'Completed bookings:', value: '1555' },
  { title: 'Agents:', value: '89' },
];

export const StatisticsBody = () => (
  <WrapperBody>
    {statisticsData.map(({ title, value }) => (
      <ListItem key={title}>
        <TextItem>{title}</TextItem>
        <TextSpan>{value}</TextSpan>
      </ListItem>
    ))}
  </WrapperBody>
);

