import { Button, Inner, Input, SecondaryText, SubTitle, Text, Title, Wrapper } from './AccountHotelier.styled';

export const AccountHotelier = () => (
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
    <Inner>
      <Input />
      <Text>USD</Text>
      <Button>Send BONUS now</Button>
    </Inner>
  </Wrapper>
);
