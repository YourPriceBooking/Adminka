import { useState } from "react";
import { RegisterButton } from "../RegisterButton/RegisterButton";
import { ListBtn } from "./ListButton.styled";

const titleButton = ['Location Register 1', 'Location Register 2', 'Location Register 3'];

export const ListButton = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(-1);

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index === activeButtonIndex ? -1 : index);
  };

  return (
    <ListBtn>
      {titleButton.map((title, index) => (
        <RegisterButton
          key={title}
          title={title}
          index={index}
          isActive={index === activeButtonIndex}
          onClick={() => handleButtonClick(index)}
        />
      ))}
    </ListBtn>
  );
};
