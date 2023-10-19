import { useState } from 'react';
import { AddAccessButtonStyled, OpenAddAccess } from './AddAccessButton.styled';
import { AddEmailAccess } from '../AddEmailAccess';

export const AddAccessButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const addNewData = () => {
    setIsOpen(true)
  
  };

  const closeAddAccess = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AddAccessButtonStyled onClick={addNewData}>
        <span>+</span>
        <p>
          Add <br /> access
        </p>
      </AddAccessButtonStyled>
      {isOpen && (
        <OpenAddAccess>
          <AddEmailAccess onClick={closeAddAccess} />
        </OpenAddAccess>
      )}
    </>
  );
};
