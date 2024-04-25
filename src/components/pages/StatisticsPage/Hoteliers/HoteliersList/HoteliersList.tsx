import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchHotelsById } from 'features/hoteliers/hoteliersOperation';
import { useAppDispatch } from 'App';
import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { Spinner } from 'components/shared/Loader';
import {
  Inner,
  TextContent,
  TextID,
  Wrapper,
  WrapperText,
  YellowButton,
  SearchInput,
  FunProf,
  ClearButton,
  SearchInputContainer,
  SearchIcon,
  LabelForm,
} from './HoteliersList.styled';
import likeIcon from '../../../../../assets/icons/like.svg';
import pic from '../../../../../assets/icons/pict.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';
import deletedIcon from '../../../../../assets/icons/deletedIcon.svg';
import { AccountHotelier } from '../AccountHotelier/AccountHotelier';

type Prop = {
  type?: string;
  isShowHotelier: number | null;
  setIsShowHotelier: React.Dispatch<React.SetStateAction<number | null>>;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HoteliersList: React.FC<Prop> = memo(
  ({ type, isShowHotelier, setIsShowHotelier, setIsClicked }) => {
    const dispatch = useAppDispatch();
    const { hoteliers, isLoadingHotels } = useSelector(selectorHoteliers);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredHoteliers, setFilteredHoteliers] = useState(hoteliers);
    const [isSearching, setIsSearching] = useState(false);

    const [isClearClicked, setIsClearClicked] = useState(false);

    // const handleClick: HandleClick = useCallback(
    //   event => {
    //     const { target } = event;
    //     if (
    //       target instanceof HTMLDivElement ||
    //       target instanceof HTMLParagraphElement ||
    //       target instanceof HTMLLIElement
    //     ) {
    //       const index = Number(target.dataset.id);
    //       if (!isClicked) {
    //         console.log('HoteliersList', index);
    //         setIsShowHotelier(index);
    //         setIsClicked(true);
    //       }
    //     }
    //   },
    //   [isClicked, setIsShowHotelier, setIsClicked]
    // );

    const handleClick = (owner: string) => {
      // const index = e.currentTarget.tabIndex;
      const index = filteredHoteliers.findIndex(hotelier => hotelier.owner === owner);
      setIsShowHotelier(index);
      setIsClicked(true);
    };

    const handleClear = () => {
      setSearchQuery('');
      setFilteredHoteliers(hoteliers);
      setIsClearClicked(false);
    };
    useEffect(() => {
      if (hoteliers.length > 0) hoteliers.map(({ owner }) => dispatch(fetchHotelsById(owner)));
      // eslint-disable-next-line
    }, [dispatch]);

    // const handleSearch = () => {
    //   const newFilteredHoteliers = searchQuery
    //     ? hoteliers.filter(
    //         hotelier =>
    //           hotelier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //           hotelier.owner.toString().includes(searchQuery) ||
    //           hotelier.hotels?.some(hotel =>
    //             hotel.toLowerCase().includes(searchQuery.toLowerCase())
    //           )
    //       )
    //     : hoteliers;
    //   setIsClearClicked(true);
    //   setFilteredHoteliers(newFilteredHoteliers);
    // };

    const handleSearchClick = () => {
      setIsSearching(true);
      setIsClearClicked(true);
    };

    const filteredData = searchQuery
      ? hoteliers.filter(hotelier => {
          const normalizedQuery = searchQuery.toLowerCase();
          return (
            hotelier.email.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
            hotelier.owner.toString().includes(normalizedQuery) ||
            hotelier.hotels?.some(hotel =>
              hotel.toLowerCase().includes(normalizedQuery.toLowerCase())
            )
          );
        })
      : hoteliers;

    const displayData = isSearching ? filteredData : hoteliers;

    return (
      <Wrapper>
        <FunProf>
          <SearchInputContainer>
            <SearchInput
              id="searchInput"
              className="input"
              type="text"
              placeholder="Search ID Hoteliers or/and Name object, E-mail"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyUp={e => {
                if (e.key === 'Enter') {
                  handleSearchClick();
                }
              }}
            />
            <LabelForm className="label" htmlFor="input-id">
              Search ID Hoteliers or/and Name object, E-mail
            </LabelForm>
            <SearchIcon src={pic} alt="Search" />
          </SearchInputContainer>

          {isClearClicked ? (
            <ClearButton onClick={handleClear} hasText={searchQuery.length > 0}>
              Close
            </ClearButton>
          ) : (
            <YellowButton onClick={handleSearchClick}>Search</YellowButton>
          )}
        </FunProf>
        {displayData.length > 0 &&
          displayData.map(({ owner, hotels, status, email }, index) => (
            <Inner
              border={isShowHotelier === index}
              hidden={isShowHotelier !== index && isShowHotelier !== null}
              position={isShowHotelier !== null}
              key={owner}
              tabIndex={index}
              onClick={() => handleClick(owner)}
            >
              <TextID tabIndex={index}>
                <b>{email.toLowerCase()}</b>
              </TextID>
              <TextID tabIndex={index}>ID {owner.toUpperCase()}</TextID>
              <WrapperText tabIndex={index} typePage={type}>
                <TextContent tabIndex={index}>
                  {isLoadingHotels && <Spinner />}
                  {!isLoadingHotels &&
                    isShowHotelier !== index &&
                    (hotels && hotels.length > 6
                      ? hotels.slice(0, 6).join(' ')
                      : hotels?.join(' '))}
                  {!isLoadingHotels &&
                    isShowHotelier !== index &&
                    hotels &&
                    hotels.length > 0 &&
                    '...'}
                  {isShowHotelier === index && type && type === 'Finance' && (
                    <>
                      {hotels?.join(' ')}
                      <AccountHotelier id={owner} />
                    </>
                  )}
                </TextContent>
              </WrapperText>
              <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                {status === 'active' && (
                  <img src={likeIcon} alt="like" width="20px" height="20px" />
                )}
                {status === 'not active' && (
                  <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />
                )}
                {status === 'deleted' && (
                  <img src={deletedIcon} alt="dislike" width="20px" height="20px" />
                )}
              </div>
            </Inner>
          ))}
      </Wrapper>
    );
  }
);
