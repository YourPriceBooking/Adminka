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

export type FindDistrict = {
  stateId: string;
  cityId: string;
};
