export type ObjectInfoInfo = {
  verifInfoStart: string[];
  verifInfoFinish: string[];
  isFirst?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTranslate?: any;
  verifierId?: string;
};

export type ObjectInfoOption = {
  verifInfoStart: string[];
  verifInfoFinish: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTranslate: any;
};

export type VerifInfoProps = {
  values: string[];
  verifStart?: boolean;
  verifFinish?: boolean;
};

export type AddAdressUrlProps = {
  isSubmitted: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleTranslate?: any;
  hotelId: string | undefined;
};
