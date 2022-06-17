import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import type { State, EditState, DeleteState, City, EditCity, DeleteCity } from 'types/apis';

type StateInternationalType = {
  _id: string;
  stateInternational: string;
};

type LocationsState = {
  states: State[];
  statesInternationalNames: StateInternationalType[];
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

  statesInternationalNames: [{ _id: '12345UAState', stateInternational: 'Kyiv State' }],
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,

  reducers: {
    addState: {
      prepare: args => ({ payload: { _id: nanoid(), ...args } }),
      reducer: (state, { payload }: PayloadAction<State>) => {
        state.states.push(payload);

        state.statesInternationalNames.push({
          _id: payload._id,
          stateInternational: payload.stateInternational,
        });
      },
    },

    editState(state, { payload }: PayloadAction<EditState>) {
      const stateId = payload._id;
      const stateIndex = state.states.findIndex(({ _id }) => _id === stateId);
      const prevState = state.states[stateIndex];

      state.states[stateIndex] = { ...prevState, ...payload };

      state.statesInternationalNames = state.statesInternationalNames.map(area =>
        area._id === stateId
          ? area
          : { _id: payload._id, stateInternational: payload.stateInternational }
      );
    },

    deleteState(state, { payload }: PayloadAction<DeleteState>) {
      const stateId = payload._id;

      state.states = state.states.filter(({ _id }) => _id !== stateId);

      state.statesInternationalNames = state.statesInternationalNames.filter(
        ({ _id }) => _id !== stateId
      );
    },

    addCity(state, { payload }: PayloadAction<City>) {
      const { stateId } = payload;
      const { states } = state;
      const stateIndex = states.findIndex(({ _id }) => _id === stateId);

      state.states[stateIndex].cities.push(payload);
    },

    editCity(state, { payload }: PayloadAction<EditCity>) {
      const { stateId, _id: cityId } = payload;
      const { states } = state;
      const stateIndex = states.findIndex(({ _id }) => _id === stateId);
      const cityIndex = states[stateIndex].cities.findIndex(({ _id }) => _id === cityId);
      const prevCity = states[stateIndex].cities[cityIndex];

      state.states[stateIndex].cities[cityIndex] = { ...prevCity, ...payload };
    },

    deleteCity(state, { payload }: PayloadAction<DeleteCity>) {
      const { stateId, _id: cityId } = payload;
      const { states } = state;
      const stateIndex = states.findIndex(({ _id }) => _id === stateId);
      const cityIndex = states[stateIndex].cities.findIndex(({ _id }) => _id === cityId);

      state.states[stateIndex].cities.splice(cityIndex, 1);
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

export const selectStatesInternationalNames = (state: RootState) =>
  state.locations.statesInternationalNames;
