import styled from 'styled-components/macro';


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 284px;
  margin: 0 auto;

gap: 21px;
`;
export const Label = styled.label`
  border: 1px solid ${({ theme }) => theme.colors.textFourth};
  border-radius: 5px;
  height: 48px;
  font-size: 14px;
  line-height: 1.33;
  font-weight: 700;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  background-color: ${({ theme }) => theme.colors.bg.buttonAddLocation};


`;
export const Input = styled.input`
  height: 45px;
  font-size: 14px;
  line-height: 1.33;
  font-weight: 700;
  border: transparent;
  background-color: transparent;
  outline: transparent;
  font-family: ${({ theme }) => theme.fonts.segoe};
  color: ${({ theme }) => theme.colors.textThird};
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #ebecfe inset;
   
  }
  margin-left: 25px;
`;
export const Button = styled.button`
  margin: 0 auto;
  margin-top: 13px;
  width: 184px;
  height: 184px;
  border-radius: 50%;
  border-color: transparent;
  outline: transparent;
  background-color: ${({ theme }) => theme.colors.bg.buttonAddDirHotelier};
  color: ${({ theme }) => theme.colors.textThird};
  cursor: pointer;

  font-size: 33px;
  line-height: 1.33;
  font-weight: 700;

  :disabled {
    color: ${({ theme }) => theme.colors.white};
  }
  :disabled:hover {
    background-color: ${({ theme }) => theme.colors.bg.buttonAddDirHotelier};
    color: ${({ theme }) => theme.colors.white};
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonLoginHover};
    color: ${({ theme }) => theme.colors.bgTransparent.buttonLogInHover};
  }

  :active {
    background-color: ${({ theme }) => theme.colors.bgTransparent.buttonLoginActive};
  }
`;

export const Accent = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white};
 
`;