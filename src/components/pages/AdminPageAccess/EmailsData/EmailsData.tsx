import { useAppSelector } from 'App';
import type { RootState } from 'App/store';
// import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AddEmailAccess } from '../AddEmailAccess';
import {
  EmailsDataPageStyled,
  EmailsMainStyled,
  EmailMainHeaderStyled,
  EmailMainBodyStyled,
  ActiveBlock,
} from './EmailsData.styled';
import { CloseButton } from '../CloseButton';
import { AddAccessButton } from '../AddAccessButton';

export const EmailsData = () => {
  const emails = useAppSelector((state: RootState) => state.access.emails);
  const [showAddEmailAccess, setShowAddEmailAccess] = useState(false);

  //   const navigate = useNavigate();

  function generateUniqueKey(): number {
    return Math.random();
  }

  const openAddEmailAccess = () => {
    setShowAddEmailAccess(true);
  };

  const closeAddEmailAccess = () => {
    setShowAddEmailAccess(false);
  };

  //   const addNewData = () => {
  //     navigate('/admin-page-access-main');
  //   };

  console.log(emails);
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
            <p>
              Adding a languages <br /> Adding a countrys <br /> Location registers: <br /> 1, 2, 3
            </p>
            <p>Statistics </p>
            <p>Finance</p>
            <p>Blog</p>
          </div>
        </EmailMainHeaderStyled>

        {emails.map(email => (
          <EmailMainBodyStyled key={generateUniqueKey()}>
            <p>{email.email}</p>
            <ActiveBlock>
              <p>Active</p>
              <button type="button">ban</button>
              <button type="button">change</button>
            </ActiveBlock>
            <p>Objects: {email.objects ? 'Checked' : 'Unchecked'}</p>
            <p>Languages: {email.languages ? 'Checked' : 'Unchecked'}</p>
            <p>Statistics: {email.statistics ? 'Checked' : 'Unchecked'}</p>
            <p>Finance: {email.finance ? 'Checked' : 'Unchecked'}</p>
            <p>Blog: {email.blog ? 'Checked' : 'Unchecked'}</p>
          </EmailMainBodyStyled>
        ))}
        <AddAccessButton onClick={openAddEmailAccess} />
      </EmailsMainStyled>
      <CloseButton src="CloseButton.png" direction="/admin-page-access-main" />
      {showAddEmailAccess && <AddEmailAccess />}
    </EmailsDataPageStyled>
  );
};








