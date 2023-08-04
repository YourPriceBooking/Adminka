import { useDispatch } from 'react-redux';
import { fetchBonus } from 'features/hoteliers/hoteliersOperation';
import type { Dispatch } from 'react';
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
        <Text>33</Text>
        <Text>USD</Text>
      </Inner>
      <SubTitle>detailed deposit:</SubTitle>
      <Inner>
        <SecondaryText>Total bonus:</SecondaryText>
        <Text>33</Text>
        <Text>USD</Text>
      </Inner>
      <Inner>
        <SecondaryText>Total money:</SecondaryText>
        <Text>0</Text>
        <Text>USD</Text>
      </Inner>
      <Form onSubmit={handleSubmit}>
        <Input type="number" name="input" />
        <Text>USD</Text>
        <Button>Send BONUS now</Button>
      </Form>
    </Wrapper>
  );
};
