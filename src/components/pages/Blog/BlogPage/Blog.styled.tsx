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

export const BlogContainer = styled.div`
  padding-top: 1rem;
  background: #fff;
  margin: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 9px;
`;

export const Header = styled.header`
  background: rgba(77, 185, 88, 1);
  box-shadow: 0px 0px 4.069767475128174px 0px rgba(0, 0, 0, 0.25);
  color: #fff;
  font-size: 23px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  padding: 0.5rem 3rem 0.5rem 0.5rem;

  & div {
    display: flex;
    align-items: center;
  }
`;

export const BlogWrapper = styled.div`
  position: relative;
`;

export const PopUp = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000090;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .content {
    background-color: rgb(255, 255, 255);
    padding: 30px;
    border-radius: 4px;
    min-width: 95%;
    min-height: 95vh;
  }
`;

export const PostsList = styled.section`
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  flex-wrap: no-wrap;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const PostDescription = styled.div`
  font-size: 11px;
  font-weight: 400;
  line-height: 14.63px;
  text-align: left;

  & p {
    width: inherit;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const PostWrapper = styled.article`
  width: 600px;
  padding: 28px 22px;
  border-radius: 4px;
  background: #effdf1;
  box-shadow: 0px 0px 4px 0px #00000025;
  display: grid;
  grid-template-columns: 1fr 1fr;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 4.069767475128174px 0px #00000040;
    // border: 0.5px solid #000000;
    background: #d5efd8;
  }
`;

export const PostTitle = styled.h2`
  margin-bottom: 5px;
  color: #4c4c4c;
  font-family: Segoe UI;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  width: inherit;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  & a {
    color: #4c4c4c;
  }
`;
