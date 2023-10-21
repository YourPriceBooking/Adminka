
import React, { useState } from 'react';
import { Wrapper} from './Users.styled';
import { StatisticsHeader } from '../StatisticsHeader/StatisticsHeader';
import {UsersList} from "./UsersList/UsersList"


type UsersProps = {
  isShowUsersPage: boolean; 
};
export const Users: React.FC<UsersProps> = ({ isShowUsersPage }) => {
  const [isShowUsers] = useState <number | null> (null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  }
  return (
    <Wrapper padding={typeof isShowUsers === 'number'}>
      {isShowUsersPage ? (
        <div>
          <StatisticsHeader type="Users" isShowUsers={isShowUsers} />
          {/* <InputMain>
            <img alt="dandruff" src="./loop.pdf"/>
            <input placeholder="Search ID, Name, Surname" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </InputMain> */}
          <UsersList isShowUsers={isShowUsers} searchQuery={searchQuery} onSearch={handleSearch}/>
        </div>
      ) : null}
    </Wrapper>
  );
}

export default Users;

