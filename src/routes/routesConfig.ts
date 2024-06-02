import { App } from 'App';
import PostPage from 'components/pages/Blog/PostPage/PostPage';
import {
  CountryPage,
  LoginPage,
  MenuPage,
  VerificationPage,
  VerificationCabinetPage,
  AdminPageAccess,
  StatisticPage,
  FinancePage,
  Blog,
  Authors,
  AuthorsAdd,
  HousePageVerif,
  MowgliBookingStatisticPage,
  MowgliBookingFinancePage,
  MowgliBookingVerifPage,
} from 'pages';
import RegisterModalPage from 'pages/RegisterModalPage';
import mowgliBookingPage from 'pages/mowgliBooking';

export const routes = {
  login: { path: '/', name: 'Login', element: { App, LoginPage } },
  menu: { path: '/menu', name: 'Menu', element: MenuPage },
  country: { path: '/countries', name: 'Countries', element: CountryPage },

  verification: {
    path: {
      verification: '/verification',
      verificationId: '/verification/:verificationId',
      verificationPage: '/verification/house-page/:hotelId',
    },
    name: 'Objects Verification',
    element: { VerificationCabinetPage, VerificationPage, HousePageVerif },
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
  blog: { path: '/blog', name: 'Blog', element: Blog },
  authors: { path: '/blog/post/authors', name: 'Authors', element: Authors },
  authorsadd: { path: '/blog/author/add', name: 'AuthorsAdd', element: AuthorsAdd },
  post: { path: '/blog/post/:id', name: 'Post', element: PostPage },
  mowgliBooking: { path: '/mowgli-booking', name: 'Mowgli booking', element: mowgliBookingPage },
  registerModal: { path: '/registerModal', name: 'registerModal', element: RegisterModalPage },
  mowgliBookingStatistics: {
    path: '/mowgliBookingStatistics',
    name: 'Mowgli Booking Statistics',
    element: MowgliBookingStatisticPage,
  },
  mowgliBookingFinance: {
    path: '/mowgliBookingFinance',
    name: 'Mowgli Booking Finance',
    element: MowgliBookingFinancePage,
  },
  mowgliBookingVerif: {
    path: '/mowgliBookingVerif',
    name: 'Mowgli Booking Verif',
    element: MowgliBookingVerifPage,
  },
};
