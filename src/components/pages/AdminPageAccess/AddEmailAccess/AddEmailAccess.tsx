import {
  AddEmailAccessStyled,
  AddEmailAccessInput,
  AddEmailAccessButtonStyled,
  AddEmailAccessMainDiv,
} from './AddEmailAccess.styled';
import { CloseButton } from '../CloseButton';

type Props = {
  onClick?: () => void;
}

export const AddEmailAccess = ({onClick}: Props) => (
    <AddEmailAccessMainDiv>
      <AddEmailAccessStyled>
        <form>
          <p>Enter Email</p>
          <AddEmailAccessInput type="email" id="email" name="email" required />
        </form>
        <AddEmailAccessButtonStyled>Add Access</AddEmailAccessButtonStyled>
      </AddEmailAccessStyled>
      <CloseButton onClick={onClick} direction="/admin-page-access-main" />
    </AddEmailAccessMainDiv>
  );