import { District } from './district';
import { City, CityWithDistrictsIds } from './cities';
import { State, StateWithCitiesIds } from './states';
import { Country } from './countries';
import { Language } from './languages';

export type ManyDistricts = { data?: { districts?: District[] } };
export type ManyCities = { data?: { cities?: City[] } };
export type ManyStates = { data?: { states?: State[] } };
export type ManyCountries = { data?: { countries?: Country[] } };
export type ManyLanguages = { data?: { languages?: Language[] } };

export type OneDistrict = { data?: { district?: District } };
export type OneCity = { data?: { city?: CityWithDistrictsIds } };
export type OneState = { data?: { state?: StateWithCitiesIds } };
export type OneCountry = { data?: { country?: Country } };
export type OneLanguage = { data?: { language?: Language } };
