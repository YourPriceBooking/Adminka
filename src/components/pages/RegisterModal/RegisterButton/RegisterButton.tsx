import { useState } from "react";
import { Button, ModalWrapper, Text, Wrapper } from "./RegisterButton.styled";

type Props = {
  title: string;
  index: number;
  activeButtonIndex: number;
  setActiveButtonIndex: React.Dispatch<React.SetStateAction<number>>;
};

const LocationRegister1 = [
  'Киев',
  'Киев Подол',
  'Киев Центр',
  'Переяслав-Хмельницький Центр',
  'Киев',
  'Киев Подол',
  'Киев Центр',
];

const LocationRegister2 = [
  'Київ',
  'Харків',
  'Хмельницький',
  'Рівне',
  'Київ',
  'Харків',
  'Хмельницький',
  'Рівне',
];
const LocationRegister3 = [
  'Київ',
  'Львів',
  'Кривий Ріг',
  'Чернігів',
  'Київ',
  'Львів',
  'Кривий Ріг',
  'Чернігів',
];

export const RegisterButton: React.FC<Props> = ({
  title,
  index,
  activeButtonIndex,
  setActiveButtonIndex,
}) => {
  const [NameCountry, setNameCountry] = useState<string | null>(null);

  const handleClick = (el: string) => {
    setNameCountry(el);
    setActiveButtonIndex(-1);
  };

  return (
    <Wrapper>
      <Button tabIndex={index}>
        {NameCountry && NameCountry}
        {NameCountry && <p style={{ position: 'absolute', top: '-16px' }}>{title}</p>}
        {!NameCountry && title}
      </Button>
      {index === activeButtonIndex && title === 'Location Register 1' && (
        <ModalWrapper>
          {LocationRegister1.map(el => (
            <Text key={el} onClick={() => handleClick(el)}>
              {el}
            </Text>
          ))}
        </ModalWrapper>
      )}
      {index === activeButtonIndex && title === 'Location Register 2' && (
        <ModalWrapper>
          {LocationRegister2.map(el => (
            <Text key={el} onClick={() => handleClick(el)}>
              {el}
            </Text>
          ))}
        </ModalWrapper>
      )}
      {index === activeButtonIndex && title === 'Location Register 3' && (
        <ModalWrapper>
          {LocationRegister3.map(el => (
            <Text key={el} onClick={() => handleClick(el)}>
              {el}
            </Text>
          ))}
        </ModalWrapper>
      )}
    </Wrapper>
  );
};



// import { useState } from 'react';
// import { Button, ListBtn, ModalWrapper, Text, Wrapper } from './RegisterButton.styled';



// const LocationRegister1 = ['Киев', 'Киев Подол', 'Киев Центр', 'Переяслав-Хмельницький Центр'];

// const LocationRegister2 = ['Київ', 'Харків', 'Хмельницький', 'Рівне'];
// const LocationRegister3 = ['Київ', 'Львів', 'Кривий Ріг', 'Чернігів'];


// // const titleButton = ['Location Register 1', 'Location Register 2', 'Location Register 3'];

// export const RegisterButton = (): JSX.Element => {
//     const [NameCountry, setNameCountry] = useState<string>('');
//       const [isActiveButton, setIsActiveButton] = useState<boolean>(false);
//       const [titleButton, setTitleButton] = useState<string | null>('');

// console.log('titleButton :>> ', titleButton);
    
//     const handleButtonClick = (event: React.MouseEvent<HTMLUListElement>): void => {
//   const {target} = event;
//   if (target instanceof HTMLButtonElement) {
//     setIsActiveButton(!isActiveButton);
//     setTitleButton(target.textContent);
//   }
//     };
  
//     const handleClick = (el: string) => {
//       setNameCountry(el);
      
//   };
  

//     return (
//       <ListBtn onClick={handleButtonClick}>
//         <Wrapper>
//           <Button>
//             {NameCountry && NameCountry}
//             {NameCountry && (
//               <p style={{ position: 'absolute', top: '-16px' }}>Location Register 1</p>
//             )}
//             {!NameCountry && 'Location Register 1'}
//           </Button>
//           {isActiveButton && titleButton === 'Location Register 1' && (
//             <ModalWrapper>
//               {LocationRegister1.map(el => (
//                 <Text key={el} onClick={() => handleClick(el)}>
//                   {el}
//                 </Text>
//               ))}
//             </ModalWrapper>
//           )}
//         </Wrapper>
//         <Wrapper>
//           <Button>
//             {NameCountry && NameCountry}
//             {NameCountry && (
//               <p style={{ position: 'absolute', top: '-16px' }}>Location Register 2</p>
//             )}
//             {!NameCountry && 'Location Register 2'}
//           </Button>
//           {isActiveButton && titleButton === 'Location Register 2' && (
//             <ModalWrapper>
//               {LocationRegister2.map(el => (
//                 <Text key={el} onClick={() => handleClick(el)}>
//                   {el}
//                 </Text>
//               ))}
//             </ModalWrapper>
//           )}
//         </Wrapper>
//         <Wrapper>
//           <Button>
//             {NameCountry && NameCountry}
//             {NameCountry && (
//               <p style={{ position: 'absolute', top: '-16px' }}>Location Register 3</p>
//             )}
//             {!NameCountry && 'Location Register 3'}
//           </Button>
//           {isActiveButton && titleButton === 'Location Register 3' && (
//             <ModalWrapper>
//               {LocationRegister3.map(el => (
//                 <Text key={el} onClick={() => handleClick(el)}>
//                   {el}
//                 </Text>
//               ))}
//             </ModalWrapper>
//           )}
//         </Wrapper>
//       </ListBtn>
//     );
// }

