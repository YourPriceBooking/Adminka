import styled from 'styled-components/macro';

export const HeaderPost = styled.div``;

export const PostContent = styled.div`
  & form {
    padding: 0.5rem;

    & button.submit {
      margin: 1rem 0;
      background: rgb(77, 185, 88);
      border: none;
      color: #fff;
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      padding: 0 20px;
      position: relative;
      transition: background 0.12s ease-out;
      border-radius: 8px;
      font-size: 13px;
      height: 42px;
      width: 30%;

      &:disabled {
        background: rgb(154, 215, 160);
      }
    }
  }

  & .title,
  & .text {
    width: 100%;
  }

  & .text {
    height: calc(-20rem + 85vh);
  }

  & input {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
    display: table-cell;
    padding: 6px 12px;
    border: 1px solid #ccc;
    margin: 0;
  }

  & .prefix input,
  & .input-group-addon.prefix {
    border-radius: 0px 4px 4px 0px;
  }

  & .prefix .input-group-addon {
    border-right: 0;
    border-radius: 4px 0px 0px 4px;
  }

  & .input-group-addon {
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
    display: table-cell;

    &.prefix {
      border-radius: 4px 0px 0px 4px;
      border-right: 0;
    }
  }

  & .articleImage {
    position: relative;
    display: table;
    border-collapse: separate;
    margin-bottom: 0;

    /* Приховати оригінальний input file */
    .input-file {
      display: none;
    }

    /* Стилізуємо кастомний кнопку для вибору файлу */
    .custom-file-upload {
      border: 1px solid #ccc;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
      background-color: #f0f0f0;
      color: #333;
    }

    /* Стилізуємо текст */
    .custom-file-upload span {
      font-size: 16px;
    }

    /* Приховати текст від оригінального input file */
    .input-file + .custom-file-upload {
      display: inline-block;
    }

    /* Стилізуємо підкреслення при наведенні на кнопку */
    .custom-file-upload:hover {
      text-decoration: underline;
    }

    .file-name {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
    }

    & img {
      width: 45%;
    }
  }

  & .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
    margin-bottom: 1rem;
  }

  & .textarea {
    padding-top: 1rem;
    height: calc(100% - 4rem);
  }

  & .smallInput::placeholder {
    font-size: 1rem;
    font-weight: 500;
  }

  & .smallInput {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;
