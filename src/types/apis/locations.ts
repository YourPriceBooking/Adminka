export type District = {
  regionId: string;
  cityId: string;
  _id: string;
  districtName: string;
  districtPhotoURL: string;
  districtInternational: string;
  districtCode?: string;
  edited: number;
};

export type City = {
  regionId: string;
  _id: string;
  cityName: string;
  cityPhotoURL: string;
  cityInternational: string;
  cityCode?: string;
  edited: number;

  districts?: District[];
};

export type NewRegionWithOutId = {
  regionName: string;
  regionPhotoURL: string;
  regionInternational: string;
  regionCode?: string;
  edited: number;

  cities?: City[];
};

export type Region = {
  _id: string;
  regionName: string;
  regionPhotoURL: string;
  regionInternational: string;
  regionCode?: string;
  edited: number;

  cities?: City[];
};

export type EditRegion = {
  _id: string;
  regionName?: string;
  regionPhotoURL?: string;
  regionInternational?: string;
  regionCode?: string;
  edited: number;

  cities?: City[];
};

export type DeleteRegion = {
  _id: string;
};
