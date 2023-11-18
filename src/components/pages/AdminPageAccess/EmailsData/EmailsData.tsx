import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'App';
import type { RootState } from 'App/store';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { setToken } from 'features/access/tokenSlice';
import { useMutation, useQueryClient } from 'react-query';
import {
  EmailsDataPageStyled,
  EmailsMainStyled,
  EmailMainHeaderStyled,
  EmailMainBodyStyled,
  ActiveBlock,
  CheckedStyle,
  ButtonBan,
  ButtonChange,
  // LiftTheBan,
} from './EmailsData.styled';
import { CloseButton } from '../CloseButton';
import { AddAccessButton } from '../AddAccessButton';
import { OpenAddAccess } from '../AddAccessButton/AddAccessButton.styled';
import { ChangeEmailAccess } from '../ChangeEmailAccess';
// import { useEmailsData } from './hooks/useEmailsData';

type ResponseData = {
  status: string;
  message: string;
  code: number;
  data: {
    newEmail: {
      email: string;
      access: [
        objects: boolean,
        languages: boolean,
        statistics: boolean,
        finance: boolean,
        blog: boolean
      ];
      status: string;
      id: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export const EmailsData = ({emails}: {emails: any}) => {
  const token = useAppSelector((state: RootState) => state.enterToken.token);
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItems] = useState<any>()

  const [banClicked, setBanClicked] = useState(false);

  const queryClient = useQueryClient()

  const handleLogout = async () => {
    try {
      await axios.get(
        'https://server-your-price-booking.onrender.com/api/acsess-to-admin/log-out-admin',
        {
          headers: {
            Authorization: `Bearer ${token ?? ''}`,
          },
        }
      );
      dispatch(setToken(null));
    } catch (error) {
      console.error('Помилка під час виходу з акаунта', error);
    }
  };

  const handleChangeBanStatus = async (email: any) => {
    try {
      const response: AxiosResponse<ResponseData> = await axios.patch(
        'https://server-your-price-booking.onrender.com/api/acsess-to-admin/change-status',
        {
          email,
          status: banClicked ? 'active' : 'not active',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token ?? ''}`,
          },
        }
      );

      const { status } = response.data;

      return status === 'success';
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const mutation = useMutation({
    mutationFn: handleChangeBanStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailsData'] });
    },
  });

  const handleBanClick = async (email: any ) => {
    setBanClicked(!banClicked)
    if (email.access.length === 0) {
      setSelectedItems(email.email);
    }
    mutation.mutate(email.email)
  };

  const handleOpen = (email: any) => {
    setSelectedItems(email)
  }

  const closeChangeAccess = () => {
    setSelectedItems(null);

  }

  return (
    <EmailsDataPageStyled>
      <EmailsMainStyled>
        <EmailMainHeaderStyled>
          <p>Email</p>
          <div className="check-name">
            <p>
              Objects
              <br />
              Verification
            </p>
            <p>Finance</p>
            <p>Statistics </p>
            <p>
              Adding a languages <br /> Adding a countrys <br /> Location registers: <br /> 1, 2, 3
            </p>
            <p>Blog</p>
            <p>Mowgli Booking</p>
          </div>
        </EmailMainHeaderStyled>

        {emails.map((email: any) => (
          <>
            <EmailMainBodyStyled key={email.id}>
              <p className="email">{email.email}</p>
              <ActiveBlock>
                <p style={email.status === 'not active' ? { color: '#FF6A6A' } : {}}>
                  {email.status}
                </p>
                <div className="buttons">
                  <ButtonBan
                    type="button"
                    style={{ fontSize: '10.2093px' }}
                    onClick={() => handleBanClick(email)}
                  >
                    {email.status !== 'active' ? 'Lift the ban' : 'ban'}
                  </ButtonBan>
                  <ButtonChange
                    type="button"
                    style={{ fontSize: '10.2093px' }}
                    onClick={() => handleOpen(email.email)}
                  >
                    change
                  </ButtonChange>
                </div>
              </ActiveBlock>
              <div className="checkboxs">
                <p>{email.access.includes('Objects Verification') ? <CheckedStyle /> : ''}</p>
                <p>{email.access.includes('Finance') ? <CheckedStyle /> : ''}</p>
                <p>
                  {email.access.includes('Statistics and access to cabinets') ? (
                    <CheckedStyle />
                  ) : (
                    ''
                  )}
                </p>
                <p>
                  {email.access.includes(
                    'Adding a languages Adding a country`s Location registers'
                  ) ? (
                    <CheckedStyle />
                  ) : (
                    ''
                  )}
                </p>
                <p>{email.access.includes('Blog') ? <CheckedStyle /> : ''}</p>
                <p>{email.access.includes('Mowgli Booking') ? <CheckedStyle /> : ''}</p>
              </div>
            </EmailMainBodyStyled>
            {selectedItem === email.email && (
              <OpenAddAccess>
                <ChangeEmailAccess selectedEmail={email} onClick={closeChangeAccess} />
              </OpenAddAccess>
            )}
          </>
        ))}
        <div className="button-styled">
          <AddAccessButton />
        </div>
      </EmailsMainStyled>
      <CloseButton onClick={handleLogout} src="CloseButton.png" direction="/menu" />
    </EmailsDataPageStyled>
  );
};
