import styled from 'styled-components/macro';


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  width: 154px;
  height: 367px;

  background: #c4c4c4;
  border-left: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  border-right: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.textPrimary};
  border-radius: 0px 0px 10px 10px;
`;








