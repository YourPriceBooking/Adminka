import { useEffect, useState } from 'react';
import { Button, TitleBtn, Wrapper } from './RegisterButton.styled';
import { ModalButton } from '../ModalButton/ModalButton';

type Props = {
  title: string;
  index: number;
  activeButtonIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeList?: (data: { elData?: any[]; type: string }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
