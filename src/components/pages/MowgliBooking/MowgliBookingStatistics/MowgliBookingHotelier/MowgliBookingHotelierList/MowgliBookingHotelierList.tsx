import { memo, useState } from 'react';

// import { AccountHotelier } from 'components/pages/StatisticsPage/Hoteliers/AccountHotelier/AccountHotelier';
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
  TextEmail,
} from './MowgliBookingHotelierList.styled';

import { MowgliAccountHotelier } from '../MowgliBookingHotelierAccount/MowgliBookingHotelierAccount';

type Prop = {
  type?: string;
  isShowHotelier: number | null;
  setIsShowHotelier: React.Dispatch<React.SetStateAction<number | null>>;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

type Hotelier = {
  owner: string;
  id: string;
  email: string;
  hotel: string[] | undefined;
  status: 'active' | 'inactive' | "deleted";
};

// type HandleClick = (event: React.MouseEvent<HTMLUListElement>) => void;

export const MowgliBookingHotelierList: React.FC<Prop> = memo(
  ({ type, isShowHotelier }) => {
   
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false); 

    const hardcodedHoteliers: Hotelier[] = [
      {
        owner: '1',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Hilton Hotel Viktoria'],
        status: 'deleted',
      },
      {
        owner: '2',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Polo Tron Мотел на західній вулиці'],
        status: 'inactive',
      },
      {
        owner: '3',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Kapo de jecob Хостел у Івана'],
        status: 'inactive',
      },
      {
        owner: '4',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Polo Tron Мотел на західній вулиці'],
        status: 'inactive',
      },
      {
        owner: '5',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Hilton Hotel Viktoria'],
        status: 'active',
      },
      {
        owner: '6',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Hilton Hotel Viktoria'],
        status: 'inactive',
      },
    ];

      const [filteredHoteliers, setFilteredHoteliers] = useState<Hotelier[]>(hardcodedHoteliers);

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
    //         setIsShowHotelier(index);
    //         setIsClicked(true);
    //       }
    //     }
    //   },
    //   [isClicked, setIsShowHotelier, setIsClicked]
    // );

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
                   hotelier.hotel?.some(hotel =>
                     hotel.toLowerCase().includes(searchQuery.toLowerCase())
                   )
               )
             : hardcodedHoteliers;
           setIsSearching(true);
           setFilteredHoteliers(newFilteredHoteliers);
         };
  

    return (
      <Wrapper>
        <FunProf>
          <SearchInputContainer>
            <SearchInput
              className="input"
              type="text"
              placeholder="Search ID Hoteliers or/and Name object/E mail"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <img src="lupaIcon.png" alt="lupa" className="search-icon" />
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
          filteredHoteliers.map(({ owner, hotel, email, id, status }, index) => (
            <Inner
              border={isShowHotelier === index}
              hidden={isShowHotelier !== index && isShowHotelier !== null}
              position={isShowHotelier !== null}
              key={owner}
              tabIndex={index}
            >
              <TextEmail tabIndex={index}>{email}</TextEmail>
              <TextID tabIndex={index}>ID {id}</TextID>
              <WrapperText tabIndex={index} typePage={type}>
                <TextContent tabIndex={index}>
                  {isShowHotelier !== index &&
                    (hotel && hotel.length > 0 ? (
                      <>
                        {hotel[0].length > 30 ? `${hotel[0].slice(0, 30)}...` : hotel[0]}
                        {hotel.length > 1 && '...'}
                      </>
                    ) : null)}

                  {isShowHotelier === index && type && type === 'Finance' && (
                    console.log("Here!"),
                    <MowgliAccountHotelier id={owner} />
                  )}
                </TextContent>
              </WrapperText>
              <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                {status === 'deleted' ? <img src="/noactive.png" alt="deleted" /> : null}
                {status === 'active' ? <img src="/activeGreen.png" alt="active" /> : null}
                {status === 'inactive' ? <img src="/inactiveRed.png" alt="inactive" /> : null}
              </div>
            </Inner>
          ))}
      </Wrapper>
    );
  }
);
