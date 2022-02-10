import {
  colors,
  styled,
  Form as UiForm,
  Input as UiInput,
} from "../../../../ui/src";

export const FormContainer = styled.div`
  padding: 10px;
`;

export const Form = styled(UiForm)`
  .ant-form-item-has-error .ant-input-prefix {
    color: ${colors.textColor};
  }
  .ant-form-item-with-help .ant-form-item-explain {
    margin-top: 10px;
    min-height: 0;
  }
`;

export const FormItem = styled(UiForm.Item)`
  margin-bottom: 10px;
`;

export const InputNumber = styled(UiInput)`
  height: 65px;
  width: 100%;
  font-size: 20px;
  border-radius: 4px;
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
