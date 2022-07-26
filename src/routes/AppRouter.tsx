import { Navigate, Routes, Route } from 'react-router-dom';
import { routes } from './routesConfig';
import { PrivateRoute } from './PrivateRoute';

const { login, menu, country } = routes;

export const AppRouter = () => (
  <Routes>
    <Route path={login.path} element={<login.element.App />}>
      <Route index element={<login.element.LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path={menu.path} element={<menu.element />} />
        <Route path={country.path} element={<country.element />} />
        {/* <Route path="/location" element={<Location />} /> */}
      </Route>

      <Route path="*" element={<Navigate to={login.path} replace />} />
    </Route>
  </Routes>
);
