import styled from 'styled-components/macro';

export const DistrictInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 8px;
`;

export const EditDistrictFormStyled = styled.form`
  display: flex;
  align-items: flex-start;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: 20px;
  }
`;

export const EditDistrictPhotoURLInput = styled.input`
  width: 240px;
`;
