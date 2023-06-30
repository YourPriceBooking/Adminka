import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { setToken } from 'features/access/tokenSlice';
import { useAppDispatch } from 'App';
import {
  Input,
  EnterPass,
  VerifPass,
  PasswordFieldWrapper,
  NotVerifPass,
} from './PasswordField.styled';
import { Button } from '../Button';

interface ResponseData {
  status: string;
  data: {
    token: string;
  };
}

export const PasswordField: React.FC<{
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}> = ({ setIsSend, email }) => {
  const [passwordCode, setPasswordCode] = useState<string>('');
  const [messagePass, setMessagePass] = useState<string>('');
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const key = '1111';

  // const validPassword = (): boolean => {
  //   const result = passwordCode !== key;
  //   return result;
  // };

  const validPassword = async (): Promise<boolean> => {
    try {
      const response: AxiosResponse<ResponseData> = await axios.post(
        'https://server-your-price-booking.onrender.com/api/acsess-to-admin/log-in-admin/',
        {
          email: `${email}`,
          secretCode: passwordCode,
        }
      );

      const { status, data } = response.data;
      dispatch(setToken(data.token));
      return status === 'success';
    } catch (error) {
      console.error('Помилка під час перевірки секретного коду', error);
      return false;
    }
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCode(e.target.value);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(await validPassword())) {
      setMessagePass('You entered a wrong verification code, try again');
    } else {
      setIsSend(true);
      // navigate('/');
    }
  };

  // console.log(dataForToken)

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
