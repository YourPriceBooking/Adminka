import { memo, useCallback, useState } from 'react';

import { AccountHotelier } from 'components/pages/StatisticsPage/Hoteliers/AccountHotelier/AccountHotelier';
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
  LabelForm,
} from "./MowgliBookingHotelierList.styled"

type Prop = {
  type?: string;
  isShowHotelier: number | null;
  setIsShowHotelier: React.Dispatch<React.SetStateAction<number | null>>;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

type Hotelier = {
  owner: string;
  hotels: string[] | undefined;
  status: 'active' | 'inactive';
};

type HandleClick = (event: React.MouseEvent<HTMLUListElement>) => void;

export const MowgliBookingHotelierList: React.FC<Prop> = memo(
  ({ type, isShowHotelier, setIsShowHotelier, isClicked, setIsClicked }) => {
   
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredHoteliers, setFilteredHoteliers] = useState<Hotelier[]>([]);
    const [isSearching, setIsSearching] = useState(false); // Track search status

    const hardcodedHoteliers: Hotelier[] = [
      {
        owner: '1',
        hotels: ['Hotel A', 'Hotel B', 'Hotel C'],
        status: 'active',
      },
      {
        owner: '2',
        hotels: ['Hotel X', 'Hotel Y'],
        status: 'inactive',
      },
      // Add more hardcoded data as needed
    ];

    const handleClick: HandleClick = useCallback(
      event => {
        const { target } = event;
        if (
          target instanceof HTMLDivElement ||
          target instanceof HTMLParagraphElement ||
          target instanceof HTMLLIElement
        ) {
          const index = Number(target.dataset.id);
          if (!isClicked) {
            setIsShowHotelier(index);
            setIsClicked(true);
          }
        }
      },
      [isClicked, setIsShowHotelier, setIsClicked]
    );

    const handleClear = () => {
      setSearchQuery('');
      setFilteredHoteliers(hardcodedHoteliers);
      setIsSearching(false); 
    };
        
         const handleSearch = () => {
           const newFilteredHoteliers = searchQuery
             ? hardcodedHoteliers.filter(
                 hotelier =>
                   hotelier.owner.toString().includes(searchQuery) ||
                   hotelier.hotels?.some(hotel =>
                     hotel.toLowerCase().includes(searchQuery.toLowerCase())
                   )
               )
             : hardcodedHoteliers;
           setIsSearching(true);
           setFilteredHoteliers(newFilteredHoteliers);
         };
  

    return (
      <Wrapper onClick={handleClick}>
        <FunProf>
          <SearchInputContainer>
            <SearchInput
              className="input"
              type="text"
              placeholder="Search ID Hoteliers or/and Name object"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <LabelForm className="label" htmlFor="input-id">
              Search ID Hoteliers or/and Name object
            </LabelForm>
          </SearchInputContainer>

          {isSearching ? (
            <ClearButton onClick={handleClear} hasText={searchQuery.length > 0}>
              Close
            </ClearButton>
          ) : (
            <YellowButton onClick={handleSearch}>Search</YellowButton>
          )}
        </FunProf>
        {filteredHoteliers.length > 0 &&
          filteredHoteliers.map(({ owner, hotels }, index) => (
            <Inner
              border={isShowHotelier === index}
              hidden={isShowHotelier !== index && isShowHotelier !== null}
              position={isShowHotelier !== null}
              key={owner}
              tabIndex={index}
            >
              <TextID tabIndex={index}>ID {owner}</TextID>
              <WrapperText tabIndex={index} typePage={type}>
                <TextContent tabIndex={index}>
                  {isShowHotelier !== index &&
                    (hotels && hotels.length > 6
                      ? hotels.slice(0, 6).join(' ')
                      : hotels?.join(' '))}
                  {isShowHotelier !== index && hotels && hotels.length > 0 && '...'}
                  {isShowHotelier === index && type && type === 'Finance' && (
                    <>
                      {hotels?.join(' ')}
                      <AccountHotelier id={owner} />
                    </>
                  )}
                </TextContent>
              </WrapperText>
              {/* <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                {status === 'active' ? (
                  // Display your active icon
                ) : (
                  // Display your inactive icon
                )}
              </div> */}
            </Inner>
          ))}
      </Wrapper>
    );
  }
);
