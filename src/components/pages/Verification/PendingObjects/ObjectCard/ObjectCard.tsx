import { Wrapper, Button, Country, Text, Object } from './ObjectCard.styled';

type ObjectType = {
    country: string;
    objects: number;
};
export const ObjectCard = ({ country, objects }: ObjectType) => (
  <Wrapper>
    <Country>{country}</Country>
    <Text>pending verification</Text>
    <Object>
      <span>Objects</span>
      <span>{objects}</span>
    </Object>
    <Button type="button">Take one object for verification</Button>
  </Wrapper>
);