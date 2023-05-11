// import { useEffect } from "react";
import { Inner, MessageAuthorTime, MessageText, Wrapper } from "./ChatMessages.styled";

type Props = {
  author: string;
  message: string | null;
  time: string;
};

type ChatMessagesProps = {
  messageList: Props[];
//   setMessageList: React.Dispatch<React.SetStateAction<Props[]>>;
};

// тимчасові змінні
const username = 'Rancho Boliwar'

  //     useEffect(() => {
  //         socket.on('reseive_message', data => {
  //           setMessageList((prev)=>[...prev,data])
  //       });
  //     }, [socket]);

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messageList }): JSX.Element => (
  <Wrapper>
    <Inner>
      {messageList.map(({ author, message, time }) => (
        <div key={time} style={{ color: username === author ? '#FF6000' : '#0090FF' }}>
          <MessageAuthorTime>
            {author} {time}
          </MessageAuthorTime>
          <MessageText>{message}</MessageText>
        </div>
      ))}
    </Inner>
  </Wrapper>
);
