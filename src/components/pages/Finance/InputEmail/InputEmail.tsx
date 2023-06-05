import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { Input, Message, Placeholder } from './InputEmail.styled';
import { PasswordField } from '../PasswordField';
import s from '../Finance.module.css';
// import image1 from '../../../../assets/icons/magnifyingGlass.svg'
import like from '../../../../assets/icons/like.svg';
import dislike from '../../../../assets/icons/dislike.svg';

type Type = {
  id: string;
  name: string;
  hotelName: string;
  desc: string;
  ddt: string;
  desc2: string;
  desc3: string;
  like: boolean;
};

let arr2: Type[] = [];

export const InputEmail: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState('');
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [isSendItem, setIsSendItem] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

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

  const arr = [
    {
      id: 'ID 7874567GHV',
      name: 'Hilton',
      hotelName: 'Hotel Viktoria',
      desc: 'Kapo de jecob   Хостел у Івана',
      ddt: 'DDT',
      desc2: 'Polo Tron   Мотел на західній вулиці',
      desc3: 'fjghbvhdjnfvfjghbvhdjnfvffjghbvhdjnfvf',
      like: true,
    },
    {
      id: 'ID 1123467LON',
      name: 'Klinton',
      hotelName: '',
      desc: '',
      ddt: 'DDT',
      desc2: 'Polo Tron   Мотел на західній вулиці',
      desc3: '',
      like: false,
    },
    {
      id: 'ID 4123467LON',
      name: 'Corona',
      hotelName: '',
      desc: '',
      ddt: 'DDT',
      desc2: 'Polo Tron   Мотел на західній вулиці',
      desc3: 'fjghbvhdjn',
      like: true,
    },
  ];

  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    arr2 = [];
    arr.forEach(item => {
      if (e.target.value === '') {
        setIsSendItem(false);
      } else if (item.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr2.push(item);
        setIsSendItem(true);
      }
    });
  };

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
        <div style={{ width: '100vw', height: '48vh' }}>
          <div style={{ marginTop: '-140px' }} className={s.mainDiv}>
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

          <div className={`${s.mainDiv} ${s.mainDiv2}`}>
            <div className={`${s.greenDiv} ${s.blue}`}>
              <p className={s.greenP}>Hoteliers:</p>
            </div>
            <div id="searchDiv">
              {/* <img src={image1} alt="serch" /> */}
              <input
                id="search"
                className={s.searchInput}
                type="search"
                placeholder="Search ID, Name object"
                onChange={searchChange}
                value={searchValue}
              />
            </div>
            {isSendItem && (
              <ul className={s.ul}>
                {arr2.map(item => (
                  <div className={s.divSearch} key={item.id} style={{ border: 'none' }}>
                    <div>
                      <span className={s.spanID}>{item.id}</span>
                      <span className={`${s.spanDesc} ${s.spanName}`}>{item.name}</span>
                      {item.hotelName !== '' && (
                        <span className={s.spanDesc}>{item.hotelName}</span>
                      )}
                      {item.desc !== '' && (
                        <span className={`${s.spanDesc} ${s.spanDescMargin}`}>{item.desc}</span>
                      )}
                      {item.ddt !== '' && <span className={s.spanDesc}>{item.ddt}</span>}
                      {item.desc2 !== '' && (
                        <span className={`${s.spanDesc} ${s.spanDesc2Margin}`}>{item.desc2}</span>
                      )}
                      {item.desc3 !== '' && (
                        <span className={s.spanDesc}>
                          {item.desc3.slice(0, 12)}
                          {item.desc3 !== '' && '...'}
                        </span>
                      )}
                    </div>
                    <div>
                      {item.like && <img src={like} alt="like" width="20px" height="20px" />}
                      {!item.like && <img src={dislike} alt="dislike" width="20px" height="20px" />}
                    </div>
                  </div>
                ))}
              </ul>
            )}
            {arr.map(item => (
              <div className={s.divSearch} key={item.id}>
                <div>
                  <span className={s.spanID}>{item.id}</span>
                  <span className={`${s.spanDesc} ${s.spanName}`}>{item.name}</span>
                  {item.hotelName !== '' && <span className={s.spanDesc}>{item.hotelName}</span>}
                  {item.desc !== '' && (
                    <span className={`${s.spanDesc} ${s.spanDescMargin}`}>{item.desc}</span>
                  )}
                  {item.ddt !== '' && <span className={s.spanDesc}>{item.ddt}</span>}
                  {item.desc2 !== '' && (
                    <span className={`${s.spanDesc} ${s.spanDesc2Margin}`}>{item.desc2}</span>
                  )}
                  {item.desc3 !== '' && (
                    <span className={s.spanDesc}>
                      {item.desc3.slice(0, 12)}
                      {item.desc3 !== '' && '...'}
                    </span>
                  )}
                </div>
                <div>
                  {item.like && <img src={like} alt="like" width="20px" height="20px" />}
                  {!item.like && <img src={dislike} alt="dislike" width="20px" height="20px" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
