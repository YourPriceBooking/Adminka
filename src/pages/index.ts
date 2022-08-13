import { lazy } from 'react';

// I'm using default exports only for React.lazy components
// because it allows intellisense to show file path this way

export const LoginPage = lazy(() => import('./LoginPage'));
export const MenuPage = lazy(() => import('./MenuPage'));
export const AddCountryPage = lazy(() => import('./AddCountryPage'));
