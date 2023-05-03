import { useNavigate } from 'react-router-dom';
import { CloseButtonStyled } from './CloseButton.styled';

interface Props {
  direction: string;
  onClick?: () => void;
}

export const CloseButton = ({direction, onClick}: Props) => {
    const navigate = useNavigate()
    const closePage = () => {
      navigate(direction); 
      if (onClick) {
        onClick();
      }
    }
    return (
      <CloseButtonStyled onClick={closePage}>
        <img width="20" height="20" src="CloseButton.png" alt="Close button" />
      </CloseButtonStyled>
    );}

