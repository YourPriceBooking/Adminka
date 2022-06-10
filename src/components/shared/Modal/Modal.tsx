import { MouseEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import iconClose from 'assets/icons/iconClose.svg';

import { getRefs } from 'utils';
import { BackdropStyled, CloseModalButtonStyled, ModalStyled } from './Modal.styled';
const { modalRoot } = getRefs();

type ModalProps = {
  toggleModal: () => void;
  children: ReactNode;
};

export default function Modal({ toggleModal, children }: ModalProps) {
  const closeModalButtonRef = useRef<HTMLButtonElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const onEscCloseModal = ({ code }: KeyboardEvent) => {
      if (code !== 'Escape') return;
      toggleModal();
    };

    document.addEventListener('keydown', onEscCloseModal);
    setIsMounted(true);

    return () => {
      document.removeEventListener('keydown', onEscCloseModal);
    };
  }, [toggleModal]);

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = useCallback(
    e => {
      if (e.currentTarget !== e.target) return;
      toggleModal();
    },
    [toggleModal]
  );

  useEffect(() => {
    closeModalButtonRef.current?.focus();
  }, []);
  if (!modalRoot)
    return (
      <div>
        console.log('Add <div id="modal-root"></div> to index.html ')
      </div>
    );

  const className = isMounted ? '' : 'isHidden';

  return createPortal(
    <BackdropStyled className={className} onClick={handleBackdropClick}>
      <ModalStyled className={className}>
        <CloseModalButtonStyled onClick={toggleModal} type="button" ref={closeModalButtonRef}>
          <img src={iconClose} alt="close" />
        </CloseModalButtonStyled>

        {children}
      </ModalStyled>
    </BackdropStyled>,
    modalRoot
  );
}
