
import { Button } from "./RegisterButton.styled";

type Props = {
  title: string;
}

export const RegisterButton: React.FC<Props> = ({ title }) => {
   
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): React.ReactNode | null => {
          const {target} = event;
        if (target instanceof HTMLButtonElement) {
          // eslint-disable-next-line
          alert('Кнопка була натиснута!');
        }
      return null;
    };

    
  return (
    <Button onClick={handleClick}>
     {title}
    </Button>
  );
};
