import styled from 'styled-components/macro';

export const BackdropStyled = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;

  padding: 100px 20px;
  overflow-y: scroll;

  backdrop-filter: blur(15px);
  background-color: $colors-bg-button-cancel-delete-hover;
  opacity: 0.99;

  transition: $transition;
  transition-property: visibility, opacity, transform;

  &.isHidden {
    opacity: 0;
    visibility: hidden;
  }
`;

export const ModalStyled = styled.div`
  position: relative;
  width: clamp(250px, 100%, 295px);
  min-height: 277px;
  padding: 38px 30px;
  margin: auto;

  background-color: $colors-white;
  border-radius: 4px;
  box-shadow: $box-shadow-modal;

  transition: $transition;
  transition-property: transform;

  &.isHidden {
    transform: scale(1.08);
  }
`;

export const CloseModalButtonStyled = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  padding: 0;

  color: $colors-text-third;
  fill: currentColor;

  background-color: $colors-bg-button-edit;
  border: 1px solid transparent;
  border-radius: 50%;

  transition: $transition;
  transition-property: color, background-color;

  &:hover:not(:disabled) {
    color: $colors-text-accent;
    background-color: $colors-bg-button-edit-hover;
  }

  &:active:not(:disabled) {
    color: $colors-text-accent;
    background-color: $colors-bg-button-edit-active;
    border-color: white;
  }
`;
