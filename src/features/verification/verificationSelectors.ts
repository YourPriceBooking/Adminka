import type { RootState } from 'App/store';

export const getVerification = (state: RootState) => state.verification.verification.result;

export const getCountVerification = (state: RootState) => {
  const { verification } = state.verification;
  let count = 0;

  if (verification && verification.result !== null) {
    Object.values(verification.result).forEach(value => {
      count += value;
    });
  }

  return count;
};
