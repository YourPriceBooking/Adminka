import type { RootState } from 'App/store';

export const getVerification = (state: RootState) => state.verification.verification.result;

export const getCountVerification = (state: RootState) => {
  const { verification } = state.verification;
  let count = 0;

  if (verification.result !== null) {
    Object.values(verification.result).forEach(value => {
      count += value;
    });
  }

  return count;
};

export const getVerificationObject = (state: RootState) => state.verification.object.result;

export const getVerificationTypeObjects = (state: RootState) =>
  state.verification.types?.object[0].objects;
