import { Img, Text, Wrapper } from "./HeaderChat.styled";
import LogoChat from '../../../../assets/icons/LogoChat.svg'



export const HeaderChat = () => (
  <Wrapper>
    <Text>Chat with the hotelier</Text>
    <Img src={LogoChat} alt='logo' />
  </Wrapper>
);

