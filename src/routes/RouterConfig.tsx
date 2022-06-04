import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { selectAuth } from 'store/store';

import { useSelector } from 'react-redux';
import { AppBar } from 'components/shared/AppBar';

const Countries = lazy(() => import('components/Countries'));

export const Layout = () => {
  return (
    <>
      <AppBar />
      <Suspense>{<Outlet />}</Suspense>
    </>
  );
};

export const PrivateRoute = () => {
  const auth = useSelector(selectAuth);
  return !auth ? <Navigate to="/" /> : <Outlet />;
};

export const RouterConfig = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Login />} /> */}

      <Route element={<PrivateRoute />}>
        <Route path="countries" element={<Countries />} />
        {/* <Route path="menu" element={<Menu />} /> */}
      </Route>
    </Route>
  </Routes>
);
