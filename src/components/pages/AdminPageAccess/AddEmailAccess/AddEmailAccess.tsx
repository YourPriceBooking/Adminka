import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useAppSelector } from 'App';
import type { RootState } from 'App/store';
import { useQueryClient, useMutation } from 'react-query';
import {
  AddEmailAccessStyled,
  AddEmailAccessInput,
  AddEmailAccessButtonStyled,
  AddEmailAccessMainDiv,
  MainDiv,
} from './AddEmailAccess.styled';
import { CloseButton } from '../CloseButton';
import { EmailCheckbox } from '../EmailCheckbox';

type Props = {
  onClick?: () => void;
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

export const AddEmailAccess = ({ onClick }: Props) => {
  const [email, setEmail] = useState('');
  const [objectsChecked, setObjectsChecked] = useState(false);
  const [languagesChecked, setLanguagesChecked] = useState(false);
  const [statisticsChecked, setStatisticsChecked] = useState(false);
  const [financeChecked, setFinanceChecked] = useState(false);
  const [blogChecked, setBlogChecked] = useState(false);
  const [mowgliBookingChecked, setMowgliBookingChecked] = useState(false);

  const token = useAppSelector((state: RootState) => state.enterToken.token);

  const queryClient = useQueryClient();

  const addNewEmailAccess = async () => {
    try {
      const response: AxiosResponse<ResponseData> = await axios.post(
        'https://server-your-price-booking.onrender.com/api/acsess-to-admin/add-email',
        {
          email,
          access: [
            objectsChecked && 'Objects Verification',
            financeChecked && 'Finance',
            statisticsChecked && 'Statistics and access to cabinets',
            languagesChecked && 'Access to the administrative directory',
            blogChecked && 'Blog',
            mowgliBookingChecked && 'Mowgli Booking'
          ].filter(Boolean),
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
      console.error('Помилка під час додавання емейла', error);
      return false;
    }
  }

  const mutation = useMutation({
    mutationFn: addNewEmailAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['emailsData']})
    }
  })

  const handleAddEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    mutation.mutate()

  };

  return (
    <MainDiv>
      <form onSubmit={handleAddEmail}>
        <AddEmailAccessMainDiv>
          <AddEmailAccessStyled>
            <label htmlFor='email'>Enter Email</label>
            <AddEmailAccessInput
              type="email"
              id="email"
              name="email"
              required
              onChange={e => setEmail(e.target.value)}
            />
            <AddEmailAccessButtonStyled type="submit" disabled={!((objectsChecked || languagesChecked || financeChecked || blogChecked || statisticsChecked))}>Add Access</AddEmailAccessButtonStyled>
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
      <CloseButton
        src="CloseButtonWhite.png"
        onClick={onClick}
        direction="/admin-page-access"
      />
    </MainDiv>
  );
};
