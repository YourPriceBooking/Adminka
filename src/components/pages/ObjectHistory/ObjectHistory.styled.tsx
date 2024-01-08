import styled from 'styled-components/macro';

export const DivObjectHistoryMain = styled.div`
  box-sizing: border-box;
  margin: 36px 30px;

  background: #ffffff;
  border: 1px solid #626367;
  border-radius: 10px;
`;

export const HObject = styled.h2`
  font-weight: 900;
  font-size: 33px;
  line-height: 45px;
  text-align: center;
  margin: 30px auto;
  color: rgba(0, 107, 190, 0.3);
`;
export const DivContent = styled.div`
  width: 56%;
  margin: 0 auto;
`;
export const DivButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 21px 0;
`;
export const ButtonSubmit = styled.button<{ isSubmitted: boolean }>`
  align-items: center;
  background: ${props => (props.isSubmitted ? '#A4A5AE' : '#0090FF')};
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 33px;
  width: 379px;
  height: 59px;
  font-weight: 700;

  color: #ffffff;
  border: none;
  outline: none;

  &:hover {
    background: ${props => (props.isSubmitted ? '#A4A5AE' : 'rgba(0, 144, 255, 0.8)')};
  }

  &:active {
    background: ${props => (props.isSubmitted ? '#A4A5AE' : 'rgba(0, 144, 255, 0.7)')};
  }
`;

export const InputData = styled.input`
  width: 195px;
  height: 41px;
  background: #ffffff;
  border: 1px solid #787878;
  border-radius: 10px;
  margin: 10px auto;
  text-align: center;
  font-weight: 700;
  font-size: 13px;
  line-height: 17px;
  color: #555555;

  ::placeholder {
    color: #aeafbc;
  }
`;

export const LabelDataTest = styled.label`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #656565;
  position: relative;
  top: -3px;
`;
export const InputCheckData = styled.input`
  appearance: none;
  margin-right: 15px;
  width: 17px;
  height: 18px;

  background: #ffffff;
  border: 1px solid #6e6e6e;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
`;

export const ImgDoneData = styled.img`
  position: relative;
  top: -3px;
  right: 286px;
`;

export const DivAdressChat = styled.div`
  display: flex;
  gap: 120px;
`;

export const DivItemsOption = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 20px auto -40px auto;
  width: 800px;
`;

export const ButtonTranslation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 50px 350px 0;
`;
