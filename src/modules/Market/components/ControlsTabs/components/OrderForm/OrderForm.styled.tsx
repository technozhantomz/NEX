import {
  styled,
  //CardFormButton as UiButton,
  Form as UiForm,
  WalletOutlined,
  //  Input as UiInput,
} from "../../../../../../ui/src";
import { colors } from "../../../../../../ui/src/colors";

export const FormContainer = styled.div``;
export const Form = styled(UiForm)``;

export const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const WalletIcon = styled(WalletOutlined)`
  color: ${colors.lightText};
  margin-right: 20px;
  svg {
    width: 25px;
    height: 25px;
  }
`;
export const BalanceValue = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.textColor};
`;
