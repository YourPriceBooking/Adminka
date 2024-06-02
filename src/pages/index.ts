import { lazy } from 'react';

// I'm using default exports only for React.lazy components
// because it allows intellisense to show file path this way
export const LoginPage = lazy(() => import('./LoginPage'));
export const MenuPage = lazy(() => import('./MenuPage'));
export const CountryPage = lazy(() => import('./CountryPage'));
export const StatisticPage = lazy(() => import('./StatisticPage'));
export const VerificationPage = lazy(() => import('./VerificationPage'));
export const VerificationCabinetPage = lazy(() => import('./VerificationCabinetPage'));
export const AdminPageAccess = lazy(() => import('./AdminPageAccess'));
export const FinancePage = lazy(() => import('./FinancePage'));
export const Blog = lazy(() => import('./Blog'));
export const Authors = lazy(() => import('./Authors'));
export const AuthorsAdd = lazy(() => import('./AuthorsAdd'));
export const HousePageVerif = lazy(() => import('./HousePage'));
export const MowgliBookingStatisticPage = lazy(() => import('./MowgliBookingStatisticPage'));
export const MowgliBookingFinancePage = lazy(() => import('./MowgliBookingFinancePage'));
export const MowgliBookingVerifPage = lazy(() => import('./MowgliBookingVerifPage'));
