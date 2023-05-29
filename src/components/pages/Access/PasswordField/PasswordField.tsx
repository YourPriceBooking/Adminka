import React, { useState } from 'react';
import {
  Input,
  EnterPass,
  VerifPass,
  PasswordFieldWrapper,
  NotVerifPass,
} from './PasswordField.styled';
import { Button } from '../Button';

export const PasswordField: React.FC<{
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsSend }) => {
  const [passwordCode, setPasswordCode] = useState<string>('');
  const [messagePass, setMessagePass] = useState('');
  // const navigate = useNavigate();

  const key = '1111';

  const validPassword = (): boolean => {
    const result = passwordCode !== key;
    return result;
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCode(e.target.value);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validPassword()) {
      setMessagePass('You entered a wrong verification code, try again');
    } else {
       
      setIsSend(true);
      // navigate('/');
    }
  };

  return (
    <PasswordFieldWrapper>
      {messagePass ? (
        <NotVerifPass>{messagePass}</NotVerifPass>
      ) : (
        <EnterPass>Enter the verification code we sent to your email address</EnterPass>
      )}
      <form onSubmit={handlePasswordSubmit}>
        <Input
          type="text"
          name="verificationCode"
          value={passwordCode}
          onChange={handleVerificationCodeChange}
          required
        />
        <Button />
      </form>
      <VerifPass>Verification code - valid for 3 minutes</VerifPass>
    </PasswordFieldWrapper>
  );
};
