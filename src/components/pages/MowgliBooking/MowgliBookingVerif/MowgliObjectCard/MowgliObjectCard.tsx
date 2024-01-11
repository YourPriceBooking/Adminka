import { Wrapper, Country, Text, Object, Span } from './MowgliObjectCard.styled';


export const MowgliObjectCard = () => (
    <Wrapper>
        <Country>Ukraine</Country>
        <Text>pending verification</Text>
        <Object>
          <Span>Objects added: </Span>
          <Span>0</Span>
        </Object>
        <Object>
          <Span>Objects on verif: </Span>
          <Span>0</Span>
        </Object>
      </Wrapper>
  );
