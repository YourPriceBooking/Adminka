import { useAppDispatch, useAppSelector } from 'App';
import { selectDev, toggleDev } from 'features/countries';
import { useCallback } from 'react';
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
