import type { RootState } from 'App/store';

export const getVerification = (state: RootState) => state.verification.verification.onVerification;

export const getCountVerification = (state: RootState) => {
  const { verification } = state.verification;
  let count = 0;

  if (verification.onVerification) {
    Object.values(verification.onVerification).forEach(value => {
      count += value;
    });
  }
  // eslint-disable-next-line no-debugger
  debugger;
  return count;
};

export const getVerificationObject = (state: RootState) => {
  const { objects } = state.verification;

  return objects.map(object => {
    const verificationType = state.verification.types?.object[0].objects.find(
      type => type.id === object.result.type.id
    );

    if (verificationType) {
      return {
        ...object,
        result: {
          ...object.result,
          type: verificationType,
        },
      };
    }

    return object;
  });
};

export const getVerificationTypeObjects = (state: RootState) =>
  state.verification.types?.object[0].objects;
