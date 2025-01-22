import type { ThunkMiddleware } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { logout } from './authSlice';

export const tokenExpiredMiddleware: ThunkMiddleware = store => next => action => {
  if (
    action.type.endsWith('/rejected') &&
    action.payload instanceof AxiosError &&
    action.payload.response.data.message === 'jwt expired'
  ) {
    store.dispatch(logout());
  }
  return next(action);
};
