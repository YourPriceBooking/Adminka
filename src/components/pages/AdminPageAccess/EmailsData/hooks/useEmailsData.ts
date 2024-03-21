import { useQuery } from 'react-query';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useState } from 'react';
import { useAppSelector } from 'App';
import type { RootState } from 'App/store';

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

export const useEmailsData = () => {
  const [emails, setEmails] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = useAppSelector((state: RootState) => state.enterToken.token);

  const fetchEmailsData = async () => {
    try {
      const response: AxiosResponse<ResponseData[]> = await axios.get(
        'https://ypbooking.chost.com.ua/api/acsess-to-admin/get-all-admin',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token!}`,
          },
        }
      );

      const { data } = response;

      setEmails(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Error fetching data');
      setLoading(false);
    }
  };

  useQuery({ queryKey: ['emailsData'], queryFn: fetchEmailsData });

  return { emails, loading, error };
};
