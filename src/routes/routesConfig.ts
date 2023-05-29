import { App } from 'App';
import {
  CountryPage,
  LoginPage,
  MenuPage,
  VerificationPage,
  VerificationCabinetPage,
  AdminPageAccess,
  AdminPageAccessMain,
  StatisticPage,
  FinancePage,
  Blog,
} from 'pages';
import RegisterModalPage from 'pages/RegisterModalPage';

export const routes = {
  login: { path: '/', name: 'Login', element: { App, LoginPage } },
  menu: { path: '/menu', name: 'Menu', element: MenuPage },
  country: { path: '/countries', name: 'Countries', element: CountryPage },

  verification: {
    path: { verification: '/verification', verificationId: '/verification/:verificationId' },
    name: 'Objects Verification',
    element: { VerificationCabinetPage, VerificationPage },
  },
  finance: { path: '/finance', name: 'Finance', element: FinancePage },
  statistics: {
    path: '/statistics',
    name: 'Statistics and access to cabinets',
    element: StatisticPage,
  },
  adminPageAccess: {
    path: '/admin-page-access',
    name: 'Access to the administrative directory',
    element: AdminPageAccess,
  },
  adminPageAccessMain: {
    path: '/admin-page-access-main',
    name: 'Access to the administrative directory',
    element: AdminPageAccessMain,
  },
  blog: { path: '/blog', name: 'Blog', element: Blog },
  registerModal: { path: '/registerModal', name: 'registerModal', element: RegisterModalPage },
};
