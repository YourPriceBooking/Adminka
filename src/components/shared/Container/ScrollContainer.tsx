import { useAppSelector } from 'hooks/redux';
import { selectModalCount } from 'redux/slices';
import { PropsWithChildren } from 'react';
import { ScrollContainerStyled } from './Container.styled';

export const ScrollContainer = ({ children }: PropsWithChildren) => {
  const modalCount = useAppSelector(selectModalCount);
  const isModalOpen = modalCount > 0;

  return <ScrollContainerStyled isModalOpen={isModalOpen}>{children}</ScrollContainerStyled>;
};
