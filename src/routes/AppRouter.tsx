import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectIsLoggedIn } from 'redux/slices';
import { AnimatedContainer } from 'components/shared/AppRouter/AnimatedContainer';

import LoginPage from 'pages/LoginPage';

const AddCountryPage = lazy(() => import('pages/AddCountryPage'));
const MenuPage = lazy(() => import('pages/MenuPage'));

type RouteType = {
  navigateTo?: string;
};

const PrivateRoute = ({ navigateTo = '/' }: RouteType) => {
  const auth = useAppSelector(selectIsLoggedIn);
  const { pathname } = useLocation();
  return !auth ? <Navigate to={navigateTo} replace state={{ from: pathname }} /> : <Outlet />;
};

export const routes = {
  login: { path: '/', name: 'Login', Component: { Layout, LoginPage } },
  menu: { path: '/menu', name: 'Menu', Component: MenuPage },
  country: { path: '/country/:id', name: 'Страны', Component: AddCountryPage },

  verification: { path: '/verification', name: 'Верификация', Component: null },
  translators: { path: '/translators', name: 'Переводчики', Component: null },
  statistics: { path: '/statistics', name: 'Статистика', Component: null },
  adminPageAccess: {
    path: '/admin-page-access',
    name: 'Доступы в админку',
    Component: null,
  },
};

export const AppRouter = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location === displayLocation) return;

    setShow(false);
  }, [location, displayLocation]);

  const onAnimationEnd = () => {
    if (!show) return;
    setShow(true);
    setDisplayLocation(location);
  };

  return (
    <AnimatedContainer className={show ? 'fadeOut' : 'fadeIn'} onAnimationEnd={onAnimationEnd}>
      <Suspense>
        <Routes>
          <Route path={routes.login.path} element={<routes.login.Component.Layout />}>
            <Route index element={<routes.login.Component.LoginPage />} />

            <Route element={<PrivateRoute />}>
              <Route path={routes.menu.path} element={<routes.menu.Component />} />
              <Route path={routes.country.path} element={<routes.country.Component />} />
              {/* <Route path="/location" element={<Location />} /> */}
            </Route>
          </Route>

          <Route path="*" element={<Navigate to={routes.login.path} replace />} />
        </Routes>
      </Suspense>
    </AnimatedContainer>
  );
};
