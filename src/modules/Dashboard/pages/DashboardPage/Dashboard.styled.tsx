import {
  Button,
  styled,
  Col as UiCol,
  Row as UiRow,
} from "../../../../ui/src/index";
import { mixIns } from "../../../../ui/src/mixins";

export const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const HeaderContainerItem = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
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
  ${mixIns.borderRadius}
  opacity: 1;
`;

export const Buttons = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  opacity: 1;
  font-size: 14px;
  height: 32px;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus,
  &.active {
    background: #e3ebf8 0% 0% no-repeat padding-box;
  }
`;
export const ButtonNames = styled.p`
  text-align: center;
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

export const Row = styled(UiRow)``;

export const Col = styled(UiCol)``;
