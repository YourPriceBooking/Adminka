export interface Country {
  _id: string;
  country: string;
  langCode: string;
  createdAt: string;
  updatedAt: string;
}

export type CountriesResponse = Country[] | undefined;

export interface AddCountry {
  country: string;
  langCode: string;
  // edited: number;
}

export interface EditCountry {
  _id: string;
  country?: string;
  langCode?: string;
  // edited: number;
}
