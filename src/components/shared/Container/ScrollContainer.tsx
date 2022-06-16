import { useAppSelector } from 'hooks/redux/hooks';
import { selectModalCount } from 'redux/slices';
import { PropsWithChildren } from 'react';
import { ScrollContainerStyled } from './Container.styled';

export const ScrollContainer = (props: PropsWithChildren) => {
  const modalCount = useAppSelector(selectModalCount);
  const isModalOpen = modalCount > 0;

  return <ScrollContainerStyled isModalOpen={isModalOpen} {...props} />;
};
