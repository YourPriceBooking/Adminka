import { useAppDispatch, useAppSelector } from 'components/App';
import { useCallback } from 'react';
import { selectDev, toggleDev } from 'redux/slices';
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
