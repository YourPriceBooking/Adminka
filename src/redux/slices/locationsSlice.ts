import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import type {
  State,
  EditState,
  DeleteState,
  City,
  EditCity,
  DeleteCity,
  District,
  NewStateWithOutId,
  NewCityWithOutId,
  NewDistrictWithOutId,
  EditDistrict,
  DeleteDistrict,
} from 'types/apis';

type LocationsState = {
  states: State[];
};

const initialState: LocationsState = {
  states: [
    {
      _id: '12345UAState',
      stateName: 'Kyiv State',
      stateInternational: 'Kyiv State',
      stateCode: 'Kyiv',
      statePhotoURL: 'https://kyiv.states.ua/photos/kyiv-state.webp',
      edited: 0,

      cities: [
        {
          stateId: '12345UAState',
          _id: '12345UACity',
          cityName: 'Kyiv',
          cityInternational: 'Kyiv',
          cityCode: 'KYI',
          cityPhotoURL: 'https://kyiv.city.ua/photos/kyiv-city.webp',
          edited: 0,

          districts: [
            {
              stateId: '12345UAState',
              cityId: '12345UACity',
              _id: '12345UADistrict',
              districtName: 'Kyiv Podil',
              districtInternational: 'Kyiv Podil',
              districtCode: 'POD',
              districtPhotoURL: 'https://kyiv-podil.district.ua/photos/kyiv-podil.webp',
              edited: 0,
            },
          ],
        },

        {
          stateId: '12345UAState',
          _id: '12346UACity',
          cityName: 'Browary',
          cityInternational: 'Browary',
          cityCode: 'BR',
          cityPhotoURL: 'https://browary.city.ua/photos/browary-city.webp',
          edited: 0,

          districts: [],
        },
      ],
    },
  ],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,

  reducers: {
    // country state
    addState: {
      prepare: (stateWithOutId: NewStateWithOutId) => ({
        payload: { _id: nanoid(), ...stateWithOutId },
      }),
      reducer(state, { payload }: PayloadAction<State>) {
        state.states.push(payload);
      },
    },
    editState(state, { payload }: PayloadAction<EditState>) {
      const stateId = payload._id;

      state.states = state.states.map(area =>
        area._id === stateId ? { ...area, ...payload } : area
      );
    },
    deleteState(state, { payload }: PayloadAction<DeleteState>) {
      const stateId = payload._id;

      state.states = state.states.filter(({ _id }) => _id !== stateId);
    },

    // city
    addCity: {
      prepare: (cityWithOutId: NewCityWithOutId) => ({
        payload: { _id: nanoid(), ...cityWithOutId },
      }),
      reducer: (state, { payload }: PayloadAction<City>) => {
        const { stateId } = payload;

        state.states = state.states.map(area =>
          area._id === stateId ? { ...area, cities: [...area.cities, payload] } : area
        );
      },
    },
    editCity(state, { payload }: PayloadAction<EditCity>) {
      const { stateId, _id: cityId } = payload;

      state.states = state.states.map(area =>
        area._id === stateId
          ? {
              ...area,
              cities: area.cities.map(city =>
                city._id === cityId ? { ...city, ...payload } : city
              ),
            }
          : area
      );
    },
    deleteCity(state, { payload }: PayloadAction<DeleteCity>) {
      const { stateId, _id: cityId } = payload;

      state.states = state.states.map(area =>
        area._id === stateId
          ? { ...area, cities: area.cities.filter(({ _id }) => _id !== cityId) }
          : area
      );
    },

    // district
    addDistrict: {
      prepare: (districtWithOutId: NewDistrictWithOutId) => ({
        payload: { _id: nanoid(), ...districtWithOutId },
      }),
      reducer: (state, { payload }: PayloadAction<District>) => {
        const { stateId, cityId } = payload;

        state.states = state.states.map(area =>
          area._id === stateId
            ? {
                ...area,
                cities: area.cities.map(city =>
                  city._id === cityId ? { ...city, districts: [...city.districts, payload] } : city
                ),
              }
            : area
        );
      },
    },
    editDistrict(state, { payload }: PayloadAction<EditDistrict>) {
      const { stateId, cityId, _id: districtId } = payload;

      state.states = state.states.map(area =>
        area._id === stateId
          ? {
              ...area,
              cities: area.cities.map(city =>
                city._id === cityId
                  ? {
                      ...city,
                      districts: city.districts.map(district =>
                        district._id === districtId ? { ...district, ...payload } : district
                      ),
                    }
                  : city
              ),
            }
          : area
      );
    },
    deleteDistrict(state, { payload }: PayloadAction<DeleteDistrict>) {
      const { stateId, cityId, _id: districtId } = payload;

      state.states = state.states.map(area =>
        area._id === stateId
          ? {
              ...area,
              cities: area.cities.map(city =>
                city._id === cityId
                  ? { ...city, districts: city.districts.filter(({ _id }) => _id !== districtId) }
                  : city
              ),
            }
          : area
      );
    },
  },
});

