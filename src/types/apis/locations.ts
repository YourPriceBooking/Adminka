export type NewDistrictWithOutId = {
  stateId: string;
  cityId: string;

  districtName: string;
  districtInternational: string;
  districtCode: string;
  districtPhotoURL: string;
  edited: number;

  cityInternational: string;
  langCode: string;
  dbLangCode: string;
  __v?: number;
};
export type District = {
  _id: string;
} & NewDistrictWithOutId;
export type EditDistrict = District;
export type DeleteDistrict = {
  _id: string;
  stateId: string;
  cityId: string;
};

export type NewCityWithOutId = {
  stateId: string;

  cityName: string;
  cityInternational: string;
  cityCode: string;
  cityPhotoURL: string;
  edited: number;
  langCode: string;
  stateInternational: string;
  state: string;
  districts: District[];
  createdAt: string;
  updatedAt: string;
};
export type City = {
  _id: string;
} & NewCityWithOutId;
export type EditCity = City;
export type DeleteCity = {
  _id: string;
  stateId: string;
};

export type NewStateWithOutId = {
  stateName: string;
  stateInternational: string;
  stateCode: string;
  international: string;
  edited: number;
  langCode: string;
  dbLangCode: string;
  statePhotoURL: string;
  countryId: string;
  cities: City[];
  createdAt?: string;
  updatedAt?: string;
};
export type State = {
  _id: string;
} & NewStateWithOutId;
export type EditState = State;
export type DeleteState = {
  _id: string;
};

export type StatesResponse = State[];

export type AddState = {
  state: string;
  stateInternational: string;
};
