import {
  CardFormButton,
  Form,
  styled,
  Input as UiInput,
  Text as UiText,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const KeyManagementCard = styled.div`
  .ant-form-horizontal {
    text-align: center;
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
  ${breakpoint.sm} {
    width: 50%;
    align-items: center;
    margin-left: 0;
  }
  .ant-input-affix-wrapper > input.ant-input {
    font-size: 12px;
    ${breakpoint.sm} {
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

export const ButtonFormItem = styled.div`
  margin-bottom: 20px;
  ${breakpoint.sm} {
    width: 50%;
  }
`;

export const PasswordInput = styled(UiInput.Password)`
  height: 50px;
`;

export const NoKey = styled.div`
  color: ${colors.errorColor};
  margin-top: 8px;
`;

export const SubmitButton = styled(CardFormButton)``;

export const GeneratedKeyInput = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  span.anticon {
    margin-right: 10px;
    ${breakpoint.sm} {
      margin-right: 15px;
    }
  }
  .ant-input {
    font-size: 10px;
    ${breakpoint.sm} {
      font-size: 14px;
    }
  }
`;
