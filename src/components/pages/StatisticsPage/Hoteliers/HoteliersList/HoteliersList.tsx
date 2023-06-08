import { useState } from "react";
import { Inner, TextContent, TextID, Wrapper, WrapperText } from "./HoteliersList.styled";
import likeIcon from '../../../../../assets/icons/like.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';

type Data = {
  id: string;
  hotels: string[];
    like: boolean;
}[];

const hoteliersData: Data = [
  {
    id: '7874567GHV',
    hotels: [
      'The Grand Hotel',
      'Paradise Resort',
      'Sunset Beach Hotel',
      'The Charming Manor',
      'The Grand Hotel',
      'Paradise Resort',
      'Sunset Beach Hotel',
    ],
    like: true,
  },
  {
    id: '1123467LON',
    hotels: [
      'Royal Palace Hotel',
      'Mountain View Lodge',
      'Ocean Breeze Inn',
      'Riverfront Inn',
      'Royal Palace Hotel',
      'Mountain View Lodge',
      'Ocean Breeze Inn',
    ],
    like: false,
  },
  {
    id: '9889T567KI',
    hotels: [
      'The Golden Sands Resort',
      'Lakeside Retreat',
      'The Plaza Hotel',
      'Palm Grove Resort',
      'The Golden Sands Resort',
      'Lakeside Retreat',
      'The Plaza Hotel',
    ],
    like: true,
  },
  {
    id: '1234567NYC',
    hotels: [
      'Palm Grove Resort',
      'Skyline Heights Hotel',
      'Seaside Oasis',
      'Palm Grove Resort',
      'Palm Grove Resort',
      'Skyline Heights Hotel',
      'Seaside Oasis',
    ],
    like: true,
  },
];

export const HoteliersList = () => {
    const [border] = useState<boolean>(false)


    const changeBorder = (event: React.MouseEvent<HTMLUListElement>): void => {
        const targetElement = event.target;
        const currentTargetElement = event.currentTarget;
    //   const index = Array.from(targetElement.parentNode!.children).indexOf(targetElement);
      console.dir(targetElement);
      console.log(currentTargetElement.children);
  };
    
    return (
      <Wrapper onClick={changeBorder}>
        {hoteliersData.map(({ id, hotels, like }) => (
          <Inner border={border} key={id}>
            <TextID>ID {id}</TextID>
            <WrapperText>
              <TextContent>
                {hotels.slice(0, 4).join(' ')}
                {hotels.length > 0 && '...'}
              </TextContent>
            </WrapperText>
            <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
              {like && <img src={likeIcon} alt="like" width="20px" height="20px" />}
              {!like && <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />}
            </div>
          </Inner>
        ))}
      </Wrapper>
    );
};
