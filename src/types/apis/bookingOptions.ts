export type BookingOptionsData = {
  result: number;
};

export type ResponseBookingOptionsData = {
  code: number;
  result: number;
  status: string;
};

export type BookingOptionsState = {
  result: number;
  isLoadingObjects: boolean;
  error: null | unknown;
};
