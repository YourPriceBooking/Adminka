import { useLocation } from 'react-router-dom';

type LocationState = {
  from: string;
};

export const useFromLocation = () => (useLocation().state as LocationState)?.from;
