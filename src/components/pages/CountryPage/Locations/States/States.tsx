import { useLazyGetCitiesQuery } from 'features/cities';
import { useLazyGetDistrictsQuery } from 'features/districts';
import { useLazyGetStatesQuery } from 'features/states';
import { ReactNode } from 'react';
import { StatesStyled } from './States.styled';

export const States = ({ children }: { children?: ReactNode }) => {
  const [getStates, { isLoading: isLoadingStates }] = useLazyGetStatesQuery();
  const [getCities, { isLoading: isLoadingCities }] = useLazyGetCitiesQuery();
  const [getDistricts, { isLoading: isLoadingDistricts }] = useLazyGetDistrictsQuery();

  const isPending = isLoadingStates || isLoadingCities || isLoadingDistricts;

  const fetchLocations = () => {
    getStates();

    setTimeout(() => {
      getCities();
    }, 500);

    setTimeout(() => {
      getDistricts();
    }, 1000);
  };

  return (
    <StatesStyled>
      <button type="button" onClick={fetchLocations} disabled={isPending}>
        fetchLocations
      </button>

      {children}
    </StatesStyled>
  );
};
