import { useGetStatesQuery } from 'features/states';
import { AddStateForm } from './AddStateForm';
import { StatesStyled } from './States.styled';
import { StatesList } from './StatesList/StatesList';

export const States = () => {
  useGetStatesQuery();

  return (
    <StatesStyled>
      <StatesList />

      <AddStateForm />
    </StatesStyled>
  );
};
