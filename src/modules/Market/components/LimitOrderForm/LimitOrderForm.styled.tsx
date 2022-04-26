import {
  styled,
  CardFormButton as UiButton,
  Form as UiForm,
  Input as UiInput,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const FormContainer = styled.div`
  ${breakpoint.md} {
    padding: 40px 20px 60px 20px;
  }
`;

export const Form = styled(UiForm)``;

export const FormItem = styled(UiForm.Item)``;

export const InputNumber = styled(UiInput)`
  height: 65px;
  width: 100%;
  font-size: 20px;
  margin-bottom: 10px;
  ${mixIns.borderRadius}
  padding: 16px 20px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  &.ant-input-affix-wrapper > input.ant-input {
    height: 100%;
    text-align: right;
    font-size: 20px;
  }
`;

export const FormTitle = styled.h2`
  font-size: 20px;
  padding: 10px 0;
  margin: 0;
  text-align: center;
`;

export const OrderInfo = styled.div``;
export const OderInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormButton = styled(UiButton)``;
