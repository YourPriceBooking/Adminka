import styled from 'styled-components/macro';

export const HeaderPost = styled.div``;

export const PostContent = styled.div`
  & .title,
  & .text {
    width: 100%;
  }

  & .text {
    height: calc(100vh - 20rem);
  }

  & input,
  & textarea {
    width: inherit;
    height: inherit;
    padding: 1rem;
    font-size: 2rem;
    font-weight: 600;
    outline: none;
    border: none;
    border-bottom: 1px solid #000;
  }

  & .description::placeholder {
    font-size: 1rem;
    font-weight: 500;
  }

  & .description {
    padding: 0.5rem;
    font-size: 1rem;
  }

  & textarea {
    resize: none;
  }
`;
