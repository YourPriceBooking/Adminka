import { Wrapper, Button, Country, Text, Object, Span } from './ObjectCard.styled';

type ObjectType = {
    country: string;
    objects: number;
};
export const ObjectCard = ({ country, objects }: ObjectType) => (
  <Wrapper>
    <Country>{country}</Country>
    <Text>pending verification</Text>
    <Object>
      <Span>Objects</Span>
      <Span>{objects}</Span>
    </Object>
    <Button type="button">Take one object for verification</Button>
  </Wrapper>
);