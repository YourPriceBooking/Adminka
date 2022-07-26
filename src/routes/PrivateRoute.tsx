import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { selectIsLoggedIn } from 'redux/slices';

type RouteType = {
  navigateTo?: string;
};

export const PrivateRoute = ({ navigateTo = '/' }: RouteType) => {
  const auth = useAppSelector(selectIsLoggedIn);
  const { pathname } = useLocation();
  return !auth ? <Navigate to={navigateTo} replace state={{ from: pathname }} /> : <Outlet />;
};
