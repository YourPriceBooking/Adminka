import { AdminAccess } from "./AdminPageAccess.styled";
import { AdminAccessHeader } from "./AdminAccessHeader/AdminAccessHeader";
import { AdminEmail } from "./AdminEmail/AdminEmail";

export const AdminPageAccess = () => (
  <AdminAccess>
    <AdminAccessHeader />
    <AdminEmail/>
  </AdminAccess>
);
