
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { fetchHotelsById } from 'features/hoteliers/hoteliersOperation';
// import { useAppDispatch } from 'App';
// import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { Spinner } from 'components/shared/Loader';
import { Inner, TextContent, TextID, Wrapper, WrapperText, SearchButton,InputSearch,Fun,InputContainer,IconScrh, LabelFormed,ClearButtoned } from './UsersList.styled';
import pi from '../../../../../assets/icons/pict.svg';
// import exo from '../../../../../assets/icons/x.svg';
type Prop = {
    type?: string;
  isShowUsers?: number | null;
  
};

export type DataProp = {
  name: string;
  id: string;
}


export const UsersList: React.FC<Prop & { searchQuery?: string, onSearch: (query: string)=> void }> = ({ type, isShowUsers, searchQuery, onSearch }) => {
    // const dispatch = useAppDispatch();
    // const { hoteliers, isLoadingHotels } = useSelector(selectorHoteliers);
    // console.log(hoteliers)
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const handleSearchClick = () => {
      setIsSearchClicked(true);
    };


    // useEffect(() => {
    //   if (hoteliers.length > 0) hoteliers.map(({ owner }) => dispatch(fetchHotelsById(owner)));
    //   // eslint-disable-next-line
    // }, [dispatch]);
  
    const data: DataProp[] = [
      {
        name: 'Hopin Viktoria',
        id: '7874567GHV',
      },
      {
        name: 'Klinton Bill',
        id: '1123467LON',
      },
      {
        name: 'Buch Viktoria',
        id: '9889T567KI',
      },
      {
        name: 'Klinton Sofia',
        id: '1123467LON',
      },
    ];


    const filteredData = searchQuery
    ? data.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : data;
    const handleClearClick = () => {
      setIsSearchClicked(false); // Скидаємо флаг пошуку, коли поле очищається
      onSearch(''); // Очищаємо searchQuery
    };
  const displayData = isSearchClicked ? filteredData : data;
    return (
      <Wrapper>
        <Fun>
       <InputContainer>
        <InputSearch
        className="input"
        type="text"
        placeholder="Search ID Hoteliers or/and Name object"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
      <LabelFormed className="label" htmlFor="input-id">Search ID Hoteliers or/and Name object</LabelFormed>
      <IconScrh src={pi} alt="Search" />
      {searchQuery && (
  <ClearButtoned type="button" onClick={handleClearClick}>Close</ClearButtoned>
)}
      <SearchButton onClick={handleSearchClick}>Search</SearchButton>
      </InputContainer>
      </Fun>
        {displayData.length > 0 &&
          displayData.map(({ name,id }, index) => (
            <Inner
              border={isShowUsers === index}
              hidden={isShowUsers !== index && isShowUsers !== null}
              position={isShowUsers !== null}
              key={name}
              tabIndex={index}
            >
              <TextID tabIndex={index}>ID {id}</TextID>
              <WrapperText tabIndex={index} typePage={type}>
                <TextContent tabIndex={index}>
                  {isShowUsers && <Spinner />}
                  {!isShowUsers &&
                    isShowUsers !== index &&
                    (name && name.length > 20 ? name.slice(0, 6) : name)}
                  {/* {!isShowUsers && isShowUsers !== index && name && name.length > 0 && '...'} */}
                </TextContent>
              </WrapperText>
            </Inner>
          ))}
      </Wrapper>
    );
} 

