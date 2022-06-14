import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import type { Region, EditRegion, DeleteRegion, City } from 'types/apis';

type locationsState = {
  regions: Region[];
};

const initialState: locationsState = {
  regions: [
    {
      _id: '12345UARegion',
      regionName: 'Kyiv Region',
      regionInternational: 'Kyiv Region',
      regionCode: 'Kyiv',
      regionPhotoURL: 'https://kyiv.region.ua/photos/kyiv-region.webp',
      edited: 0,

      cities: [
        {
          regionId: '12345UARegion',
          _id: '12345UACity',
          cityName: 'Kyiv',
          cityInternational: 'Kyiv',
          cityCode: 'KYI',
          cityPhotoURL: 'https://kyiv.city.ua/photos/kyiv-city.webp',
          edited: 0,

          districts: [
            {
              regionId: '12345UARegion',
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
          regionId: '12345UARegion',
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
    addRegion: {
      reducer(state, { payload }: PayloadAction<Region>) {
        state.regions.push(payload);
      },
      prepare(args) {
        return {
          payload: {
            _id: nanoid(),
            ...args,
          },
        };
      },
    },
    editRegion(state, { payload }: PayloadAction<EditRegion>) {
      state.regions = state.regions.map(region =>
        region._id !== payload._id
          ? region
          : {
              ...region,
              ...payload,
            }
      );
    },

    deleteRegion(state, { payload }: PayloadAction<DeleteRegion>) {
      state.regions = state.regions.filter(region => region._id !== payload._id);
    },

    addCity(state, { payload }: PayloadAction<City>) {
      // state.regions[
      //   state.regions.findIndex(region => region._id === payload.regionId)
      // ]?.cities?.push(payload);

      return {
        ...state,
        regions: state.regions.map(region =>
          region._id !== payload.regionId
            ? region
            : {
                ...region,
                cities: region.cities ? [...region.cities, { ...payload }] : [{ ...payload }],
              }
        ),
      };
    },

    // addDistrict(state, { payload }: PayloadAction<District>) {
    //   const regionIndex = state.regions.findIndex(region => region._id === payload.regionId);
    //   const cities = state.regions[regionIndex]?.cities;

    //   return state;
    // },
  },
});

export const { addRegion, editRegion, deleteRegion, addCity } = locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;
export const selectRegions = (state: RootState) => state.locations.regions;
