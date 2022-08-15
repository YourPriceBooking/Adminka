export type NewDistrictWithOutId = {
  stateId: string;
  cityId: string;
  cityInternational: string;

  districtName: string;
  districtInternational: string;
  districtCode: string;
  districtPhotoURL: string;

  langCode: string;
  dbLangCode: string;
};

export type District = {
  stateId: string;
  cityId: string;
  cityInternational: string;

  _id: string;
  districtName: string;
  districtInternational: string;
  districtCode: string;
  districtPhotoURL: string;

  langCode: string;
  dbLangCode: string;
  createdAt: string;
  updatedAt: string;
};

export type EditDistrict = {
  stateId: string;
  cityId: string;
  cityInternational: string;

  _id: string;
  districtName: string;
  districtInternational: string;
  districtCode: string;
  districtPhotoURL: string;

  langCode: string;
  dbLangCode: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteDistrict = {
  _id: string;
  stateId: string;
  cityId: string;
};

export type FindDistrict = {
  stateId: string;
  cityId: string;
};
