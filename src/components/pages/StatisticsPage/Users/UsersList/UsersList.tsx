
import React from 'react';
// import { useSelector } from 'react-redux';
// import { fetchHotelsById } from 'features/hoteliers/hoteliersOperation';
// import { useAppDispatch } from 'App';
// import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { Spinner } from 'components/shared/Loader';
import { Inner, TextContent, TextID, Wrapper, WrapperText } from './UsersList.styled';


type Prop = {
    type?: string;
  isShowUsers?: number | null;
  
};

type DataProp = {
  name: string;
  id: string;
}


export const UsersList: React.FC<Prop> = ({type, isShowUsers }) => {
    // const dispatch = useAppDispatch();
    // const { hoteliers, isLoadingHotels } = useSelector(selectorHoteliers);
    // console.log(hoteliers)



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


    return (
      <Wrapper>
        {data.length > 0 &&
          data.map(({ name,id }, index) => (
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

