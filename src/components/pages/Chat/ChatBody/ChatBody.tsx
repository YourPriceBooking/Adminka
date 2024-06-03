// import { io } from "socket.io-client";

import { useEffect, useState } from 'react';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import { FormChat } from '../FormChat/FormChat';
import { Wrapper } from './ChatBody.styled';

type Props = {
  author: string;
  message: string | null;
  time: string;
};

export const ChatBody = () => {
  // const socket = io('https://server-domain.com');

  const [messageList, setMessageList] = useState<Props[]>([]);

  const date = new Date();
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  const fullDay = date.toUTCString().split(' ').slice(1, 4).join(' ');

  const formattedDate = `${hour}:${minute} ${fullDay}`;

  console.log(formattedDate);

  const first = () => {
    setMessageList(prev => [
      ...prev,
      {
        author: 'Verifier ID 0023337',
        message: 'But first, we will go through verification.',
        time: formattedDate,
      },
    ]);
  };

  useEffect(() => {
    /* socket.on('connect', () => {
      console.log(socket.id);
    }); */
  }, []);

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
