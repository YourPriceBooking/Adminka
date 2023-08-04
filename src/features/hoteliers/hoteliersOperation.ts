import type {
  DataHotels,
  HotelierFetch,
  DataHoteliers,
  HotelFetch,
  HotelsObjects,
} from 'types/apis';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, endpoints } from 'features/api';



export const fetchHoteliers = createAsyncThunk<HotelierFetch[]>(
  'hoteliers/fetchAllHoteliers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl + endpoints.hotels, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to fetch hoteliers');
      }
      const data = (await response.json()) as DataHoteliers;
       const uniqueOwners = new Set<string>();
       const hoteliers: HotelierFetch[] = [];

       data.data.hotels.forEach(({ owner, status }: HotelierFetch) => {
         if (owner && !uniqueOwners.has(owner)) {
           uniqueOwners.add(owner);
           hoteliers.push({ owner, status });
         }
       });
       return hoteliers;
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

type DataBonus = {
  id: string,
  amount: number
}

type ResponseData = {
  status: string;
  code: number;
  data: {
    result: {
      finances: {
        currency: string;
        bonus: number;
        money: number;
        total: number;
      };
      _id: string;
      lastName: string;
      firstName: string;
      email: string;
      language: string;
      secretCode: string;
      status: string;
      createdCode: number;
      validCode: number;
    };
  };
};

// type RequestOptionsType = {
//   method: string;
//   credentials: string;
// };

// const requestOptions: RequestOptionsType = {
//   method: 'POST',
//   credentials: 'include',
// };


export const fetchBonus = createAsyncThunk<ResponseData, DataBonus>(
  'hoteliers/fetchBonus',
  async (bonusData: DataBonus, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/acsess-to-admin${endpoints.bonus}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(bonusData),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const data = (await response.json()) as ResponseData;

      console.log('data', data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


