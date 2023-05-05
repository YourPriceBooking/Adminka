import { AdminEmailStyled } from './AdminEmail.styled';
import { EmailInput } from '../EmailInput';
import { SendButton } from '../SendButton';

export const AdminEmail = () => (
  <AdminEmailStyled>
    <p>Enter Your Email</p>
    <EmailInput />
    <SendButton/>
  </AdminEmailStyled>
);
