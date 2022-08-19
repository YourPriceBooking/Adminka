import { AddStateForm } from './AddStateForm';
import { StatesStyled } from './States.styled';
import { StatesList } from './StatesList/StatesList';

export const States = () => (
  <StatesStyled>
    <StatesList />

    <AddStateForm />
  </StatesStyled>
);
