/* eslint-disable @typescript-eslint/no-unused-vars */
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
  status: 'active' | 'inactive' | 'deleted';
};

// type HandleClick = (event: React.MouseEvent<HTMLUListElement>) => void;

export const MowgliBookingHotelierList: React.FC<Prop> = memo(
  ({ type, isShowHotelier, setIsShowHotelier, setIsClicked }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [isClearClicked, setIsClearClicked] = useState(false);

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
        id: '44446666LON',
        email: 'henrinkwinta@gmail.com',
        hotel: ['Polo Tron Мотел на західній вулиці'],
        status: 'inactive',
      },
      {
        owner: '5',
        id: '165555557LON',
        email: 'mashakwinta@gmail.com',
        hotel: ['Hilton Hotel Viktoria'],
        status: 'active',
      },
      {
        owner: '6',
        id: '16666678967LON',
        email: 'davidkwinta@gmail.com',
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

    const handleSearchClick = () => {
      setIsSearching(true);
      setIsClearClicked(true);
    };

    const filteredData = searchQuery
      ? hardcodedHoteliers.filter(hotelier => {
          const normalizedQuery = searchQuery.toLowerCase();
          return (
            hotelier.email.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
            hotelier.id.toLowerCase().includes(normalizedQuery) ||
            hotelier.owner.toString().includes(normalizedQuery) ||
            hotelier.hotel?.some(hotel =>
              hotel.toLowerCase().includes(normalizedQuery.toLowerCase())
            )
          );
        })
      : hardcodedHoteliers;

    const displayData = isSearching ? filteredData : hardcodedHoteliers;

    const handleClickTextContent = (owner: string) => {
      const index = filteredHoteliers.findIndex(hotelier => hotelier.owner === owner);
      // setIsShowHotelier(index);
      setIsClicked(true);
      // setShowAccount(true); // Uncomment when "Some account info" will be created
    };

    const handleReturnToList = () => {
      setShowAccount(false);
      setIsShowHotelier(null);
      setIsClicked(false);
    };

    const handleClear = () => {
      setSearchQuery('');
      setFilteredHoteliers(hardcodedHoteliers);
      setIsSearching(false);
      setIsClearClicked(false);
    };

    return (
      <Wrapper>
        {showAccount ? (
          <p>Here must be some account info component</p>
        ) : (
          <>
            <FunProf>
              <SearchInputContainer>
                <SearchInput
                  className="input"
                  type="text"
                  placeholder="Search ID Hoteliers or/and Name object/E mail"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyUp={e => {
                    if (e.key === 'Enter') {
                      handleSearchClick();
                    }
                  }}
                />
                <img src="lupaIcon.png" alt="lupa" className="search-icon" />
                <LabelForm className="label" htmlFor="input-id">
                  Search ID Hoteliers or/and Name object
                </LabelForm>
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
              displayData.map(({ owner, hotel, email, id, status }, index) => (
                <Inner
                  border={isShowHotelier === index}
                  hidden={isShowHotelier !== index && isShowHotelier !== null}
                  position={isShowHotelier !== null}
                  key={owner}
                  tabIndex={index}
                  onClick={() => handleClickTextContent(owner)} // Updated this line
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
                    </TextContent>
                  </WrapperText>
                  <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                    {status === 'deleted' ? <img src="/noactive.png" alt="deleted" /> : null}
                    {status === 'active' ? <img src="/activeGreen.png" alt="active" /> : null}
                    {status === 'inactive' ? <img src="/inactiveRed.png" alt="inactive" /> : null}
                  </div>
                </Inner>
              ))}
          </>
        )}
      </Wrapper>
    );
  }
);
