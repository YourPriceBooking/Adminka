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

export const getVerificationObject = (state: RootState) => {
  const object = state.verification.object.result;
  const verificationType = state.verification.types?.object[0].objects.find(
    type => type.id === object?.type.id
  );

  if (!verificationType) {
    return object;
  }

  if (!object) {
    return null;
  }

  return { ...object, type: verificationType };
};

export const getVerificationTypeObjects = (state: RootState) =>
  state.verification.types?.object[0].objects;
