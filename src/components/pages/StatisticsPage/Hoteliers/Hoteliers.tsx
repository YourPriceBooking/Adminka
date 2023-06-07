import { StatisticsHeader } from "../StatisticsHeader/StatisticsHeader";
import { Wrapper } from "./Hoteliers.styled";
import { HoteliersList } from "./HoteliersList/HoteliersList";

export const Hoteliers = () => (
  <Wrapper>
        <StatisticsHeader type="Hoteliers" />
        <HoteliersList/>
  </Wrapper>
);