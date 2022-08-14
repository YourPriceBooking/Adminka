type FnNames = {
  [key: string]: number;
};

const render: FnNames = {};

export const logRender = (fnName: string) => {
  render[fnName] ??= 0;
  console.log({ [fnName]: (render[fnName] += 1) });
};
