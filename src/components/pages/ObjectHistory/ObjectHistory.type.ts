export type ObjectInfoInfo = {
  verifInfoStart: string[];
  verifInfoFinish: string[];
  isFirst?: boolean;
  handleTranslate?: any;
};

export type ObjectInfoOption = {
  verifInfoStart: string[];
  verifInfoFinish: string[];
  handleTranslate: any;
};

export type VerifInfoProps = {
  values: string[];
  verifStart?: boolean;
  verifFinish?: boolean;
};

export type AddAdressUrlProps = {
  isSubmitted: boolean;
  handleTranslate?: any;
  hotelId: string | undefined;
};
