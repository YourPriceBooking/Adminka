import { AnimationEvent, lazy, ReactNode, Suspense, useEffect, useState } from 'react';
import { Navigate, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Layout } from 'components/Layout';
import { useAppSelector } from 'hooks/redux/hooks';
import { selectIsLoggedIn } from 'redux/slices';
import { AnimatedContainer } from 'components/shared/AppRouter/AnimatedContainer';
import Menu from 'pages/HomePage';
import Login from 'pages/LoginPage';

const LoginPage = lazy(() => import('pages/HomePage'));
const AddCountriesPage = lazy(() => import('pages/AddCountriesPage'));
const HomePage = lazy(() => import('pages/HomePage'));

type RouteType = {
  navigateTo?: string;
};

const PrivateRoute = ({ navigateTo = '/login' }: RouteType) => {
  const auth = useAppSelector(selectIsLoggedIn);
  return !auth ? <Navigate to={navigateTo} replace /> : <Outlet />;
};

export const AppRouter = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (location === displayLocation) return;
    console.log(location === displayLocation);
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
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/location" element={<Location />} /> */}

            <Route path="/country/:id" element={<AddCountriesPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatedContainer>
  );
};
