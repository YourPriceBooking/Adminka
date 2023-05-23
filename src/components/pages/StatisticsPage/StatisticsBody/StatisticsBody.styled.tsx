import styled from 'styled-components/macro';

export const WrapperBody = styled.ul`
  @media screen and (min-width: 768px) {
    height: 160px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    // column-gap: 60px;
  }
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 21px;
`;


export const TextItem = styled.p`
  margin-right: 25px;

  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 300;
  font-size: 18px;
  line-height: 25px/18px;

  color: ${({ theme }) => theme.colors.black};

  @media screen and (min-width: 350px) {
    font-size: 21px;
    line-height: 25px/21px;
  }

  @media screen and (min-width: 768px) {
  width: 30%;
  }
`;


export const TextSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 400;
  font-size: 18px;
  line-height: 25px/18px;

  color: ${({ theme }) => theme.colors.textAccent};

  @media screen and (min-width: 350px) {
    font-size: 21px;
    line-height: 25px/21px;
  }
`;
