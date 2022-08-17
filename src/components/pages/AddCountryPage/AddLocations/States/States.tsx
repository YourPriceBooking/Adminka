import { logRender } from 'common/utils';
import { AddStateForm } from './AddStateForm';
import { StatesStyled } from './States.styled';
import { StatesList } from './StatesList/StatesList';

export const States = () => {
  logRender('States');

  return (
    <StatesStyled>
      <StatesList />

      <AddStateForm />
    </StatesStyled>
  );
};
