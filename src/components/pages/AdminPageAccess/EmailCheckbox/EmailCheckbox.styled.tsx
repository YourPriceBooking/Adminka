import styled from 'styled-components/macro';


export const EmailCheckboxStyled = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: block;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
  }

  & form {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-between;
    margin-right: 40px;
  }

  & label {
    align-self: flex-start;
  }

  & input {
    width: 40px;
    height: 40px;
    border: 1px solid #6e6e6e;
    box-shadow: 0px 0px 2.94922px 0.737304px rgba(0, 0, 0, 0.25);
    appearance: none;
    -webkit-appearance: none;

    &:hover {
      outline: none;
      border-color: #6dbffe;
      box-shadow: 0px 0px 2.94922px 0.737304px rgba(77, 144, 254, 0.5);
    }
    /* :checked::after {
      content: '555';
      position: absolute;
      top: -5px;
      left: 0;
      font-size: 23px;
      color: green;
    } */
  }
`;
