import { Wrapper, Button, Country, Text, Object, Span } from './ObjectCard.styled';

type ObjectType = {
  country: string;
  onClick: () => void;
  components: string[];
  count: number;
};
export const ObjectCard = ({ country, onClick, components, count }: ObjectType) => {
  const addCardOnHandleClick = () => {
    if (components.length < 3) {
      onClick();
    }
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
