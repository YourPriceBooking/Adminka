import { schema } from 'normalizr';
import type {
  District,
  City,
  State,
  Country,
  Language,
  LanguagesAdapter,
  CountriesAdapter,
  StatesAdapter,
  CitiesAdapter,
  DistrictsAdapter,
} from 'types/apis';
import { EntityId } from '@reduxjs/toolkit';

type Todo = {
  _id: EntityId;
  text: string;
  createdAt: string;
  done: boolean;
  languageId: EntityId;
};

export const todo = new schema.Entity<Todo>('todos');
export const arrayOfTodos = new schema.Array(todo);

export const districtSchema = new schema.Entity<District>('districts', undefined, {
  idAttribute: '_id',
});

export const citySchema = new schema.Entity<City>(
  'cities',
  {
    districts: [districtSchema],
  },
  { idAttribute: '_id' }
);

export const stateSchema = new schema.Entity<State>(
  'states',
  {
    cities: [citySchema],
  },
  { idAttribute: '_id' }
);

export const countrySchema = new schema.Entity<Country>(
  'countries',
  {
    states: [stateSchema],
  },
  { idAttribute: '_id' }
);

export const languageSchema = new schema.Entity<Language>(
  'languages',
  {
    suka: countrySchema,
    countries: new schema.Array(countrySchema),
  },
  { idAttribute: '_id' }
);

export type Book = {
  id: EntityId;
  title: string;
  bookInfo: string;
  chapterIds: EntityId[];
};

export type Chapter = {
  id: EntityId;
  name: string;
  info: string;
  other: string;
  bookId: EntityId;
};

export type NormalizedLanguages = {
  languages: LanguagesAdapter;
  countries: CountriesAdapter;
  states: StatesAdapter;
  cities: CitiesAdapter;
  districts: DistrictsAdapter;
};
