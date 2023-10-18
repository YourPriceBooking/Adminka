import styled from 'styled-components/macro';
import { slideInLeft, slideOutLeft } from 'App/App.styled';

export const HomeStyled = styled.section`
  padding: 74px 0;

  &.page-fade-enter {
    animation: ${slideInLeft} 0.2s forwards;
  }

  &.page-fade-exit {
    animation: ${slideOutLeft} 0.2s forwards;
  }
`;

export const Header = styled.header`
  
`
export const PostsList = styled.section`
  margin: 0 auto;   
  padding-top: 30px; 
  display: flex;  
  flex-wrap: no-wrap;
  flex-direction: column;
  align-items: center;  
  gap: 30px;
`

export const PostWrapper = styled.article`
  width: 600px;
  padding: 28px 22px;
  border-radius: 4px;
  background: #effdf1;
  box-shadow: 0px 0px 4px 0px #00000025;
  display: grid;
  grid-template-columns: 1fr 1fr; 
`;

export const PostTitle = styled.h2`
  margin-bottom: 5px;
  color: #4c4c4c;
  font-family: Segoe UI;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;