export type HotelierFetch = {
  owner: string
  status: string;
};

export type HotelFetch = string[]
  
export type DataHoteliers = {
  code: number;
  data: { hotels: [] };
  status: string;
};

export type DataHotels = {
  code: number;
  data: { result: [] };
  status: string;
};

export type Hoteliers = {
  owner: string;
  status: string;
  hotels?: string[] | undefined;
}[];

export type HoteliersState = {
  hoteliers: Hoteliers;
  isLoading: boolean;
  error: null | unknown;
};

export type HoteliersSelector = {
  hoteliers: {
    hoteliers: [];
    isLoading: boolean;
    error: null | unknown
  };
};

export type HotelsObjects = {
  ownerId: string;
  hotels: HotelFetch;
};


export type Data = {
  owner: string;
  hotels: string[];
  status: string;
};

