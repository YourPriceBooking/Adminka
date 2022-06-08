import { lazy } from 'react';
import { Navigate, Outlet, Routes, Route } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/slices';
import { Layout } from 'components/Layout';
import { useAppSelector } from 'hooks/redux/hooks';

const AddCountries = lazy(() => import('components/pages/AddCountries'));
const AddLanguage = lazy(() => import('components/pages/SelectLang'));
const HomePage = lazy(() => import('pages/HomePage'));

export const PrivateRoute = () => {
  const auth = useAppSelector(selectIsLoggedIn);
  return !auth ? <Navigate to="/" /> : <Outlet />;
};

export const RouterConfig = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      {/* <Route index element={<Login />} /> */}

      <Route element={<PrivateRoute />}>
        <Route path="/countries" element={<AddCountries />} />
        <Route path="/language" element={<AddLanguage />} />
        {/* <Route path="menu" element={<Menu />} /> */}
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
