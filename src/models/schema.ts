// import { schema } from 'normalizr';
// import type {
// District,
// State,
// Country,
// Language,
// LanguagesAdapter,
// CountriesAdapter,
// StatesAdapter,
// CitiesAdapter,
// DistrictsAdapter,
// City,
// } from 'types/apis';

// export const districtSchema = new schema.Entity<District>('districts', {}, { idAttribute: '_id' });
// export const districtsListSchema = [districtSchema];

// export const citySchema = new schema.Entity<City>(
//   'cities',
//   { districts: districtsListSchema },
//   { idAttribute: '_id' }
// );

// export const citiesListSchema = [citySchema];

// export const stateSchema = new schema.Entity<State>(
//   'states',
//   { cities: citiesListSchema },
//   { idAttribute: '_id' }
// );

// export const statesListSchema = [stateSchema];

// export const countrySchema = new schema.Entity<Country>(
//   'countries',
//   { states: statesListSchema },
//   { idAttribute: '_id' }
// );

// export const countriesListSchema = [countrySchema];

// export const languageSchema = new schema.Entity<Language>(
//   'languages',
//   { countries: countriesListSchema },
//   { idAttribute: '_id' }
// );

// export const languagesListSchema = [languageSchema];

// export type Now = {
//   languages: {
//     entities: Language[];
//     ids: ['langId1', 'langId2', 'langId3'];
//   };
// };

// type NormalizedCity = City;

// type NormalizedCityAdapter = {
//   entities: NormalizedCity;
//   ids: [];
// };

// export type Target = {
//   languages: {
//     entities: NormalizedLanguages;
//     ids: ['langId1', 'langId2', 'langId3'];
//   };
//   countries: {
//     entities: NormalizedCountry;
//     ids: ['langId1', 'langId2', 'langId3'];
//   };
//   states: {
//     entities: NormalizedStates;
//     ids: ['langId1', 'langId2', 'langId3'];
//   };
//   cities: {
//     entities: NormalizedCity;
//     ids: ['langId1', 'langId2', 'langId3'];
//   };
//   districts: {
//     entities: NormalizedDistricts;
//     ids: ['langId1', 'langId2', 'langId3'];
//   };
// };

// const language = new schema.Entity<Language>('languages', {}, { idAttribute: '_id' });
// const languageListSchema = [language];

// const fetchLanguages = async () => {
//   try {
//     const langaugesResponse = await fetch('http://localhost:3500/languages');
//     // const languageObject = preLoadedLanguagesResponse
//     const languagesObject = await langaugesResponse.json();

//     const normalizedLanguages = normalize(languagesObject, languagesListSchema);
//     logRender('fetchLanguages', normalizedLanguages, true);
//   } catch (error) {
//     logRender('useFetchLanguages', error, true);
//   }
// };

// fetchLanguages();

// // embedded category object
// const categorySchema = new schema.Entity('categories');

// // entire question object schema
// const questionSchema = new schema.Entity('questions', {
//   category: categorySchema,
// });

// // response is an array of objects
// const questionsArraySchema = [questionSchema];

// const fetchQuestions = async () => {
//   try {
//     const questionsResponse = await fetch('https://jservice.io/api/random?count=5');

//     const questionsObject = await questionsResponse.json();

//     // normalize the Jeopardy question data
//     const jNormalizedData = normalize(questionsObject, questionsArraySchema);

//     const result = {
//       type: 'JEOPARDY_RESPONSE',
//       categories: jNormalizedData.entities.categories,
//       questions: jNormalizedData.entities.questions,
//       questionsArray: jNormalizedData.result,
//     };

//     logRender('fetchQuestions', result, true);
//   } catch (error) {
//     logRender('fetchQuestions', error, true);
//   }
// };

// fetchQuestions();
export {};
