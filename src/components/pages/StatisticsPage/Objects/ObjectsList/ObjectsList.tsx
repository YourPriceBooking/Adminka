/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'components/shared/Loader';
import {
  Inner,
  TextContent,
  TextID,
  Wrapper,
  WrapperText,
  SearchButton,
  InputSearch,
  Fun,
  InputContainer,
  IconScrh,
  LabelFormed,
  ClearButtoned,
} from './ObjectsList.styled';
import deletedIcon from '../../../../../assets/icons/deletedIcon.svg';
import likeIcon from '../../../../../assets/icons/like.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';
import pi from '../../../../../assets/icons/pict.svg';

type Prop = {
  type?: string;
  isShowObjects?: number | null;
};

export type DataProp = {
  _id: string;
  title: string;
  status: 'active' | 'deleted' | 'not active';
};

export const ObjectsList: React.FC<
  Prop & { searchQuery?: string; onSearch: (query: string) => void }
> = ({ type, isShowObjects, searchQuery, onSearch }) => {
  const [data, setData] = useState<DataProp[]>([
    {
      _id: '1sdfsdfsdfs',
      title: 'Test 1',
      status: 'active',
    },
    {
      _id: '2sdfgsdfgdfgdf',
      title: 'Test 2',
      status: 'deleted',
    },
    {
      _id: '3sdfgdfgsdfgs',
      title: 'Test 3',
      status: 'not active',
    },
  ]); // replace to [] after endpoint creation

  const [isLoading, setIsLoading] = useState(false); // set "true" after endpoint creation
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isClearClicked, setIsClearClicked] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
    setIsClearClicked(true);
  };

  const handleClearClick = () => {
    setIsSearchClicked(false);
    onSearch('');
    setIsClearClicked(false);
  };

  const filteredData = searchQuery
    ? data.filter(item => {
        const normalizedQuery = searchQuery.toLowerCase();
        return (
          item._id.toLowerCase().includes(normalizedQuery) ||
          item.title.toLowerCase().includes(normalizedQuery)
        );
      })
    : data;

  const displayData = isSearchClicked ? filteredData : data;

  /* useEffect(() => {
    fetch('${HEROKU_BACKEND_URL}/acsess-to-admin/get-objects')
      .then(response => response.json())
      .then((date: { code: number; objects: DataProp[] }) => {
        if (date.code === 200 && date.objects && Array.isArray(date.objects)) {
          const objects = date.objects.map(object => ({
            _id: object._id,
            title: object.title,
            status: object.status,
          }));
          setData(objects);
          setIsLoading(false);
        } else {
          console.error('Objects data is not in the expected format');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('Error data:', error);
        setIsLoading(false);
      });
  }, []); */

  return (
    <Wrapper>
      <Fun>
        <InputContainer>
          <InputSearch
            className="input"
            type="text"
            placeholder="Search ID Users or/and Name object"
            value={searchQuery}
            onChange={e => onSearch(e.target.value)}
            autoComplete="search"
            onKeyUp={e => {
              if (e.key === 'Enter') {
                handleSearchClick();
              }
            }}
          />
          <LabelFormed className="label" htmlFor="input-id">
            Search ID Hoteliers or/and Name object
          </LabelFormed>
          <IconScrh src={pi} alt="Search" />
          {isClearClicked ? (
            <ClearButtoned type="button" onClick={handleClearClick}>
              Close
            </ClearButtoned>
          ) : (
            <SearchButton onClick={handleSearchClick}>Search</SearchButton>
          )}
        </InputContainer>
      </Fun>

      {displayData.length > 0 &&
        displayData.map((obj, index) => (
          <Inner
            key={obj._id}
            border={isShowObjects === index}
            hidden={isShowObjects !== index && isShowObjects !== null}
            position={isShowObjects !== null}
            tabIndex={index}
          >
            <TextID tabIndex={index}>ID {obj._id.toUpperCase()}</TextID>
            <WrapperText tabIndex={index} typePage={type}>
              <TextContent tabIndex={index}>
                {isLoading ? <Spinner /> : <div>{obj.title}</div>}
              </TextContent>
            </WrapperText>
            <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
              {obj.status === 'active' && (
                <img src={likeIcon} alt="like" width="20px" height="20px" />
              )}
              {obj.status === 'not active' && (
                <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />
              )}
              {obj.status === 'deleted' && (
                <img src={deletedIcon} alt="dislike" width="20px" height="20px" />
              )}
            </div>
          </Inner>
        ))}
    </Wrapper>
  );
};
