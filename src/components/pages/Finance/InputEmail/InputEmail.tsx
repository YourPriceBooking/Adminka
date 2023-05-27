import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input, Message, Placeholder } from './InputEmail.styled';
import { PasswordField } from '../PasswordField';
import s from '../Finance.module.css';

export const InputEmail: React.FC = () => {
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

  const g = "'";

  return (
    <>
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
      {isSend && (
        <div style={{ marginTop: '-100px' }} className={s.mainDiv}>
          <div className={s.greenDiv}>
            <p className={s.greenP}>All statistic</p>
          </div>
          <div className={s.containerDiv}>
            <div>
              <p className={s.descP}>Funds added to hotelier accounts:</p>
              <p className={s.descP}>Bonus funds added to hoteliers{g} accounts:</p>
              <p className={s.descP}>Refunds of unspent money to hoteliers:</p>
              <p className={`${s.descP} ${s.descP3}`}>Gross hotel revens:</p>
              <p className={`${s.descP} ${s.descP2}`}>
                Hoteliers paid for our services with bonuses:
              </p>
              <p className={s.descP}>Hoteliers have paid for our services:</p>
            </div>
            <div className={s.containerDivBox2}>
              <span className={s.priseSpan}>750 876 USD</span>
              <span className={s.priseSpan}>25 879 USD</span>
              <span className={s.priseSpan}>25 879 USD</span>
              <span className={`${s.priseSpan} ${s.priseSpan3}`}>1 234 579 USD</span>
              <span className={`${s.priseSpan} ${s.priseSpan2}`}>4 579 USD</span>
              <span className={s.priseSpan}>34 579 USD</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
