import { useLocation, Outlet } from 'react-router-dom';
import { AppBar } from 'components/shared/AppBar';
import { Suspense } from 'react';
import { routes } from 'routes/AppRouter';
import { Main } from './Layout.styled';

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === routes.login.path ? null : <AppBar />}

      <Suspense>
        <Main>
          <Outlet />
        </Main>
      </Suspense>
    </>
  );
};