export const {
  addState,
  editState,
  deleteState,

  addCity,
  editCity,
  deleteCity,

  addDistrict,
  editDistrict,
  deleteDistrict,
} = locationsSlice.actions;

export const locationsReducer = locationsSlice.reducer;

// export const selectDistrictNamesForActiveStateAndCity = (
//   state: RootState,
//   stateId: string,
//   cityId: string
// ) =>
//   selectStates(state)
//     .find(({ _id }) => _id === stateId)
//     ?.cities.find(({ _id }) => _id === cityId)
//     ?.districts.map(({ districtName }) => districtName);

export const selectStates = (state: RootState) => state.locations.states;

// reselect selectors to return memoized result
export const selectStateId = (state: RootState, { stateId }: { stateId: string }) => stateId;
export const selectCityId = (state: RootState, { cityId }: { cityId: string }) => cityId;

const called = {
  makeSelectStatesNames: 0,
  makeSelectCities: 0,
  makeSelectDistricts: 0,
  makeSelectCitiesNamesForState: 0,
  makeSelectDistrictNamesForStateAndCity: 0,
};

export const makeSelectStatesNames = () => {
  called.makeSelectStatesNames += 1;
  console.log(JSON.stringify(called, null, 2));

  return createSelector([selectStates], states => states.map(({ stateName }) => stateName));
};

export const makeSelectCities = () => {
  called.makeSelectCities += 1;
  console.log(JSON.stringify(called, null, 2));

  return createSelector(
    [selectStates, selectStateId],
    (states, stateId) => states.find(({ _id }) => _id === stateId)?.cities
  );
};

export const makeSelectDistricts = () => {
  called.makeSelectDistricts += 1;
  console.log(JSON.stringify(called, null, 2));

  return createSelector(
    [makeSelectCities(), selectCityId],
    (cities, cityId) => cities?.find(({ _id }) => _id === cityId)?.districts
  );
};

export const makeSelectCitiesNamesForState = () => {
  called.makeSelectCitiesNamesForState += 1;
  console.log(JSON.stringify(called, null, 2));

  return createSelector(makeSelectCities(), cities => cities?.map(({ cityName }) => cityName));
};

/**
 * two arguments must be provided to each individual selector
 * args: (state: RootState, {stateId: string, cityId: string})
 * @yields {createSelector function} Selector for each element in the list
 * to have its own version of the function to keep memoization working
 * for active state and city to return its own Array with districts names if same args.
 */
export const makeSelectDistrictNamesForStateAndCity = () => {
  called.makeSelectDistrictNamesForStateAndCity += 1;
  console.log(JSON.stringify(called, null, 2));

  return createSelector(makeSelectDistricts(), districts =>
    districts?.map(({ districtName }) => districtName)
  );
};
