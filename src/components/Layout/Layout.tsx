import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppBar } from 'components/shared/AppBar';
import { Main } from './Layout.styled';

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && <AppBar />}

      <Suspense>
        <Main>{<Outlet />}</Main>
      </Suspense>
    </>
  );
};
