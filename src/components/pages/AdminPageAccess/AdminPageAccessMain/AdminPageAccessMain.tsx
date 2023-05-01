import { AddAccessButton } from "../AddAccessButton";
import { CloseButton } from "../CloseButton";
import { AdminAccessMainStyled } from "./AdminPageAccessMain.styled";

export const AdminPageAccessMain = () => (
  <AdminAccessMainStyled>
    <AddAccessButton />
    <CloseButton direction="/admin-page-access" />
  </AdminAccessMainStyled>
);
