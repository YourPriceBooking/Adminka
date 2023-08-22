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
  amount?: number | undefined;
}[];

export type HoteliersState = {
  hoteliers: Hoteliers;
  isLoadingHoteliers: boolean;
  isLoadingHotels: boolean;
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

export type ResponseData = {
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

export type DataBonus = {
  id: string;
  amount: number;
};


