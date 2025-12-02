import type { RootState } from 'App/store';

export const getOnVerification = (state: RootState) =>
  state.verification.verification.onVerification;
export const getAddedToVerification = (state: RootState) => state.verification.verification.added;

export const getCountVerification = (state: RootState) => {
  const { verification } = state.verification;

  return {
    amountOfAdded: verification.amountOfAdded,
    amountOnVerification: verification.amountOnVerification,
  };
};

export const getVerificationObject = (state: RootState) => {
  const { objects } = state.verification;

  let newObjects = objects;

  Object.keys(objects).forEach(country => {
    const object = objects[country];

    if (!Array.isArray(object)) {
      return;
    }

    const results = object.map(obj => {
      if (!obj || !obj.type || !obj.type.id) {
        return obj;
      }

      const typeId = obj.type.id;

      const verificationType = state.verification.types?.object[0]?.objects.find(
        type => type.id === typeId
      );

      if (verificationType) {
        return {
          ...obj,
          type: verificationType,
        };
      }

      return obj;
    });

    newObjects = {
      ...newObjects,
      [country]: results,
    };
  });

  return newObjects;
};

export const getVerificationTypeObjects = (state: RootState) =>
  state.verification.types?.object[0].objects;
