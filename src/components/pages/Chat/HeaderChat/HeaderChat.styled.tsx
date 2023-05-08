import styled from 'styled-components/macro';

export const Wrapper = styled.div`
display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 9px;

  width: 154px;
  height: 152px;
  padding: 24px 0 31px;

  background: ${({ theme }) => theme.colors.white};
  border: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 10px 10px 0px 0px;
`;

export const Text = styled.p`
width: 109px;
margin: 0px auto 0;

  font-family: ${({ theme }) => theme.fonts.segoe};
  font-weight: 700;
  font-size: 15px;
  line-height: 20px/15px;
  text-align: center;

  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Img = styled.img`
display: flex,
 justify-content: center,
  width: 49.69px;
  height: 49.96px;
`;


