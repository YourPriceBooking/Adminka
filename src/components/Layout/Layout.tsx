import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { usePageTransition } from 'hooks/ui/transitions/usePageTransition';
import { AnimatedContainer } from 'components/shared/AppRouter/AnimatedContainer';
import { AppBar } from 'components/shared/AppBar';
import { Main } from './Layout.styled';

export const Layout = () => {
  const { onAnimationEnd, show } = usePageTransition();
  return (
    <>
      <AppBar />

      <Main>
        <AnimatedContainer className={show ? 'fadeOut' : 'fadeIn'} onAnimationEnd={onAnimationEnd}>
          <Suspense>
            <Outlet />
          </Suspense>
        </AnimatedContainer>
      </Main>
    </>
  );
};
