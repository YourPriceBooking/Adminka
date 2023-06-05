import { EntityId } from "@reduxjs/toolkit";
import { number } from "yup";

export interface IAllObjectHotelier {
  code: number | undefined;
  data: DataObject;
  status: string;
}

export type DataObject = {
  [key: string]: Location;
};

export type Location = {
  nameOfpage: string;
  city: string;
  country: string;
  state: string;
  district: string;
  language: string;
  url: string;
  linkOnPhoto: string;
  idLocation: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}


export type AddLocation = {
  language: string;
  idLocation: EntityId;
  district: string;
  city: string;
  state: string;
  country: string | undefined;
  linkOnPhoto: string;
}

export interface IResponseAddLocation {
  status: string;
  isAdded: boolean;
  message: string;
  data: DataObject;
}