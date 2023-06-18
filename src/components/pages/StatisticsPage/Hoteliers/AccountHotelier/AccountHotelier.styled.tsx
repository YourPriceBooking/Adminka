import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  margin-top: 26px;
`;

export const Inner = styled.div`
  display: flex
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe}
  font-weight: 600;
  font-size: 13px;
  line-height: 17px/13px;

  color: ${({ theme }) => theme.colors.textAccent}
`;

export const Text = styled.p`
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 17px;

  color: #4c4c4c;
`;