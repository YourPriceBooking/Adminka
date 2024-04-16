export type VerifyObjectsData = {
  amountObject: number;
};

export type ResponseVerifyObjectsData = {
  code: number;
  amountObject: number;
  status: string;
};

export type VerifyObjectsState = {
  amountObject: number;
  isLoadingObjects: boolean;
  error: null | unknown;
};
