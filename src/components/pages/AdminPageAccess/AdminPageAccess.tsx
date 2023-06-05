// import { AdminAccess } from "./AdminPageAccess.styled";
// import { AdminAccessHeader } from "./AdminAccessHeader/AdminAccessHeader";
// import { AdminEmail } from "./AdminEmail/AdminEmail";
import { InputEmail } from '../Access/InputEmail';
import { AdminPageAccessMain } from './AdminPageAccessMain';

// export const AdminPageAPage = () => (
//   <AdminAccess>
//     <AdminAccessHeader />
//     <AdminEmail/>
//   </AdminAccess>
// );

export const AdminPageAccess = () => <InputEmail component={AdminPageAccessMain} />;
