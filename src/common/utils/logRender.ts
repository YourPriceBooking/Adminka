import type { EntityId } from '@reduxjs/toolkit';

type FnNames = {
  [key: string]: number;
};

const render: FnNames = {};

export const logRender = (fnName: string, returned?: {} | [] | EntityId, showLog = false) => {
  render[fnName] ??= 0;
  render[fnName] += 1;

  if (showLog) {
    console.table([returned]);
  }
};
