import { FormDisclamer as UiFormDisclamer } from "..";
import { CardForm, CardFormButton, Form, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";

export const WithdrawForm = styled(CardForm)`
  .form-input {
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 20px;
    }
  }
`;

export const WithdrawFormAssetAmount = styled(CardForm.Item)`
  .ant-input-affix-wrapper {
    padding: 0;
    .ant-input-prefix {
      min-width: 135px;
      width: 33%;
    }
    .ant-input {
      text-align: right;
      direction: ltr;
      padding-right: 30px;
      font-size: 16px;
      ${breakpoint.sm} {
        font-size: 20px;
      }
    }
    .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
      .ant-select-selector {
      border-color: transparent !important;
    }
  }
`;
export const WithdrawFormAsset = styled.div`
  width: 100%;
  margin-bottom: 0;
  &.ant-form-item-has-error
    .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: none !important;
  }
`;

export const Fee = styled.p`
  margin-bottom: 24px;
  font-size: 12px;
  ${breakpoint.sm} {
    font-size: 14px;
  }
`;

export const WithdrawFormButton = styled(CardFormButton)`
  width: 100%;
`;

export const FormItem = styled(Form.Item)`
  width: 255px;
  margin-left: auto;
  margin-right: auto;
  height: 35px;
  ${breakpoint.sm} {
    width: 399px;
    height: 44px;
  }
`;

export const ButtonFormItem = styled(FormItem)`
  margin-bottom: 0;
`;

export const FormDisclamer = styled(UiFormDisclamer)`
  margin-top: 25px;
  ${breakpoint.sm} {
    margin-top: 35px;
  }
`;
