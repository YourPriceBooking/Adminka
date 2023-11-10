import type { RootState } from 'App/store';

export const getVerification = (state: RootState) => state.verification.verification.result;
