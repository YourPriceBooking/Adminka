import React, { useState } from 'react';
import { Wrapper } from './Users.styled';
import { StatisticsHeader } from '../StatisticsHeader/StatisticsHeader';
import { UsersList } from './UsersList/UsersList';

export const Users: React.FC = () => {
  const [isShowUsers] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <Wrapper padding={typeof isShowUsers === 'number'}>
      <div>
        <StatisticsHeader type="Users" isShowUsers={isShowUsers} />
        <UsersList isShowUsers={isShowUsers} searchQuery={searchQuery} onSearch={handleSearch} />
      </div>
    </Wrapper>
  );
};

export default Users;
