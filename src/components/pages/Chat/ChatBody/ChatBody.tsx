import { ChatMessages } from "../ChatMessages/ChatMessages";
import { FormChat } from "../FormChat/FormChat";
import { Wrapper } from "./ChatBody.styled";



export const ChatBody = () => (
  <Wrapper>
    <ChatMessages />
    <FormChat/>
  </Wrapper>
);
