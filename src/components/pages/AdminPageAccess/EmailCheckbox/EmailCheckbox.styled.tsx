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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 40px;
  }

  & label {
    align-self: flex-start;
  }

  & input {
    position: relative;
    width: 40px;
    height: 40px;
    border: 1px solid #6e6e6e;
    box-shadow: 0px 0px 2.94922px 0.737304px rgba(0, 0, 0, 0.25);
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
  }

  & input:checked:before {
    content: '';
    position: absolute;
    left: 10px;
    top: 10px;
    width: 21px;
    height: 14px;
    border: 4px solid #0090ff;
    border-radius: 2px;
    border-top: none;
    border-right: none;
    transform: rotate(310deg);
  }
  & input:checked{
    border:1px solid #6DBFFE;
  }

  & input:hover {
    border-color: #6dbffe;
    box-shadow: 0px 0px 2.94922px 0.737304px rgba(77, 144, 254, 0.5);
  }
`;
