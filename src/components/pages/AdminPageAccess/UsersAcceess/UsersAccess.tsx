import {
  UsersAccessStyledMain,
  UsersAccessHeader,
  CheckboxName,
  Line,
  AddAccessButtonOption,
  UsersAccessStyledPlace,
} from './UsersAccess.styled';
import { AddAccessButton } from '../AddAccessButton';
import { CloseButton } from '../CloseButton';
import { UsersAccessBody } from './UsersAccessBody';

export const UsersAccess = () => (
  <UsersAccessStyledPlace>
    <UsersAccessStyledMain>
      <UsersAccessHeader>
        <p>Email</p>
        <CheckboxName>
          <p>
            Objects
            <br />
            Verification
          </p>
          <p>
            Adding a languages
            <br /> Adding a countrys
            <br /> Location registers:
            <br /> 1, 2, 3
          </p>
          <p>Statistics </p>
          <p>Finance</p>
          <p>Blog</p>
        </CheckboxName>
      </UsersAccessHeader>
      <Line />
      <UsersAccessBody />
      <AddAccessButtonOption>
        <AddAccessButton />
      </AddAccessButtonOption>
    </UsersAccessStyledMain>
    <CloseButton src="CloseButton.png" direction="/admin-page-access" />
  </UsersAccessStyledPlace>
);