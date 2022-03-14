import {
  Button,
  Col as col,
  Row as row,
  styled,
} from "../../../../ui/src/index";

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const HeaderContainerItem = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
  font-size: 25px;
  text-align: center;
  width: 600px;
  // height: 268px;
  margin: 10px;
  padding: 10px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const Btn = styled(Button)`
  height: 32px;
  background: #e3ebf8 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
`;

export const Buttons = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  font-size: 14px;
  height: 32px;
  cursor: pointer;
  // &:hover {
  // background: #E3EBF8 0% 0% no-repeat padding-box;
  // }

  &:hover,
  &:active,
  &:focus {
    background: #e3ebf8 0% 0% no-repeat padding-box;
  }
`;
export const ButtonNames = styled.p`
  color: var(---text-icons);
  text-align: center;
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  font-size: 14px;
  align-items: center;
  padding: 5px;

  @media (max-width: 500px) {
    font-size: 12px;
    padding: 8px;
  }
`;

export const Row = styled(row)``;

export const Col = styled(col)``;
