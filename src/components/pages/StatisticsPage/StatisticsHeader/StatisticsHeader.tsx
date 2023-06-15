import { WrapperHeader } from "./StatisticsHeader.styled";


export const StatisticsHeader: React.FC<{ type: string }> = ({ type }) => (
  <WrapperHeader type={type}>{type === 'Statistic' ? 'All statistic' : 'Hoteliers:'}</WrapperHeader>
);
