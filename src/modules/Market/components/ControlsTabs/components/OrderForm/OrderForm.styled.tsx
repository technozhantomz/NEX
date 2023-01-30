import {
  Radio,
  styled,
  //CardFormButton as UiButton,
  Form as UiForm,
  Input as UiInput,
  Slider as UiSlider,
  WalletOutlined,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";
import { mixIns } from "../../../../../../ui/src/mixins";

export const FormContainer = styled.div``;
export const Form = styled(UiForm)``;
export const FormItem = styled(UiForm.Item)`
  margin-bottom: 0;
`;
export const AmountFormItem = styled(FormItem)`
  margin-bottom: 25px;
`;
export const InputNumber = styled(UiInput)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  height: 50px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 10px;
  padding: 16px 20px;
  ${mixIns.borderRadius}
  .ant-input-suffix {
    font-size: 18px;
  }
`;
export const PriceSlider = styled(UiSlider)`
  margin-bottom: 25px;
`;

export const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
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

export const PriceRadioGroup = styled(Radio.Group)`
  width: 100%;
  display: flex;
  height: 50px;
  margin-bottom: 8px;
  .ant-radio-button-wrapper:first-child {
    border-radius: 4px 0 0 4px;
  }
  .ant-radio-button-wrapper:last-child {
    border-radius: 0 4px 4px 0;
  }
  .ant-radio-button-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    ${breakpoint.xxl} {
      padding: 0 6px;
    }
  }
  .ant-radio-button-wrapper > .ant-radio-button + span {
  }
`;
export const PriceRadioButton = styled(Radio.Button)`
  flex: 1 1 20%;
`;
