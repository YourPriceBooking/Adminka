import { EmailInputStyled, Input } from './EmailInput.styled';

export const EmailInput = () => (
  <EmailInputStyled>
    <Input type="email" name="email" pattern=".+@globex\.com" required />
  </EmailInputStyled>
);