import React, { useState } from 'react';
import {
  Button,
  Inner,
  Input,
  SecondaryText,
  SubTitle,
  Text,
  Title,
  Wrapper,
  Form,
  Error,
  HotelierInfo,
  TextInfoId,
  TextOtherInfo,
  ReturnButton,
} from './MowgliBookingHotelierAccount.styled';

type AccountHotelierProps = {
  id: string;
  hotel?: string[];
    email: string;
    status: string;
  onReturnToList: () => void;
};

// type DataBonus = {
//   id: string;
//   amount: number;
// };

export const MowgliAccountHotelier: React.FC<AccountHotelierProps> = ({
  id,
  hotel,
    email,
  status,
  onReturnToList,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dummyData] = useState({
    total: 5000,
    currency:'USD',
    bonus: 200,
    money: 4800,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const form = event.currentTarget;
    const inputElement = form.elements.namedItem('input') as HTMLInputElement | null;
    const value = Number(inputElement?.value);

    if (value <= 0) {
      setErrorMessage('You cannot enter a negative value.');
      return;
    }

    // if (inputElement && inputElement.value !== '') {
    //   // Simulating an API call with dummy data
    //   const dataToPatch: DataBonus = {
    //     id,
    //     amount: Number(inputElement.value),
    //   };
    //   // Dispatch(fetchBonus(dataToPatch)); // Uncomment when you have the actual API call
    // }

    form.reset();
    setErrorMessage(null);
  };

    return (
      <div>
            <ReturnButton onClick={onReturnToList}>
                <img src='/return.png' alt='return' />
            </ReturnButton>
        <Wrapper>
          <HotelierInfo>
            <TextInfoId>ID {id}</TextInfoId>
            <TextOtherInfo>{hotel}</TextOtherInfo>
            <TextOtherInfo>{email}</TextOtherInfo>
            <TextOtherInfo>
              {status === 'deleted' ? <img src="/noactive.png" alt="deleted" /> : null}
              {status === 'active' ? <img src="/activeGreen.png" alt="active" /> : null}
              {status === 'inactive' ? <img src="/inactiveRed.png" alt="inactive" /> : null}
            </TextOtherInfo>
          </HotelierInfo>
          <Inner>
            <Title>Total in your account now:</Title>
            <Text>{dummyData.total}</Text>
            <Text>{dummyData.currency}</Text>
          </Inner>
          <SubTitle>detailed deposit:</SubTitle>
          <Inner>
            <SecondaryText>Total bonus:</SecondaryText>
            <Text>{dummyData.bonus}</Text>
            <Text>{dummyData.currency}</Text>
          </Inner>
          <Inner>
            <SecondaryText>Total money:</SecondaryText>
            <Text>{dummyData.money}</Text>
            <Text>{dummyData.currency}</Text>
          </Inner>
          {errorMessage && <Error>{errorMessage}</Error>}
          <Form onSubmit={handleSubmit}>
            <Input type="number" name="input" />
            <Text>{dummyData.currency}</Text>
            <Button>Send BONUS now</Button>
          </Form>
        </Wrapper>
      </div>
    );
};
