 
import { useQuery } from "react-query";
import type { AxiosResponse } from "axios";
import axios from "axios"
import { useState } from "react"

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

  const fetchEmailsData = async () => {
    try {
      const response: AxiosResponse<ResponseData[]> = await axios.get(
        'https://server-your-price-booking.onrender.com/api/acsess-to-admin/get-all-admin'
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

  const query = useQuery({ queryKey: ['emailsData'], queryFn: fetchEmailsData });

  console.log(query)

  return { emails, loading, error };
};