import type { VerificationObject } from './verification';

export type Location = {
  cityName: string;
  stateName: string;
  country: string;
  international: string;
  _id: string;
};

export type Time = {
  checkin: string;
  checkout: string;
};

export type Service = {
  id: string;
  type: string;
};

export type PaymentType = {
  id: string;
  type: string;
  _id: string;
};

export type ChatHistory = {
  hotelier: string[];
  verifier: string[];
};

export type VerificationObjectFullInfo = {
  time: Time;
  location: Location;
  language: string;
  status: string;
  description: string;
  services: Service[];
  payments: PaymentType[];
  translation: Record<string, string>;
} & VerificationObject;

export type VerificationDocumentState = {
  data: ResponseVerificationDocument;
  isLoading: boolean;
  isPendingTranslate: boolean;
  error: string | unknown;
};

export type ResponseVerificationDocument = {
  hotels: VerificationObjectFullInfo;
  video: string[];
  documents: string[];
  selfie: string[];
  link: string[];
  owner: string;
  createdAt: string;
  updatedAt: string;
  pointOnTheMap: string;
  youTubeLink: string;
  nextVerificationDate: string;
  phone1: string;
  phone2: string;
  chatHistory: ChatHistory;
};
