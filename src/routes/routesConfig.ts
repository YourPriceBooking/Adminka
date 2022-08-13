import { App } from 'components/App';
import { AddCountryPage, LoginPage, MenuPage } from 'pages';

export const routes = {
  login: { path: '/', name: 'Login', element: { App, LoginPage } },
  menu: { path: '/menu', name: 'Menu', element: MenuPage },
  country: { path: '/countries', name: 'Страны', element: AddCountryPage },

  verification: { path: '/verification', name: 'Верификация', element: null },
  translators: { path: '/translators', name: 'Переводчики', element: null },
  statistics: { path: '/statistics', name: 'Статистика', element: null },
  adminPageAccess: {
    path: '/admin-page-access',
    name: 'Доступы в админку',
    element: null,
  },
};
