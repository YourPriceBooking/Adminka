import styled from 'styled-components/macro';

export const UploadContainer = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  & .formUpload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: rgba(235, 237, 254, 1);
    padding: 2rem;
    border-radius: 16px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  & input[type='file'] {
    margin-bottom: 1rem;
  }

  & input[type='text'] {
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 1rem;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s ease;

    &:focus {
      border-color: #2deb6a;
    }
  }

  & button.submit {
    background: rgba(217, 217, 217, 1);
    border: none;
    color: #000;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    padding: 0.8rem 1.4rem;
    border-radius: 10px;
    font-size: 15px;
    transition: background 0.12s ease-out;

    &:hover {
      color: #4c4c4cb0;
    }

    &:disabled {
      color: #4c4c4cb0;
      cursor: not-allowed;
      background: rgba(217, 217, 217, 1);
    }
  }

  & button.close {
    background: none;
    right: 0;
    top: 0;
    position: absolute;
    border: none;
    color: #000;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    padding: 0.8rem 1.4rem;
    border-radius: 10px;
    font-size: 15px;
    transition: background 0.12s ease-out;

    &:hover {
      color: #4c4c4cb0;
    }

    &:disabled {
      color: #4c4c4cb0;
      cursor: not-allowed;
      background: rgba(217, 217, 217, 1);
    }
  }
  & .fileName {
    font-size: 0.9rem;
    color: #666;
    margin-top: -0.3rem;
    margin-bottom: 1rem;
    text-align: left;
  }
`;

export const CategoryButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 1rem 0 2rem 0;

  & button {
    background: #fff;
    border: 1px solid #000;
    border-radius: 16px;
    padding: 6px 18px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.15s ease;

    &:hover {
      background: #2deb6a;
      color: #000;
      border-color: #2deb6a;
    }

    &.active {
      background: #2deb6a;
      border-color: #2deb6a;
    }
  }
`;
