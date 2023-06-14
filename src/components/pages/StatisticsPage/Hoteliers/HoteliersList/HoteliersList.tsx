import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { fetchHotelsById } from "features/hoteliers/hoteliersOperation";
import { useAppDispatch } from 'App';
import { selectorHoteliers } from "features/hoteliers/hoteliersSelectors";
import { Spinner } from "components/shared/Loader";
import { Inner, TextContent, TextID, Wrapper, WrapperText } from "./HoteliersList.styled";
import likeIcon from '../../../../../assets/icons/like.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';


export const HoteliersList = () => {
  const [borderIndex, setBorderIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { hoteliers, isLoading } = useSelector(selectorHoteliers);

     const changeBorder = (event: React.MouseEvent<HTMLUListElement>) => {
    const { target } = event;
    if (
      target instanceof HTMLDivElement ||
      target instanceof HTMLParagraphElement ||
      target instanceof HTMLLIElement
    ) {
      const index = Number(target.dataset.id);
      setBorderIndex(index);
    }
     };
  
  
  useEffect(() => {
    hoteliers.map(({ owner }) => owner && dispatch(fetchHotelsById(owner)));
    // eslint-disable-next-line
  }, [dispatch]);

      return (
        <Wrapper onClick={changeBorder}>
          {hoteliers.length > 0 &&
            hoteliers.map(({ owner, hotels, status }, index) => (
              <Inner border={borderIndex === index} key={owner} tabIndex={index}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <TextID tabIndex={index}>ID {owner}</TextID>
                    <WrapperText tabIndex={index}>
                      <TextContent tabIndex={index}>
                        {hotels && hotels.length > 6
                          ? hotels.slice(0, 6).join(' ')
                          : hotels?.join(' ')}
                        {hotels && hotels.length > 0 && '...'}
                      </TextContent>
                    </WrapperText>
                    <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                      {status === 'on verification' ? (
                        <img src={likeIcon} alt="like" width="20px" height="20px" />
                      ) : (
                        <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />
                      )}
                    </div>
                  </>
                )}
              </Inner>
            ))}
        </Wrapper>
      );
    };

