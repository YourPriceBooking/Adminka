import { App } from 'App';
import {
  CountryPage,
  LoginPage,
  MenuPage,
  VerificationPage,
  VerificationCabinetPage,
  AdminPageAccess,
} from 'pages';


export const routes = {
  login: { path: '/', name: 'Login', element: { App, LoginPage } },
  menu: { path: '/menu', name: 'Menu', element: MenuPage },
  country: { path: '/countries', name: 'Countries', element: CountryPage },

  verification: {
    path: { verification: '/verification', verificationId: '/verification/:verificationId' },
    name: 'Objects Verification',
    element: { VerificationCabinetPage, VerificationPage },
  },
  finance: { path: '/finance', name: 'Finance', element: null },
  statistics: { path: '/statistics', name: 'Statistics and access to cabinets', element: null },
  adminPageAccess: {
    path: '/admin-page-access',
    name: 'Access to the administrative directory',
    element: AdminPageAccess,
  },
  blog: { path: '/blog', name: 'Blog', element: null }
};
