import type {
  DataHotels,
  HotelierFetch,
  DataHoteliers,
  HotelFetch,
  HotelsObjects,
  ResponseData,
  DataBonus,
} from 'types/apis';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, endpoints } from 'features/api';
import axios from 'axios';
import type { RootState } from 'App/store';



// export const fetchHoteliers = createAsyncThunk<HotelierFetch[]>(
//   'hoteliers/fetchAllHoteliers',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(baseUrl + endpoints.hotels, { credentials: 'include' });
//       if (!response.ok) {
//         throw new Error('Failed to fetch hoteliers');
//       }
//       const data = (await response.json()) as DataHoteliers;
//        const uniqueOwners = new Set<string>();
//        const hoteliers: HotelierFetch[] = [];

//        data.data.hotels.forEach(({ owner, status }: HotelierFetch) => {
//          if (owner && !uniqueOwners.has(owner)) {
//            uniqueOwners.add(owner);
//            hoteliers.push({ owner, status });
//          }
//        });
//        return hoteliers;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const fetchHoteliers = createAsyncThunk(
  'hoteliers/fetchAllHoteliers',
  async (_, { rejectWithValue, getState }) => {
    try {
       const authToken = getState() as RootState;

       const response = await axios.get(
         `${baseUrl}/acsess-to-admin${endpoints.hoteliers}`,
         {
           headers: {
             'Content-Type': 'application/json; charset=UTF-8',
             Authorization: `Bearer ${authToken.enterToken.token!}`,
           },
           withCredentials: true,
         }
       );
      console.log('response', response)
      //  const data = response.data as DataHoteliers;
    
      // const uniqueOwners = new Set<string>();
      // const hoteliers: HotelierFetch[] = [];

      // data.data.hotels.forEach(({ owner, status }: HotelierFetch) => {
      //   if (owner && !uniqueOwners.has(owner)) {
      //     uniqueOwners.add(owner);
      //     hoteliers.push({ owner, status });
      //   }
      // });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchHotelsById = createAsyncThunk<HotelsObjects, string>(
  'hoteliers/fetchHotelsById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl + endpoints.hotels}/get-hotels-by-id-hotelier/${id}`,
        { credentials: 'include' }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = (await response.json()) as DataHotels;
      const hotelsByHotelier: HotelFetch = data.data.result.map(({ objectName }) => objectName);
      return { ownerId: id, hotels: hotelsByHotelier };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const fetchBonus = createAsyncThunk<ResponseData, DataBonus>(
  'hoteliers/fetchBonus',
  async (bonusData: DataBonus, { rejectWithValue, getState }) => {
    try {
      const authToken = getState() as RootState

      const response = await axios.patch(
        `${baseUrl}/acsess-to-admin${endpoints.bonus}`,
        bonusData,
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${authToken.enterToken.token!}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data as ResponseData;

      return data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


