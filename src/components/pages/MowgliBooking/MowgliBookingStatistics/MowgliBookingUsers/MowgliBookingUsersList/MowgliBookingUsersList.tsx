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
  users: string[] | undefined;
  status: 'active' | 'inactive';
};

type HandleClick = (event: React.MouseEvent<HTMLUListElement>) => void;

export const MowgliBookingUsersList: React.FC<Prop> = memo(
  ({ type, isShowUsers, setIsShowUsers, isClicked, setIsClicked }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
    const [isSearching, setIsSearching] = useState(false); // Track search status

    const hardcodedUsers: Users[] = [
      {
        owner: '1',
        users: ['Hopin Viktoria '],
        status: 'active',
      },
      {
        owner: '2',
        users: ['Klinton Sofia'],
        status: 'inactive',
      },
      {
        owner: '3',
        users: ['Klinton Dasha'],
        status: 'inactive',
      },
      {
        owner: '4',
        users: ['Klinton Bill'],
        status: 'inactive',
      },
      {
        owner: '5',
        users: ['Buch Viktoria'],
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
            setIsShowUsers(index);
            setIsClicked(true);
          }
        }
      },
      [isClicked, setIsShowUsers, setIsClicked]
    );

    const handleClear = () => {
      setSearchQuery('');
      setFilteredUsers(hardcodedUsers);
      setIsSearching(false);
    };

    const handleSearch = () => {
      const newFilteredUsers = searchQuery
        ? hardcodedUsers.filter(
            hotelier =>
              hotelier.owner.toString().includes(searchQuery) ||
              hotelier.users?.some(user => user.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        : hardcodedUsers;
      setIsSearching(true);
      setFilteredUsers(newFilteredUsers);
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
        {filteredUsers.length > 0 &&
          filteredUsers.map(({ owner, users }, index) => (
            <Inner
              border={isShowUsers === index}
              hidden={isShowUsers !== index && isShowUsers !== null}
              position={isShowUsers !== null}
              key={owner}
              tabIndex={index}
            >
              <TextID tabIndex={index}>ID {owner}</TextID>
              <WrapperText tabIndex={index} typePage={type}>
                <TextContent tabIndex={index}>
                  {isShowUsers !== index &&
                    (users && users.length > 6 ? users.slice(0, 6).join(' ') : users?.join(' '))}
                  {isShowUsers !== index && users && users.length > 0 && '...'}
                  {isShowUsers === index && type && type === 'Finance' && (
                    <>
                      {users?.join(' ')}
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
