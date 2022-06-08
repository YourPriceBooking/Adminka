import { useLocation, Outlet } from 'react-router-dom';
import { AppBar } from 'components/shared/AppBar';
import { Suspense } from 'react';
import { Main } from './Layout.styled';

export const Layout = () => {
  const { pathname } = useLocation();
  console.log('Layout ~ pathname', pathname);

  return (
    <>
      {pathname === '/home' || pathname === '/login' ? null : <AppBar />}

      <Suspense>
        <Main>
          <Outlet />
        </Main>
      </Suspense>
    </>
  );
};
