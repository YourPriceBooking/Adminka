import { UsersAccessBodyStyled, EmailOption, CheckboxOption, Line } from './UsersAccessBody.styled';
import { EmailCheckbox } from '../../EmailCheckbox';

export const UsersAccessBody = () => (
    <>
  <UsersAccessBodyStyled>
    <span>pricebooking@ukr.net</span>
    <EmailOption>
      <p>Active</p>
      <button type="button">ban</button>
      <button type="button">change</button>
    </EmailOption>
    <CheckboxOption>
      <EmailCheckbox />
        </CheckboxOption>
    </UsersAccessBodyStyled>
     <Line/>
    </>
);