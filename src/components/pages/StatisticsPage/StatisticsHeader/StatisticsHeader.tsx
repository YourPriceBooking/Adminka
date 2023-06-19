import { WrapperHeader } from "./StatisticsHeader.styled";

type Prop = {
  type: string;
  isShowHotelier?: number | null;
};


export const StatisticsHeader: React.FC<Prop> = ({ type, isShowHotelier }) => (
  <WrapperHeader type={type}>
    {type === 'Statistic' && 'All statistic'}
    {typeof isShowHotelier !== 'number' && type !== 'Statistic' && 'Hoteliers:'}
    {typeof isShowHotelier === 'number' && 'Facility finances:'}
  </WrapperHeader>
);
