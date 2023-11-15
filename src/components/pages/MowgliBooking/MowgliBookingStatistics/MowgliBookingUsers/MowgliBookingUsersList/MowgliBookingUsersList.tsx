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
  users: string[] | undefined;
  status: 'active' | 'inactive' | 'deleted';
};

// type HandleClick = (event: React.MouseEvent<HTMLUListElement>) => void;
// ({ type, isShowUsers, setIsShowUsers, isClicked, setIsClicked });

export const MowgliBookingUsersList: React.FC<Prop> = memo(
  ({ type, isShowUsers}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [isSearching, setIsSearching] = useState(false); // Track search status

    const hardcodedUsers: Users[] = [
      {
        owner: '1',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        users: ['Hopin Viktoria '],
        status: 'active',
      },
      {
        owner: '2',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        users: ['Klinton Sofia'],
        status: 'inactive',
      },
      {
        owner: '3',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        users: ['Klinton Dasha'],
        status: 'inactive',
      },
      {
        owner: '4',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        users: ['Klinton Bill'],
        status: 'inactive',
      },
      {
        owner: '5',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        users: ['Buch Viktoria'],
        status: 'deleted',
      },
      {
        owner: '6',
        id: '1123467LON',
        email: 'henrinkwinta@gmail.com',
        users: ['Bus Viktor'],
        status: 'deleted',
      },
    ];


    const [filteredUsers, setFilteredUsers] = useState<Users[]>(hardcodedUsers);
    
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
    //         setIsShowUsers(index);
    //         setIsClicked(true);
    //       }
    //     }
    //   },
    //   [isClicked, setIsShowUsers, setIsClicked]
    // );

 const handleClear = () => {
   setSearchQuery('');
   setFilteredUsers(hardcodedUsers);
   setIsSearching(false);
 };

    

 const handleSearch = () => {
   const newFilteredUsers = searchQuery
     ? hardcodedUsers.filter(
         users =>
           users.owner.toString().includes(searchQuery) ||
           users.users?.some(user => user.toLowerCase().includes(searchQuery.toLowerCase()))
       )
     : hardcodedUsers;
   setIsSearching(true);
   setFilteredUsers(newFilteredUsers);
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
        {filteredUsers.length > 0 &&
          filteredUsers.map(({ id, users, email, status }, index) => (
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
                  {isShowUsers !== index &&
                    (users && users.length > 0 ? (
                      <>
                        {users[0].length > 30 ? `${users[0].slice(0, 30)}...` : users[0]}
                        {users.length > 1 && '...'}
                      </>
                    ) : null)}
                  {/* {isShowUsers === index && type && type === 'Finance' && (
                    // <>
                    //   {users?.join(' ')}
                    //   <AccountHotelier id={id} />
                    // </>
                  )} */}
                </TextContent>
              </WrapperText>
              <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                {status === 'deleted' ? <img src="/noactive.png" alt="active" /> : null}
              </div>
            </Inner>
          ))}
      </Wrapper>
    );
  }
);
