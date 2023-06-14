import type { Dispatch } from 'redux';
import { useEffect, useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { fetchHotelsById } from "features/hoteliers/hoteliersOperation";
import { selectorHoteliers } from "features/hoteliers/hoteliersSelectors";
import { Spinner } from "components/shared/Loader";
import type { Data } from 'types/apis';
import { Inner, TextContent, TextID, Wrapper, WrapperText } from "./HoteliersList.styled";
import likeIcon from '../../../../../assets/icons/like.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';


export const HoteliersList = () => {
  const [borderIndex, setBorderIndex] = useState<number | null>(null);
type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();
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
    }, [dispatch]);

      return (
        <Wrapper onClick={changeBorder}>
          {hoteliers.length > 0 &&
            hoteliers.map((hotelier: Data, index) =>
              isLoading ? (
                <Spinner />
              ) : (
                <Inner border={borderIndex === index} key={hotelier.owner} tabIndex={index}>
                  <TextID tabIndex={index}>ID {hotelier.owner}</TextID>
                  <WrapperText tabIndex={index}>
                    <TextContent tabIndex={index}>
                      {hotelier.hotels && hotelier.hotels.length > 6
                        ? hotelier.hotels.slice(0, 6).join(' ')
                        : hotelier.hotels && hotelier.hotels.join(' ')}
                      {hotelier.hotels && hotelier.hotels.length > 0 && '...'}
                    </TextContent>
                  </WrapperText>
                  <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                    {hotelier.status === 'on verification' ? (
                      <img src={likeIcon} alt="like" width="20px" height="20px" />
                    ) : (
                      <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />
                    )}
                  </div>
                </Inner>
              )
            )}
        </Wrapper>
      );
    };

