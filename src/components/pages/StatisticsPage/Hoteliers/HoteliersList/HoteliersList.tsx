import { useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { fetchHotelsById } from "features/hoteliers/hoteliersOperation";
import { useAppDispatch } from 'App';
import { selectorHoteliers } from "features/hoteliers/hoteliersSelectors";
import { Spinner } from "components/shared/Loader";
import { Inner, TextContent, TextID, Wrapper, WrapperText } from "./HoteliersList.styled";
import likeIcon from '../../../../../assets/icons/like.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';
import { AccountHotelier } from "../AccountHotelier/AccountHotelier";

type Prop = {
  type?: string;
  isShowHotelier: number | null;
  setIsShowHotelier: React.Dispatch<React.SetStateAction<number | null>>;
};

export const HoteliersList: React.FC<Prop> = ({type, isShowHotelier, setIsShowHotelier}) => {
  const [borderIndex, setBorderIndex] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { hoteliers, isLoadingHotels } = useSelector(selectorHoteliers);

  const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
    const { target } = event;
    if (
      target instanceof HTMLDivElement ||
      target instanceof HTMLParagraphElement ||
      target instanceof HTMLLIElement
    ) {
      const index = Number(target.dataset.id);
      setBorderIndex(index);
      setIsShowHotelier(index);
    }
  };



  useEffect(() => {
    if (hoteliers.length > 0) hoteliers.map(({ owner }) => dispatch(fetchHotelsById(owner)));
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <Wrapper onClick={handleClick} >
      {hoteliers.length > 0 &&
        hoteliers.map(({ owner, hotels, status }, index) => (
          <Inner
            border={borderIndex === index}
            hidden={isShowHotelier !== index && isShowHotelier !== null}
            key={owner}
            tabIndex={index}
          >
            <TextID tabIndex={index}>ID {owner}</TextID>
            <WrapperText tabIndex={index} typePage={type}>
              <TextContent tabIndex={index}>
                {isLoadingHotels && <Spinner />}
                {!isLoadingHotels &&
                  (hotels && hotels.length > 6 ? hotels.slice(0, 6).join(' ') : hotels?.join(' '))}
                {!isLoadingHotels && hotels && hotels.length > 0 && '...'}
                {isShowHotelier === index && type && type === 'Finance' && (
                  <>
                    {hotels?.join(' ')}
                    <AccountHotelier />
                  </>
                )}
              </TextContent>
            </WrapperText>
            <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
              {status === 'on verification' ? (
                <img src={likeIcon} alt="like" width="20px" height="20px" />
              ) : (
                <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />
              )}
            </div>
          </Inner>
        ))}
    </Wrapper>
  );
};

