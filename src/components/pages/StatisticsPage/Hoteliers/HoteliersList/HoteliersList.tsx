import { Inner, TextContent, TextID, Wrapper, WrapperText } from "./HoteliersList.styled";

type Data = {
    id: string;
    hotels: string[];

}[]

const hoteliersData: Data = [
  {
    id: '7874567GHV',
    hotels: ['The Grand Hotel', 'Paradise Resort', 'Sunset Beach Hotel', 'The Charming Manor'],
  },
  {
    id: '1123467LON',
    hotels: ['Royal Palace Hotel', 'Mountain View Lodge', 'Ocean Breeze Inn', 'Riverfront Inn'],
  },
  {
    id: '9889T567KI',
    hotels: ['The Golden Sands Resort', 'Lakeside Retreat', 'The Plaza Hotel', 'Palm Grove Resort'],
  },
  {
    id: '1234567NYC',
    hotels: ['Palm Grove Resort', 'Skyline Heights Hotel', 'Seaside Oasis', 'Palm Grove Resort'],
  },
];

export const HoteliersList = () => (
  <Wrapper>
    {hoteliersData.map(({ id, hotels }) => (
      <Inner>
        <TextID>ID {id}</TextID>
        <WrapperText>
          {hotels.map(hotel => (
            <TextContent>{hotel}</TextContent>
          ))}
        </WrapperText>
      </Inner>
    ))}
  </Wrapper>
);
