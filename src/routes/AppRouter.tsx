import { Navigate, Routes, Route } from 'react-router-dom';
import { routes } from './routesConfig';
import { PrivateRoute } from './PrivateRoute';

const {
  login,
  menu,
  country,
  verification,
  adminPageAccess,
  adminPageAccessMain,
  registerModal,
  statistics,
  finance,
  blog,
} = routes;

export const AppRouter = () => (
  <Routes>
    <Route path={login.path} element={<login.element.App />}>
      <Route index element={<login.element.LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route
          path={verification.path.verification}
          element={<verification.element.VerificationPage />}
        />
        <Route
          path={verification.path.verificationId}
          element={<verification.element.VerificationCabinetPage />}
        />
        <Route path={menu.path} element={<menu.element />} />
        <Route path={country.path} element={<country.element />} />
        <Route path={statistics.path} element={<statistics.element />} />
        <Route path={adminPageAccess.path} element={<adminPageAccess.element />} />
        <Route path={adminPageAccessMain.path} element={<adminPageAccessMain.element />} />
        <Route path={registerModal.path} element={<registerModal.element />} />
        <Route path={finance.path} element={<finance.element />} />
        <Route path={blog.path} element={<blog.element />} />

        {/* <Route path="/location" element={<Location />} /> */}
      </Route>

      <Route path="*" element={<Navigate to={login.path} replace />} />
    </Route>
  </Routes>
);
