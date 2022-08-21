import { createEntityAdapter } from '@reduxjs/toolkit';
import { getManyStates, getOneState, getOneStateId } from 'features/api';
import type { ManyStates, OneState, State } from 'types/apis';

export const statesAdapter = createEntityAdapter<State>({
  selectId: state => state._id,
  sortComparer: (a, b) => b.createdAt?.localeCompare(a.createdAt),
});

export const statesInitialState = statesAdapter.getInitialState();

export const saveManyStates = (result?: ManyStates) => {
  const states = getManyStates(result);
  return states ? statesAdapter.setAll(statesInitialState, states) : undefined;
};

export const saveOneState = (result?: OneState) => {
  const state = getOneState(result);
  const saved = state ? statesAdapter.upsertOne(statesInitialState, state) : undefined;
  console.log({ state, saved });
  return saved;
};

export const removeState = (result?: OneState) => {
  const id = getOneStateId(result);
  return id ? statesAdapter.removeOne(statesInitialState, id) : undefined;
};
