export type VerificationData = Record<string, number>;

export type ResponseVerificationData = {
  code: number;
  status: string;
  result: VerificationData;
};

export type VerificationState = {
  verification: {
    result: VerificationData | null;
  };
  isLoadingVerification: boolean;
  error: null | unknown;
};

// {"code":200,"status":"success","result":{"USA":6,"Ukraine":60,"Poland":16}}
