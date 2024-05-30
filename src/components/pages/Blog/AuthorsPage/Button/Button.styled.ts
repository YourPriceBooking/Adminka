import styled from 'styled-components/macro';

export const ButtonContainer = styled.button`
 display: flex;
  background: #6AFF79;
  color: #4C4C4C;
  padding: 12px 6px 9px 2px;
  border-radius: 9px;
  max-height: 51px;
  font-size: 12px;
  font-weight: bold;
  max-width: 70px;
  margin-right: 6px;
  border: 1px solid #4C4C4C
  text-transform: capitalize
  &:hover,
  &:disabled {
    color: rgba(5, 109, 16, 1);
  }
`;
