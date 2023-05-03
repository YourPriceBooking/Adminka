import { AddAccessButtonStyled } from "./AddAccessButton.styled";

export const AddAccessButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <AddAccessButtonStyled {...props}>
    <span>+</span>
    <p>
      Add <br /> access
    </p>
  </AddAccessButtonStyled>
);