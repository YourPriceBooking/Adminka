import React, { useState } from 'react';
import { EmailInputStyled, Input, ErrorEmail } from './EmailInput.styled';
import { SendButton } from '../SendButton';

export const EmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setEmail(event.target.value);
    setIsEmailValid(true); 
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail()) {
      setMessage(`It doesn't look like Email at all.`);
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  return (
    <EmailInputStyled>
      <ErrorEmail>{message && <p>{message}</p>}</ErrorEmail>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
          error={!isEmailValid}
        />
        <SendButton />
      </form>
    </EmailInputStyled>
  )
}
