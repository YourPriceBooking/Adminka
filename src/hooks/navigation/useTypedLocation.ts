import { useLocation } from 'react-router-dom';

type LocationProps = {
  state: {
    from: Location;
  };
};

export const useTypedLocation = () => useLocation() as LocationProps;
