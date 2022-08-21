import { api, endpoints, tag, tagList } from 'features/api';
import type {
  AddDistrict,
  DeleteDistrict,
  EditDistrict,
  GetDistrict,
  ManyDistricts,
  MaybeDistrictsEntity,
  OneDistrict,
} from 'types/apis';
import { removeDistrict, saveManyDistricts, saveOneDistrict } from './districtsAdapter';

const districtsApi = api.injectEndpoints({
  endpoints: build => ({
    getDistricts: build.query<MaybeDistrictsEntity, void>({
      query: () => endpoints.locationDistrict,
      transformResponse: (result: ManyDistricts) => saveManyDistricts(result),
      providesTags: result => tagList(result, 'District'),
    }),
    getDistrict: build.query<MaybeDistrictsEntity, GetDistrict>({
      query: id => `${endpoints.locationDistrict}/${id}`,
      transformResponse: (result: OneDistrict) => saveOneDistrict(result),
      providesTags: (_, __, id) => tag(id, 'District'),
    }),
    addDistrict: build.mutation<MaybeDistrictsEntity, AddDistrict>({
      query: body => ({
        url: endpoints.locationDistrict,
        method: 'POST',
        body,
      }),
      transformResponse: (result: OneDistrict) => saveOneDistrict(result),
      invalidatesTags: () => tag('LIST', 'District'),
    }),
    editDistrict: build.mutation<MaybeDistrictsEntity, EditDistrict>({
      query: ({ _id, ...body }) => ({
        url: `${endpoints.locationDistrict}/${_id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (result: OneDistrict) => saveOneDistrict(result),
      invalidatesTags: (_, __, { _id }) => tag(_id, 'District'),
    }),
    deleteDistrict: build.mutation<MaybeDistrictsEntity, DeleteDistrict>({
      query: id => ({
        url: `${endpoints.locationDistrict}/${id}`,
        method: 'DELETE',
        body: { _id: id },
      }),
      transformResponse: (result: OneDistrict) => removeDistrict(result),
      invalidatesTags: (_, __, id) => tag(id, 'District'),
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useAddDistrictMutation,
  useEditDistrictMutation,
  useDeleteDistrictMutation,
} = districtsApi;

export const selectDistrictsResult = districtsApi.endpoints.getDistricts.select();
