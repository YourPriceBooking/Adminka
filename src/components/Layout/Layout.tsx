import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Main } from './Layout.styled';

export const Layout = () => (
  <Main>
    <Suspense>
      <Outlet />
    </Suspense>
  </Main>
);
