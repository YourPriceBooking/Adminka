import { StatisticsHeader } from "../StatisticsHeader/StatisticsHeader";
import { Wrapper } from "./Hoteliers.styled";
import { HoteliersList } from "./HoteliersList/HoteliersList";

type Prop = {
  page?: string;
};

export const Hoteliers: React.FC<Prop> = ({ page }) => (
  <Wrapper>
    <StatisticsHeader type="Hoteliers" />
    <HoteliersList type={page} />
  </Wrapper>
);