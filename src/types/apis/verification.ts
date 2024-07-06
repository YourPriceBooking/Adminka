export type Address = {
  country: string;
  state: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  zipCode: string;
  phone: string;
  email: string;
};

export type Type = {
  id: string;
  type: string;
};

export type Photo = {
  id: string;
  url: string;
  position: string;
  _id: string;
};

export type VerificationCountryList = Record<string, number>;

export type ResponseVerificationCountryList = {
  code: number;
  status: string;
  onVerification: VerificationCountryList;
  added: VerificationCountryList;
  amountOnVerification: number;
  amountOfAdded: number;
};

export type VerificationObject = {
  address: Address;
  _id: string;
  type: Type;
  objectName: string;
  photos: Photo[];
};

export type VerificationObjectType = {
  object: [
    {
      _id: string;
      langCode: string;
      objects: {
        id: string;
        _id: string;
        type: string;
        stars?: string;
      }[];
    }
  ];
};

export type ResponseVerificationObject = {
  code: number;
  status: string;
  country: string;
  result: VerificationObject[];
};

export type ResponseVerificationTypeObjects = {
  code: number;
  status: string;
  data: VerificationObjectType;
};

export type VerificationCountryListInWorking = Record<any, any>;

export type ResponseInWorkingCountryList = {
  code: number;
  status: string;
  result: VerificationCountryListInWorking;
};

export type RequestInWorkingCountry = {
  hotels: string;
  objectName: string;
};

export type VerificationState = {
  verification: {
    onVerification: VerificationCountryList | null;
    added: VerificationCountryList | null;
    amountOnVerification: number;
    amountOfAdded: number;
  };
  objects: Record<string, VerificationObject[]>;
  types: VerificationObjectType | null;
  isLoadingVerification: boolean;
  error: null | unknown;
};
