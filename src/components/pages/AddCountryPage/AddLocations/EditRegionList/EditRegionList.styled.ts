import styled from 'styled-components/macro';

export const EditRegionListStyled = styled.ul``;

export const EditLocationsItemStyled = styled.li`
  display: flex;
  align-items: center;

  padding: 9px 0 18px 30px;
  border-bottom: 5px solid ${({ theme }) => theme.colors.border.list};
`;

export const EditLocationButton = styled.button`
  background-color: blue;
  padding: 10px 20px;
`;

export const RegionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 10px 20px;
`;

export const EditRegionFormStyled = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;
