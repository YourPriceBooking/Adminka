import React, { useState, useCallback, useRef } from 'react';
import { HEROKU_BACKEND_URL } from 'features/api/contants';
// import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setToken } from 'features/access/tokenSlice';
import { useAppDispatch } from 'App';
import { login, setAccess } from 'features/common';
// import { useNavigate } from 'react-router-dom';
import {
  Input,
  EnterPass,
  VerifPass,
  PasswordFieldWrapper,
  NotVerifPass,
} from './PasswordField.styled';
import { Button } from '../Button';


type ResponseDataAdmin = {
  status: string;
  code: number;
  user: {
    _id: string;
    access: string[];
    status: string;
    role: string;
    token: string;
  };
};

type ResponseDataSuperAdmin = {
  status: string;
  code: number;
  result: {
    _id: string;
    role: string;
    token: string;
  };
};

export const PasswordField: React.FC<{
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
}> = ({ setIsSend, email }) => {
  const [passwordCode, setPasswordCode] = useState<string>('');
  const [messagePass, setMessagePass] = useState<string>('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  // const key = '1111';

  // const validPassword = (): boolean => {
  //   const result = passwordCode !== key;
  //   return result;
  // };

  const validPassword = async (): Promise<boolean> => {
    try {
      const response = await axios.post<ResponseDataAdmin | ResponseDataSuperAdmin>(
        `${HEROKU_BACKEND_URL}/acsess-to-admin/log-in-admin/`,
        {
          email: `${email}`,
          secretCode: passwordCode,
        }
      );

      if ('user' in response.data) {
        // response.data - об'єкт типу ResponseDataAdmin
        const { status, user } = response.data;
        dispatch(setToken(user.token));
        dispatch(login(email));
        dispatch(setAccess(user.access));
        return status === 'success';
      }
      if ('result' in response.data) {
        // response.data - об'єкт типу ResponseDataSuperAdmin
        const { status, result } = response.data;
        dispatch(setToken(result.token));
        dispatch(login(email));
        dispatch(setAccess(['all']));
        return status === 'success';
      }

      return false;
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
      // navigate('/menu');
    }
  };
  // const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //     await handlePasswordSubmit(e as any);
  //   }
  // };
  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      }
    }
  }, []);

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
          onKeyDown={handleKeyUp}
        />
        <Button />
      </form>
      <VerifPass>Verification code - valid for 30 minutes</VerifPass>
    </PasswordFieldWrapper>
  );
};
