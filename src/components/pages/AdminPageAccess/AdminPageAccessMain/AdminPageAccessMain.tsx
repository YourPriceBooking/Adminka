
import { AdminAccessMainStyled } from './AdminPageAccessMain.styled';
import { EmailsData } from '../EmailsData';
import { AddAccessButton } from '../AddAccessButton';
import { useEmailsData } from '../EmailsData/hooks/useEmailsData';

export const AdminPageAccessMain = () => {
  const { emails, loading } = useEmailsData()


  if (loading) {
    return <p>Loading...</p>
  }

  if (emails?.data?.result) {
    return (
      <AdminAccessMainStyled>
          <EmailsData emails={emails?.data?.result} />
      </AdminAccessMainStyled>
    );
  } 
    return (
      <AdminAccessMainStyled>
      <AddAccessButton />
      </AdminAccessMainStyled>
    );
};
