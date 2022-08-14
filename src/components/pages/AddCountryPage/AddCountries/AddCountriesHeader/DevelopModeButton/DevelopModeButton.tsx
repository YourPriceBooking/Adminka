import { useAppDispatch, useAppSelector } from 'App';
import { useCallback } from 'react';
import { selectDev, toggleDev } from 'features/slices';
import { DevButtonStyled } from './DevelopModeButton.styles';

export const DevelopModeButton = () => {
  const appDispatch = useAppDispatch();
  const toggleDeleteButtons = useCallback(() => {
    appDispatch(toggleDev());
  }, [appDispatch]);

  const showDev = useAppSelector(selectDev);

  return (
    <DevButtonStyled onClick={toggleDeleteButtons}>
      {showDev ? 'Dev 👨‍💻' : 'Prod 🤴'}
    </DevButtonStyled>
  );
};
