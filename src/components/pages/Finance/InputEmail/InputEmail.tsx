import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input, Message, Placeholder } from './InputEmail.styled';
import { PasswordField } from '../PasswordField';

export const InputEmail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const key = 'maestro_@ukr.net';

  const validEmail = (): boolean => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEmail.test(email);
  };

  const testEmail = () => {
    if (email === key) {
      setShowPasswordField(true);
    } else {
      setMessage('This post is not authorized to access this section');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validEmail()) {
      setMessage('Invalid email');
    } else {
      testEmail();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage('');
    setEmail(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <div>
      <Message>{message && <p>{message}</p>}</Message>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onFocus={handleInputFocus}
          required
        />
        {!showPasswordField && <Button />}
      </form>
      <Placeholder hasValue={email !== ''} isFocused={isFocused}>
        E-mail:
      </Placeholder>
      {showPasswordField && <PasswordField />}
    </div>
  );
};
