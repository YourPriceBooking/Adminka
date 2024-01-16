import { Wrapper, Country, Text, Object, Span, Button } from './MowgliObjectCard.styled';

type DataType = {
  country: string;
  objects: string;
};

export const MowgliObjectCard = ({ country, objects }: DataType) => (
  <Wrapper>
    <Country>{country}</Country>
    <Text>pending verification</Text>
    <Object>
      <Span>Objects</Span>
      <Span>{objects}</Span>
    </Object>
    <div className="buttonBlock">
      <Button>Take one object for verification</Button>
    </div>
  </Wrapper>
);
