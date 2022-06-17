export type District = {
  stateId: string;
  cityId: string;
  _id: string;
  districtName: string;
  districtPhotoURL: string;
  districtInternational: string;
  districtCode?: string;
  edited: number;
};

export type City = {
  stateId: string;
  _id: string;
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

export type State = {
  _id: string;
  stateName: string;
  statePhotoURL: string;
  stateInternational: string;
  stateCode?: string;
  edited: number;

  cities: City[];
};

export type EditState = State;

export type DeleteState = {
  _id: string;
};
