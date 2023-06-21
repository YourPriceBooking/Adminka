import styled from 'styled-components/macro';

export const DivText = styled.div`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #006bbe;
`;
export const InputNumber = styled.input`
  width: 284px;
  height: 32px;
  background: #ffffff;
  border: 1px solid #787878;
  border-radius: 10px;
  margin: 12px auto;
`;
export const InputBox = styled.input`
  appearance: none;
  margin-top: 2px;
  width: 12.68px;
  height: 14px;
  border: 1px solid ${({ checked }) => (checked ? '#2C6ACC' : '#CC2C2C')};
  background-color: #ffffff;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.25);
  margin-left: 273px;
  position: relative;
  top: -15px;
`;

export const CheckboxLabel = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  width: 240px;
  color: #656565;
`;
export const ImgCheckBox = styled.img`
  position: relative;
  top: -16px;
  left: -11.5px;
`;
