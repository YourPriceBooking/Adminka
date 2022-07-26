import { lazy } from 'react';
import { App } from 'App';
import LoginPage from 'pages/LoginPage';

const MenuPage = lazy(() => import('pages/MenuPage'));
const AddCountryPage = lazy(() => import('pages/AddCountryPage'));

export const routes = {
  login: { path: '/', name: 'Login', element: { App, LoginPage } },
  menu: { path: '/menu', name: 'Menu', element: MenuPage },
  country: { path: '/country/:id', name: 'Страны', element: AddCountryPage },

  verification: { path: '/verification', name: 'Верификация', element: null },
  translators: { path: '/translators', name: 'Переводчики', element: null },
  statistics: { path: '/statistics', name: 'Статистика', element: null },
  adminPageAccess: {
    path: '/admin-page-access',
    name: 'Доступы в админку',
    element: null,
  },
};
