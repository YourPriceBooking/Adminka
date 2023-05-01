import { useNavigate } from 'react-router-dom';
import { CloseButtonStyled } from './CloseButton.styled';

type Props = {
  direction: string
}

export const CloseButton = ({direction}: Props) => {
    const navigate = useNavigate()
    const closePage = () => {
 navigate(direction); 
    }
    return (
      <CloseButtonStyled onClick={closePage}>
        <img width="20" height="20" src="CloseButton.png" alt="Close button" />
      </CloseButtonStyled>
    );}

