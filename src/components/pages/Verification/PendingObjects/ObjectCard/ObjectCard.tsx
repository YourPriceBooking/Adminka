import { Wrapper, Country, Text, Object, Span } from './ObjectCard.styled';

type ObjectType = {
  country: string;
  onClick: (country: string) => void;
  countAdded: number;
  count: number;
};
export const ObjectCard = ({ country, onClick, count, countAdded }: ObjectType) => {
  const addCardOnHandleClick = () => {
    onClick(country);
  };

  return (
    <Wrapper>
      <Country>{country}</Country>
      <Text>pending verification</Text>
      <Object
        // className={`${disabled ? 'disabled' : ''}`}
        className="disabled"
      >
        <Span>Objects added: </Span>
        <Span>{countAdded}</Span>
      </Object>
      <Object onClick={addCardOnHandleClick}>
        <Span>Objects on verif: </Span>
        <Span>{count}</Span>
      </Object>
    </Wrapper>
  );
};
