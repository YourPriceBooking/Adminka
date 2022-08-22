import { useEffect, useMemo } from 'react';

export const Calendar = () => {
  const stableFunction = () => {};

  const newObject = useMemo(() => ({}), []);
  useEffect(() => {
    console.log(newObject);

    stableFunction();
  }, [newObject]);

  return <div />;
};
