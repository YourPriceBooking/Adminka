
import { useState } from 'react';
import { Button, ChatTextarea, Img } from './FormChat.styled';
import sendArrow from '../../../../assets/icons/sendIcon.svg';


type Props = {
  author: string;
  message: string | null;
  time: string;
};

type FormChatProps = {
  setMessageList: React.Dispatch<React.SetStateAction<Props[]>>;
};


// тимчасові змінні
const username = 'Rancho Boliwar'

export const FormChat: React.FC<FormChatProps> = ({ setMessageList }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const onChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { target } = event;
    setCurrentMessage(target.value);
  };

  const newTime = new Date(Date.now()).toLocaleTimeString();
  const messageData: Props = {
    author: username,
    message: currentMessage,
    time: newTime,
  };

  const sendMessage = async () => {
    // if (currentMessage !== '') {

    // }

    // await socket.emit('send_message', messageData);
    setMessageList(prev => [...prev, messageData]);
    setCurrentMessage('');
  };

  return (
    <div style={{ position: 'relative' }}>
      <ChatTextarea value={currentMessage} onChange={onChangeMessage} />
      <Button onClick={sendMessage}>
        <Img src={sendArrow} alt="send arrow" />
      </Button>
    </div>
  );
};