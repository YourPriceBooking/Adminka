import React, { useState } from 'react';
import { Wrapper } from './ObjectsData.styled';
import { StatisticsHeader } from '../StatisticsHeader/StatisticsHeader';
import { ObjectsList } from './ObjectsList/ObjectsList';

const ObjectsData: React.FC = () => {
  const [isShowObjects] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <Wrapper padding={typeof isShowObjects === 'number'}>
      <div>
        <StatisticsHeader type="Objects" isShowUsers={isShowObjects} />
        <ObjectsList
          isShowObjects={isShowObjects}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />
      </div>
    </Wrapper>
  );
};

export default ObjectsData;
