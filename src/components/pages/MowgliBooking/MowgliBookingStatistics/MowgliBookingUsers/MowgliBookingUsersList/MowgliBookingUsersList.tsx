import {memo, useState } from 'react';

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
} from './MowgliBookingUsersList.styled';

type Prop = {
  type?: string;
  isShowUsers: number | null;
  setIsShowUsers: React.Dispatch<React.SetStateAction<number | null>>;
  isClicked: boolean;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

type Users = {
  owner: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive' | 'deleted';
};

// type HandleClick = (event: React.MouseEvent<HTMLUListElement>) => void;
// ({ type, isShowUsers, setIsShowUsers, isClicked, setIsClicked });



// export const MowgliBookingUsersList: React.FC<
//   Prop & { searchQuery?: string; onSearch: (query: string) => void }
// > = ({ type, isShowUsers, searchQuery, onSearch }) => {

export const MowgliBookingUsersList: React.FC<
  Prop 
> = memo(({ type, isShowUsers}) => {
   const [isSearching, setIsSearching] = useState(false);
   const [isClearClicked, setIsClearClicked] = useState(false);
   const [searchQuery, setSearchQuery] = useState<string>('');

  const hardcodedUsers: Users[] = [
    {
      owner: '2',
      id: '22227LON',
      email: 'henrinkwinta@gmail.com',
      firstName: 'Sofia',
      lastName: 'Klinton',
      status: 'inactive',
    },
    {
      owner: '3',
      id: '333367LON',
      email: 'dasharinkwinta@gmail.com',
      firstName: 'Dasha',
      lastName: 'Klinton',
      status: 'inactive',
    },
    {
      owner: '5',
      id: '44423467LON',
      email: 'henrinkwinta@gmail.com',
      firstName: 'Viktoria',
      lastName: 'Buch',
      status: 'deleted',
    },
    {
      owner: '6',
      id: '1123467LON',
      email: 'henrinkwinta@gmail.com',
      firstName: 'Viktor',
      lastName: 'Hopin',
      status: 'deleted',
    },
    {
      owner: '8',
      id: '9983467KK',
      email: 'kitkkit@gmail.com',
      firstName: 'Olha',
      lastName: 'Klymentov',
      status: 'deleted',
    },
  ];

 

  const handleSearchClick = () => {
    setIsSearching(true);
    setIsClearClicked(true);
  };

  const filteredData = searchQuery
    ? hardcodedUsers.filter(user => {
        const normalizedQuery = searchQuery.toLowerCase();
        return (
          user.email.toLowerCase().includes(normalizedQuery) ||
          user.id.toLowerCase().includes(normalizedQuery) ||
          user.firstName.toLowerCase().includes(normalizedQuery) ||
          user.lastName.toLowerCase().includes(normalizedQuery)
        );
      })
    : hardcodedUsers;

  const displayData = isSearching ? filteredData : hardcodedUsers;
  // eslint-disable-next-line no-console
  console.log(displayData)


   const handleClear = () => {
     setSearchQuery('');

     setIsSearching(false);
     setIsClearClicked(false);
   };

  return (
    <Wrapper>
      <FunProf>
        <SearchInputContainer>
          <SearchInput
            className="input"
            type="text"
            placeholder="Search ID, Name, Surname/E mail"
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
          <ClearButton onClick={handleClear}>Close</ClearButton>
        ) : (
          <YellowButton onClick={handleSearchClick}>Search</YellowButton>
        )}
      </FunProf>
      {displayData.length > 0 &&
        displayData.map(({ id, lastName, firstName, email, status }, index) => (
          <Inner
            border={isShowUsers === index}
            hidden={isShowUsers !== index && isShowUsers !== null}
            position={isShowUsers !== null}
            key={id}
            tabIndex={index}
          >
            <TextEmail tabIndex={index}>{email}</TextEmail>
            <TextID tabIndex={index}>ID {id}</TextID>
            <WrapperText tabIndex={index} typePage={type}>
              <TextContent tabIndex={index}>
                <>
                  {lastName}
                  &nbsp;
                  {firstName}
                </>
              </TextContent>
            </WrapperText>
            <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
              {status === 'deleted' ? <img src="/noactive.png" alt="active" /> : null}
            </div>
          </Inner>
        ))}
    </Wrapper>
  );
});
