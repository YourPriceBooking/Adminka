import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useAppSelector } from 'App';
import type { RootState } from 'App/store';
import { useMutation, useQueryClient } from 'react-query';
import {
  AddEmailAccessStyled,
  AddEmailAccessInput,
  AddEmailAccessButtonStyled,
  AddEmailAccessMainDiv,
  MainDiv,
} from './ChangeEmailAccess.styled';
import { CloseButton } from '../CloseButton';
import { EmailCheckbox } from '../EmailCheckbox';

type Props = {
  onClick?: () => void;
  selectedEmail: any;
};

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
}

export const ChangeEmailAccess = ({ onClick, selectedEmail }: Props) => {
  const [objectsChecked, setObjectsChecked] = useState(
    !!selectedEmail?.access[0]
  );
  const [languagesChecked, setLanguagesChecked] = useState(
    !!selectedEmail?.access[1]
  );
  const [statisticsChecked, setStatisticsChecked] = useState(
    !!selectedEmail?.access[2]
  );
   
  const [financeChecked, setFinanceChecked] = useState(!!selectedEmail?.access[3]);
   
  const [blogChecked, setBlogChecked] = useState(!!selectedEmail?.access[4]);

  const [mowgliBookingChecked, setMowgliBookingChecked] = useState(!!selectedEmail?.access[5]);

  const token = useAppSelector((state: RootState) => state.enterToken.token);

  const queryClient = useQueryClient()

  const handleChangeEmailAccess = async () => {
    if (!(objectsChecked || languagesChecked || financeChecked || blogChecked || statisticsChecked)) {
      try {
        const response: AxiosResponse<ResponseData> = await axios.patch(
          'https://server-your-price-booking.onrender.com/api/acsess-to-admin/change-status',
          {
            email: selectedEmail.email,
            status: 'not active',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token ?? ''}`,
            },
          }
        );

        // const { status, message, code, data: responseData } = response.data;
        const { status } = response.data;

        onClick?.();
        return status === 'success';
      } catch (error) {
        onClick?.();
        console.error('Помилка під час зміни доступу емейла', error);
        return false;
      }
    } else {
      try {
        const response: AxiosResponse<ResponseData> = await axios.patch(
          'https://server-your-price-booking.onrender.com/api/acsess-to-admin/change-access',
          {
            email: selectedEmail.email,
            access: [
              objectsChecked && 'Objects Verification',
              financeChecked && 'Finance',
              statisticsChecked && 'Statistics and access to cabinets',
              languagesChecked && 'Access to the administrative directory',
              blogChecked && 'Blog',
              mowgliBookingChecked && 'Mowgli Booking',
            ].filter(Boolean),
          },

          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token ?? ''}`,
            },
          }
        );

        await axios.patch(
          'https://server-your-price-booking.onrender.com/api/acsess-to-admin/change-status',
          {
            email: selectedEmail.email,
            status: 'active',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token ?? ''}`,
            },
          }
        );

        // const { status, message, code, data: responseData } = response.data;
        const { status } = response.data;

        onClick?.();
        return status === 'success';
      } catch (error) {
        onClick?.();
        console.error('Помилка під час зміни доступу емейла', error);
        return false;
      }
    }
  }

  const mutation = useMutation({
    mutationFn: handleChangeEmailAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailsData'] });
    },
  });



  const handleChangeEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    mutation.mutate()

  };

  return (
    <MainDiv>
      <form onSubmit={handleChangeEmail}>
        <AddEmailAccessMainDiv>
          <AddEmailAccessStyled>
            <label htmlFor="email">Enter Email</label>
            <AddEmailAccessInput
              type="email"
              id="email"
              name="email"
              required
              disabled
              value={selectedEmail.email}
            />
            <AddEmailAccessButtonStyled type="submit">Change Access</AddEmailAccessButtonStyled>
          </AddEmailAccessStyled>
          <EmailCheckbox
            objectsChecked={objectsChecked}
            setObjectsChecked={() => setObjectsChecked(!objectsChecked)}
            languagesChecked={languagesChecked}
            setLanguagesChecked={() => setLanguagesChecked(!languagesChecked)}
            statisticsChecked={statisticsChecked}
            setStatisticsChecked={() => setStatisticsChecked(!statisticsChecked)}
            financeChecked={financeChecked}
            setFinanceChecked={() => setFinanceChecked(!financeChecked)}
            blogChecked={blogChecked}
            setBlogChecked={() => setBlogChecked(!blogChecked)}
            mowgliBookingChecked={mowgliBookingChecked}
            setMowgliBookingChecked={() => setMowgliBookingChecked(!mowgliBookingChecked)}
          />
        </AddEmailAccessMainDiv>
      </form>
      <CloseButton src="CloseButtonWhite.png" onClick={onClick} direction="/admin-page-access" />
    </MainDiv>
  );
};
