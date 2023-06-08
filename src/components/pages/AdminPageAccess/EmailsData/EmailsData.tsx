import { useAppSelector } from 'App';
import type { RootState } from 'App/store';
import {
  EmailsDataPageStyled,
  EmailsMainStyled,
  EmailMainHeaderStyled,
  EmailMainBodyStyled,
  ActiveBlock,
  CheckedStyle
} from './EmailsData.styled';
import { CloseButton } from '../CloseButton';
import { AddAccessButton } from '../AddAccessButton';

export const EmailsData = () => {
  const emails = useAppSelector((state: RootState) => state.access.emails);

  function generateUniqueKey(): number {
    return Math.random();
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
            <p className='email'>{email.email}</p>
            <ActiveBlock>
              <p>Active</p>
              <div className='buttons'>
              <button type="button">ban</button>
              <button type="button">change</button>
              </div>
            </ActiveBlock>
            <div className='checkboxs'>
            <p>{email.objects ? <CheckedStyle/> : ''}</p>
            <p> {email.languages ? <CheckedStyle/> : ''}</p>
            <p>{email.statistics ? <CheckedStyle/> : ''}</p>
            <p> {email.finance ? <CheckedStyle/> : ''}</p>
            <p>{email.blog ? <CheckedStyle/> : ''}</p>
            </div>
          </EmailMainBodyStyled>
        ))}
        <div className='button-styled'>
        <AddAccessButton />
        </div>
      </EmailsMainStyled>
      <CloseButton src="CloseButton.png" direction="/admin-page-access" />
    </EmailsDataPageStyled>
  );
};
