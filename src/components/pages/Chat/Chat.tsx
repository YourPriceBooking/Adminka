import { Wrapper } from "./Chat.stayled";
import { ChatBody } from "./ChatBody/ChatBody";
import { HeaderChat } from "./HeaderChat/HeaderChat";


export const Chat = () => (
  <Wrapper>
    <HeaderChat />
    <ChatBody/>
  </Wrapper>
);
