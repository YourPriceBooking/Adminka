import styled from 'styled-components/macro';

export const ModalContainer = styled.div`
    position: absolute;
    left: 0;
    top: 40px;
    background-color: white;
    border: 1px solid gray;
    min-width: 400px;
    width: 100%;
    height: auto;
    padding: 10px;
    z-index: 10;
    display: flex;
    gap: 20px;
    flex-direction: column;
    

    & ul {
      overflow-y: scroll;
      max-height: 200px;
      scrollbar-width:thin;
      scrollbar-color:#4cb859 #f5f5f5
     
    }

    & ul > li {
    margin-bottom: 10px;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
    }

    & .add-later{
      display: flex;
      justify-content: space-between;
  gap: 10px;

      & input {
      width: 200px;
      }

      & button {
      width 150px;
      background: #4CB859;
      border: none;
      color: #fff;
      cursor: pointer;
      font-family: inherit;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      }
    }
  
`;
