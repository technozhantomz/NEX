import {
  CardFormButton,
  Form,
  styled,
  Input as UiInput,
  Text as UiText,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { CopyIcon as UiCopyIcon } from "../../../../ui/src/icons";

export const KeyManagementCard = styled.div`
  .ant-form-horizontal {
    text-align: center;
    height: 856px;
    ${breakpoint} {
      margin-left: 30px;
      margin-right: 30px;
      text-align: left;
    }
  }
`;

export const KeyManagementForm = styled(Form)`
  margin-top: 24px;
`;

export const PasswordFormItem = styled(Form.Item)`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border-radius: 4px;
  align-items: center;
  ${breakpoint.xs} {
    width: 50%;
    align-items: center;
    margin-left: 0;
  }
  .ant-input-affix-wrapper > input.ant-input {
    font-size: 12px;
    ${breakpoint.xs} {
      font-size: 14px;
    }
  }
`;

export const LabelWrapper = styled.div`
  margin-top: 35px;
  margin-bottom: 25px;
`;

export const Label = styled(UiText)``;

export const CheckBoxGroup = styled(Form.Item)`
  margin-bottom: 50px;
`;

export const MemoWarning = styled.div`
  color: ${colors.errorColor};
  margin-top: 5px;
`;

export const ButtonFormItem = styled.div`
  margin-bottom: 20px;
  ${breakpoint.xs} {
    width: 50%;
  }
`;

export const PasswordInput = styled(UiInput.Password)`
  height: 50px;
`;

export const GeneratedKeyInput = styled(UiInput.Password)`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  .ant-input-password-icon {
    color: #b9b9b9;
    display: flex;
    justify-content: space-between;
    width: 38px;
  }
  ${breakpoint.xs} {
    width: 50%;
  }
  .ant-input {
    font-size: 10px;
    ${breakpoint.xs} {
      font-size: 14px;
    }
  }
`;

export const CopyIcon = styled(UiCopyIcon)`
  color: #b9b9b9;
  fill: #b9b9b9;
`;

export const SubmitButton = styled(CardFormButton)``;
