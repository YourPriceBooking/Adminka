import type { EntityId } from '@reduxjs/toolkit';

type FnNames = {
  [key: string]: number;
};

const render: FnNames = {};

export const logRender = (
  fnName: string,
  returned?: {} | [] | EntityId | unknown,
  showLog = false
) => {
  render[fnName] ??= 0;
  render[fnName] += 1;

  if (showLog) {
    const named = { [fnName]: render[fnName] };
    console.log(named, returned);
  }
};
