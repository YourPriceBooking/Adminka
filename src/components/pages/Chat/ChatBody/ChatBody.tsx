import { useState } from "react";
import { ChatMessages } from "../ChatMessages/ChatMessages";
import { FormChat } from "../FormChat/FormChat";
import { Wrapper } from "./ChatBody.styled";

type Props = {
  author: string;
  message: string | null;
  time: string;
};

export const ChatBody = () => {
  const [messageList, setMessageList] = useState<Props[]>([]);

      const first = () => {
        setMessageList(prev => [
          ...prev,
          {
            author: 'Silvia',
            message: 'gtfdgrd gfgd',
            time: new Date(Date.now()).toLocaleTimeString(),
          },
        ]);
      };

  return (
    <>
      <button type="button" onClick={first}>
        other user
      </button>
      <Wrapper>
        <ChatMessages messageList={messageList} />
        <FormChat setMessageList={setMessageList} />
      </Wrapper>
    </>
  );
};
