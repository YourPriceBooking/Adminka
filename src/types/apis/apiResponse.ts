import { District } from './district';
import { City } from './cities';
import { State } from './states';
import { Country } from './countries';
import { Language } from './languages';

export type ManyDistricts = { data?: { districts?: District[] } };
export type ManyCities = { data?: { cities?: City[] } };
export type ManyStates = { data?: { states?: State[] } };
export type ManyCountries = { data?: { countries?: Country[] } };
export type ManyLanguages = { data?: { languages?: Language[] } };

export type OneDistrict = { data?: { district?: District } };
export type OneCity = { data?: { city?: City } };
export type OneState = { data?: { state?: State } };
export type OneCountry = { data?: { country?: Country } };
export type OneLanguage = { data?: { language?: Language } };
