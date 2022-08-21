import { api, endpoints } from 'features/api';
import type { GetDistrict, MaybeDistrictsEntity } from 'types/apis';

const districtsApi = api.injectEndpoints({
  endpoints: build => ({
    getDistricts: build.query<MaybeDistrictsEntity, void>({
      query: () => endpoints.locationDistrict,
    }),
    getDistrict: build.query<MaybeDistrictsEntity, GetDistrict>({
      query: id => `${endpoints.locationDistrict}/${id}`,
    }),
    addDistrict: build.mutation<MaybeDistrictsEntity, GetDistrict>({
      query: () => endpoints.locationDistrict,
    }),
    editDistrict: build.mutation<MaybeDistrictsEntity, GetDistrict>({
      query: id => `${endpoints.locationDistrict}/${id}`,
    }),
    deleteDistrict: build.mutation<MaybeDistrictsEntity, GetDistrict>({
      query: id => `${endpoints.locationDistrict}/${id}`,
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useAddDistrictMutation,
  useEditDistrictMutation,
  useDeleteDistrictMutation,
} = districtsApi;
