import { InputEmail } from '../Access/InputEmail';
import { Wrapper } from './Statistics.styled';
import { StatisticsBody } from './StatisticsBody/StatisticsBody';
import { StatisticsHeader } from './StatisticsHeader/StatisticsHeader';

export const StatisticsPage = () => (
  <Wrapper>
    <StatisticsHeader />
    <StatisticsBody />
  </Wrapper>
);

export const Statistics = () => (
  <div>
    <InputEmail component={StatisticsPage} />
  </div>
);
