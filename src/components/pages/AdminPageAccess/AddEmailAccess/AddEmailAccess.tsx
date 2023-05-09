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
}

export const AddEmailAccess = ({ onClick }: Props) => (
    <MainDiv>
      <AddEmailAccessMainDiv>
        <AddEmailAccessStyled>
          <form>
            <p>Enter Email</p>
            <AddEmailAccessInput type="email" id="email" name="email" required />
          </form>
          <AddEmailAccessButtonStyled>Add Access</AddEmailAccessButtonStyled>
        </AddEmailAccessStyled>
        <EmailCheckbox />
      </AddEmailAccessMainDiv>
      <CloseButton
        src="CloseButtonWhite.png"
        onClick={onClick}
        direction="/admin-page-access-main"
      />
    </MainDiv>
);