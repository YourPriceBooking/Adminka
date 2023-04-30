import { Button, ModalWrapper, Text, Wrapper } from "./RegisterButton.styled";

type Props = {
    title: string;
    index: number;
  isActive: boolean;
  onClick: () => void;
};

const LocationRegister1 = [
  'Киев',
  'Киев Подол',
  'Киев Центр',
  'Переяслав-Хмельницький Центр'
];

const LocationRegister2 = ['Київ', 'Харків', 'Хмельницький', 'Рівне'];
const LocationRegister3 = ['Київ', 'Львів', 'Кривий Ріг', 'Чернігів'];

export const RegisterButton: React.FC<Props> = ({ title, index, isActive, onClick }) => (
  <Wrapper>
    <Button onClick={onClick}>{title}</Button>
    {isActive && index === 0 && (
      <ModalWrapper>
        {LocationRegister1.map(el => (
          <Text>{el}</Text>
        ))}
      </ModalWrapper>
    )}
    {isActive && index === 1 && (
      <ModalWrapper>
        {LocationRegister2.map(el => (
          <Text>{el}</Text>
        ))}
      </ModalWrapper>
    )}
    {isActive && index === 2 && (
      <ModalWrapper>
        {LocationRegister3.map(el => (
          <Text>{el}</Text>
        ))}
      </ModalWrapper>
    )}
  </Wrapper>
);
