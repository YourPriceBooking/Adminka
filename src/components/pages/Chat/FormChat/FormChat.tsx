import { Button, ChatTextarea, Img } from './FormChat.styled';
import sendArrow from '../../../../assets/icons/sendIcon.svg';


export const FormChat = () => (
  <div style={{ position: 'relative' }}>
    <ChatTextarea />
    <Button>
      <Img src={sendArrow} alt="send arrow" />
    </Button>
  </div>
);