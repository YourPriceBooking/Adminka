import { useDispatch, useSelector } from 'react-redux';
import { fetchBonus , fetchHoteliers } from 'features/hoteliers/hoteliersOperation';
import type { Dispatch} from 'react';
import { useEffect } from 'react';
import { selectorBonusHoteliers } from 'features/hoteliers/hoteliersSelectors';
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
} from './AccountHotelier.styled';

type AccountHotelierProps = {
  id: string,
}

type DataBonus = {
  id: string;
  amount: number;
};

export const AccountHotelier: React.FC<AccountHotelierProps> = ({id}) => {
    type DispatchAction = Dispatch<any>;
  const dispatch: DispatchAction = useDispatch();
  const data = useSelector(selectorBonusHoteliers);


  useEffect(() => {
dispatch(fetchHoteliers());
  }, [])
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
   event.preventDefault()
   const form = event.currentTarget;
   const inputElement = form.elements.namedItem('input') as HTMLInputElement | null;
    if (inputElement && inputElement.value !== '') {
      const dataToPatch: DataBonus = {
        id,
        amount: Number(inputElement.value),
      };
      dispatch(fetchBonus(dataToPatch));
    }
    form.reset()
 };

  return (
    <Wrapper>
      <Inner>
        <Title>Total in your account now:</Title>
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.total)}
        </Text>
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.currency)}
        </Text>
      </Inner>
      <SubTitle>detailed deposit:</SubTitle>
      <Inner>
        <SecondaryText>Total bonus:</SecondaryText>
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.bonus)}
        </Text>
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.currency)}
        </Text>
      </Inner>
      <Inner>
        <SecondaryText>Total money:</SecondaryText>
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.money)}
        </Text>
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.currency)}
        </Text>
      </Inner>
      <Form onSubmit={handleSubmit}>
        <Input type="number" name="input" />
        <Text>
          {data.length > 0 &&
            data.map(hotelier => id === hotelier.owner && hotelier.finances?.currency)}
        </Text>
        <Button>Send BONUS now</Button>
      </Form>
    </Wrapper>
  );
};
