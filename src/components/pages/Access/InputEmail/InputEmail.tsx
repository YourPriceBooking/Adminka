import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input, Message, Placeholder, Div } from './InputEmail.styled';
import { PasswordField } from '../PasswordField/PasswordField';

export const InputEmail: React.FC<{ component: React.ComponentType }> = ({ component: Component }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);

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
    <Div hasValue={isSend}>
      {!isSend && (
        <div>
          <Message>{message && <p>{message}</p>}</Message>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              value={email}
              required
              onChange={handleEmailChange}
              onFocus={handleInputFocus}
            />
            {!showPasswordField && <Button />}
          </form>
          <Placeholder hasValue={email !== ''} isFocused={isFocused}>
            E-mail:
          </Placeholder>
          {showPasswordField && <PasswordField setIsSend={setIsSend} />}
        </div>
      )}

      {isSend && <Component />}
    </Div>
  );
};
