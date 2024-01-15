import { useEffect, useState } from 'react';
import { Button, TitleBtn, Wrapper } from './RegisterButton.styled';
import { ModalButton } from '../ModalButton/ModalButton';

type Props = {
  title: string;
  index: number;
  activeButtonIndex: number;
  closeList?: (data: { elData?: any[]; type: string }) => void;
  data?: string | any[] | null;
};

export const RegisterButton: React.FC<Props> = ({
  title,
  index,
  activeButtonIndex,
  closeList,
  data = null,
}) => {
  const [NameCountry, setNameCountry] = useState<string | null>(null);

  const handleClick = ({
    elTitle,
    elData,
    type,
  }: {
    elTitle: string;
    elData?: any[];
    type: string;
  }) => {
    setNameCountry(elTitle);
    if (closeList) {
      closeList({ type, elData });
    }
  };

  const isArray = Array.isArray(data);

  useEffect(() => {
    if (!isArray) {
      setNameCountry(data);
    }
  }, []);

  return (
    <Wrapper>
      <Button tabIndex={index}>
        {NameCountry && NameCountry}
        {NameCountry ? <TitleBtn>{title}</TitleBtn> : title}
      </Button>
      {index === activeButtonIndex && (
        <ModalButton title={title} onClick={handleClick} data={isArray ? data : []} />
      )}
    </Wrapper>
  );
};
