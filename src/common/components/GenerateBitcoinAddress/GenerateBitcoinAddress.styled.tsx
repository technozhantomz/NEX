import {
  CardFormButton,
  Col,
  Form,
  styled,
  Form as UIForm,
  Row as UiRow,
} from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const DepositForm = styled(Form)`
  padding-top: 10px;
`;

export const Row = styled(UiRow)`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  height: 65px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  color: var(---text-icons);
  font: normal normal medium 20px/24px Inter;
  letter-spacing: 0px;
  color: #212121;
  font-size: 20px;
`;

export const SelectOptionCol = styled(Col)`
  margin-top: 15px;
  margin-bottom: auto;
`;

export const SonError = styled.span`
  color: ${colors.errorColor};
`;

export const FormItem = styled(UIForm.Item)`
  width: 255px;
  margin-left: auto;
  margin-right: auto;
  ${breakpoint.sm} {
    margin-left: 106px;
    width: 399px;
    height: 45px;
  }
`;

export const Button = styled(CardFormButton)`
  width: 100%;
`;
