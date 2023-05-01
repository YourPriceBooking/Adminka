import { CloseButton } from "../CloseButton";
import { AdminAccessHeaderStyled } from "./AdminAccessHeader.styled";

export const AdminAccessHeader = () => (
  <AdminAccessHeaderStyled>
    <img width="268" height="155.12" src="logo-adminka.png" alt="Logo" />
    <CloseButton direction="/menu" />
  </AdminAccessHeaderStyled>
);
