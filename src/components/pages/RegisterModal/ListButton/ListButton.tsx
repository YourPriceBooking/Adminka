import { RegisterButton } from "../RegisterButton/RegisterButton";
import { ListBtn } from "./ListButton.styled";

const titleButton = ['Location Register 1', 'Location Register 2', 'Location Register 3'];


export const ListButton = () => (
  <ListBtn>
    {titleButton.map(title => (
        <RegisterButton key={ title} title={title} />
    ))}
  </ListBtn>
);
