import type { EntityId } from '@reduxjs/toolkit';

export type NewDistrictWithOutId = {
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
  cityId: EntityId;
  cityInternational: string;

  _id: EntityId;
  districtName: string;
  districtInternational: string;
  districtCode: string;
  districtPhotoURL: string;

  langCode: string;
  dbLangCode: string;
  createdAt?: string;
  updatedAt?: string;
};

export type EditDistrict = {
  cityId: EntityId;
  cityInternational: string;

  _id: EntityId;
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
  _id: EntityId;
  cityId: EntityId;
};

export type FindDistrict = {
  cityId: EntityId;
};

export type DistrictResponse = District[] | [];
