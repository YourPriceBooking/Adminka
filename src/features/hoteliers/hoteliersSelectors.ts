import type { RootState } from "App/store";


export const selectorHoteliers = (state: RootState) => state.hoteliers
export const selectorBonus = (state: RootState) =>
    state.hoteliers.hoteliers.map(hotelier => {
        const obj = { amount: hotelier.amount, owner: hotelier.owner };
        return obj
  });



