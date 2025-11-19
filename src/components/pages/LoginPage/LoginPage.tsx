import { useFromLocation } from 'common/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'features/common';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { Button } from '../Access/Button';
import { Message, Input, Placeholder, Div } from '../Access/InputEmail/InputEmail.styled';
import { PasswordField } from '../Access/PasswordField';

export const LoginPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const from = useFromLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (isLoggedIn && from) {
      nav('/menu');
    }
  }, [from, isLoggedIn, nav]);

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);

  // const key = 'maestro_@ukr.net';

  const validEmail = (): boolean => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEmail.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validEmail()) {
      setMessage('Недійсна електронна пошта');
    } else {
      try {
        const response: AxiosResponse<{ status: string; messageData: string }> = await axios.post(
          'https://ypbooking.chost.com.ua/api/acsess-to-admin/check-admin/',
          {
            email: `${email}`,
          }
        );

        const { status, messageData } = response.data;

        if (status === 'success') {
          setMessage(`Код підтвердження надіслано на електронну пошту: ${email}`);
          setShowPasswordField(true);
        } else {
          setMessage(messageData);
        }
      } catch (error) {
        setMessage('You entered the wrong door. You do not have access to this section.');
        // eslint-disable-next-line no-console
        console.error(error);
      }
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
          {showPasswordField && <PasswordField email={email} setIsSend={setIsSend} />}
        </div>
      )}
    </Div>
  );
};
