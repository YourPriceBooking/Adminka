import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import type { State, EditState, DeleteState, City, EditCity, DeleteCity } from 'types/apis';

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
    addState: {
      prepare: stateWithOutId => ({ payload: { _id: nanoid(), ...stateWithOutId } }),
      reducer: (state, { payload }: PayloadAction<State>) => {
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

    addCity: {
      prepare: cityWithOutId => ({ payload: { _id: nanoid(), ...cityWithOutId } }),
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

    // addDistrict(state, { payload }: PayloadAction<District>) {
    //   const stateIndex = state.states.findIndex(area => area._id === payload.areaId);
    //   const cities = state.states[stateIndex]?.cities;

    //   return state;
    // },
  },
});

export const { addState, editState, deleteState, addCity, editCity, deleteCity } =
  locationsSlice.actions;

export const locationsReducer = locationsSlice.reducer;

export const selectStates = (state: RootState) => state.locations.states;

export const selectStatesNames = (state: RootState) =>
  selectStates(state).map(({ stateName }) => stateName);

export const selectCitiesNamesForActiveState = (state: RootState, stateId: string) =>
  selectStates(state)
    .find(({ _id }) => _id === stateId)
    ?.cities.map(({ cityName }) => cityName);
