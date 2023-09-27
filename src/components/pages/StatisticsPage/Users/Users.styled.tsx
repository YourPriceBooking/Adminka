import styled from 'styled-components/macro';


type Prop = {
  padding?: boolean | undefined;
};

export const Wrapper = styled.div<Prop>`
  position: relative;
  padding: ${({ padding }) => (padding ? '21px 54px 79px 62px' : '21px 54px')};

  margin-top: 34px;

  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.border.list};
  border-radius: 9px;
`;