
import React from 'react';
// import { useSelector } from 'react-redux';
// import { fetchHotelsById } from 'features/hoteliers/hoteliersOperation';
// import { useAppDispatch } from 'App';
// import { selectorHoteliers } from 'features/hoteliers/hoteliersSelectors';
import { Spinner } from 'components/shared/Loader';
import likeIcon from '../../../../../assets/icons/like.svg';
import dislikeIcon from '../../../../../assets/icons/dislike.svg';
import { Inner, TextContent, TextID, Wrapper, WrapperText } from './UsersList.styled';


type Prop = {
    type?: string;
  isShowUsers?: number | null;
  
};

type DataProp = {
    name: string;
    status: string;
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
        name: 'Mike',
        status: 'active',
      },
      {
        name: 'Masha',
        status: 'active',
      },
      {
        name: 'Vika',
        status: 'disabled',
      },
    ];


    return (
      <Wrapper>
        {data.length > 0 &&
          data.map(({ name, status }, index) => (
            <Inner
              border={isShowUsers === index}
              hidden={isShowUsers !== index && isShowUsers !== null}
              position={isShowUsers !== null}
              key={name}
              tabIndex={index}
            >
              <TextID tabIndex={index}>ID {index}</TextID>
              <WrapperText tabIndex={index} typePage={type}>
                <TextContent tabIndex={index}>
                  {isShowUsers && <Spinner />}
                  {!isShowUsers &&
                    isShowUsers !== index &&
                    (name && name.length > 6 ? name.slice(0, 6) : name)}
                  {!isShowUsers && isShowUsers !== index && name && name.length > 0 && '...'}
                </TextContent>
              </WrapperText>
              <div style={{ marginLeft: 'auto', paddingLeft: '20px' }}>
                {status === 'active' ? (
                  <img src={likeIcon} alt="like" width="20px" height="20px" />
                ) : (
                  <img src={dislikeIcon} alt="dislike" width="20px" height="20px" />
                )}
              </div>
            </Inner>
          ))}
      </Wrapper>
    );
} 

