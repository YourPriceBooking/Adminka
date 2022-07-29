export type NewDistrictWithOutId = {
  stateId: string;
  cityId: string;

  districtName: string;
  districtPhotoURL: string;
  districtInternational: string;
  districtCode?: string;
  edited: number;
};
export type District = {
  _id: string;
} & {
  stateId: string;
  cityId: string;

  districtName: string;
  districtPhotoURL: string;
  districtInternational: string;
  districtCode?: string;
  edited: number;
};
export type EditDistrict = District;
export type DeleteDistrict = {
  _id: string;
  stateId: string;
  cityId: string;
};

export type NewCityWithOutId = {
  stateId: string;

  cityName: string;
  cityPhotoURL: string;
  cityInternational: string;
  cityCode?: string;
  edited: number;
  districts: District[];
};
export type City = {
  _id: string;
} & {
  stateId: string;

  cityName: string;
  cityPhotoURL: string;
  cityInternational: string;
  cityCode?: string;
  edited: number;
  districts: District[];
};
export type EditCity = City;
export type DeleteCity = {
  _id: string;
  stateId: string;
};

export type NewStateWithOutId = {
  stateName: string;
  statePhotoURL: string;
  stateInternational: string;
  stateCode?: string;
  edited: number;
  cities: City[];
};
export type State = NewStateWithOutId & {
  _id: string;
};
export type EditState = State;
export type DeleteState = {
  _id: string;
};

export type StatesResponse = State[];

export type AddState = {
  state: string;
  stateInternational: string;
};
