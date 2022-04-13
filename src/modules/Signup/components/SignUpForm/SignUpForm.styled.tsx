import {
  CardFormButton,
  CardFrom,
  styled,
  Checkbox as UICheckbox,
  Input as UIInput,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const GeneratedPassordInput = styled(UIInput.Password)`
  .ant-input-password-icon {
    color: #b9b9b9;
    display: flex;
    justify-content: space-between;
    width: 38px;
  }
`;

export const Checkbox = styled(UICheckbox)`
   {
    align-items: flex-start;
    .ant-checkbox-inner {
      width: 30px;
      height: 30px;
      &::after {
        left: 35%;
      }
    }
    .p-text {
      margin-top: 8px;
    }
  }
  ${breakpoint.xs} {
     {
      align-items: flex-start;
      .p-text {
        margin-top: 0px;
      }
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        &::after {
          left: 25%;
        }
      }
    }
  }
  .ant-checkbox + span {
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 16px;
    }
  }
`;

export const SignupForm = styled(CardFrom)`
  .ant-input,
  .ant-input-affix-wrapper {
    height: 100%;
    ${breakpoint.sm} {
      padding-left: 30px;
    }
  }
  .ant-form-item-control-input-content {
    height: 40px;
    ${breakpoint.sm} {
      height: 50px;
    }
  }
  .ant-form-large .ant-form-item-control-input {
    width: 539px;
  }
  .checkbox-item {
    height: 20px;

    ${breakpoint.sm} {
      height: 10px;
    }
    .ant-form-item-control-input-content {
      height: 80%;
    }
  }
  .create-button {
    margin-top: 35px;
    ${breakpoint.sm} {
      margin-top: 65px;
    }
  }
  .ant-row.ant-form-item.ant-form-item-with-help.checkbox-item.ant-form-item-has-error {
    height: 50px;
  }
`;
export const SignupFormButton = styled(CardFormButton)`
  width: 255px;
  height: 35px;
  ${breakpoint.sm} {
    width: 400px;
    height: 45px;
  }
`;

export const FormItem = styled(CardFrom.Item)``;
