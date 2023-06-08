import { useState } from 'react';
import { AddAccessButtonStyled, OpenAddAccess } from './AddAccessButton.styled';
import { AddEmailAccess } from '../AddEmailAccess';

export const AddAccessButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openAddAccess = () => {
    setIsOpen(true);
  };

  const closeAddAccess = () => {
    setIsOpen(false);
  };

  return (
    <>
      <AddAccessButtonStyled onClick={openAddAccess}>
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
