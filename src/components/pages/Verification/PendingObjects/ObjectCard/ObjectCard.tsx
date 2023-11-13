import { Wrapper, Button, Country, Text, Object, Span } from './ObjectCard.styled';

type ObjectType = {
  country: string;
  onClick: (country: string) => void;
  // components: string[];
  count: number;
};
export const ObjectCard = ({ country, onClick, count }: ObjectType) => {
  const addCardOnHandleClick = () => {
    onClick(country);
  };

  return (
    <Wrapper>
      <Country>{country}</Country>
      <Text>pending verification</Text>
      <Object>
        <Span>Objects</Span>
        <Span>{count}</Span>
      </Object>
      <Button onClick={addCardOnHandleClick} type="button">
        Take one object for verification
      </Button>
    </Wrapper>
  );
};
