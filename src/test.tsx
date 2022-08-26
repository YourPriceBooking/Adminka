import { useEffect, useMemo } from 'react';

export const Calendar = () => {
  const stableFunction = () => {};

  const newObject = useMemo(() => ({}), []);
  useEffect(() => {
    stableFunction();
  }, [newObject]);

  return <div />;
};
