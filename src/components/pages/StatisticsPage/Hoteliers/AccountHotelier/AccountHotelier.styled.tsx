import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  margin-top: 26px;

  > div:nth-of-type(1) {
    gap: 18px;
    margin-bottom: 16px;
  }

  > div:nth-of-type(2) {
    gap: 12px;
    margin-bottom: 8px;
  }

  > div:nth-of-type(3) {
    gap: 9px;
    margin-bottom: 20px;
  }

  > div:nth-of-type(4) {
    gap: 15px;
  }
`;

export const Inner = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe}
  font-weight: 600;
  font-size: 13px;
  line-height: 17px/13px;

  color: ${({ theme }) => theme.colors.textAccent}
`;

export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.segoe}
  font-weight: 600;
  font-size: 13px;
  line-height: 17px/13px;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.textThird}
`;

export const SubTitle = styled.p`
   font-family: ${({ theme }) => theme.fonts.segoe}
  font-weight: 700;
  font-size: 12px;
  line-height: 16px/12px;

      margin-bottom: 10px;

  color: rgba(101, 101, 101, 0.5);
`;

export const SecondaryText = styled.p`
   font-family: ${({ theme }) => theme.fonts.segoe};
font-weight: 600;
font-size: 10px;
line-height: 13px/10px;

color: ${({ theme }) => theme.colors.textThird}
`;

export const Input = styled.input`
  background: ${({ theme }) => theme.colors.bgColorInput};
  border: 0.1px solid ${({ theme }) => theme.colors.textThird};

  width: 92px;
height: 24px;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.bg.buttonAddDirHotelier};;
  border-radius: 17px;
  border: none;

  font-family: ${({ theme }) => theme.fonts.segoe}
  font-weight: 700;
  font-size: 16px;
  line-height: 21px/16px;

  padding: 16px 35px;

  color: #006c0b;
`;