import { KeyInput } from "../../../../common/components";
import {
  CardFormButton,
  Form,
  styled,
  Input as UiInput,
  Text as UiText,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

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
  ${mixIns.borderRadius}
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

export const Label = styled(UiText)`
  .anticon-info-circle {
    margin: 0 15px;
    color: ${colors.warningColor};
  }
`;

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
  border-radius: 4px;
  border: 1px solid ${colors.borderColorBase};
`;

export const NoKey = styled.div`
  color: ${colors.errorColor};
  margin-top: 8px;
`;

export const SubmitButton = styled(CardFormButton)`
  margin: 0;
  min-width: 240px;
`;

export const PublicKeyWrapper = styled.div`
  margin: 25px 0;
`;

export const PublicKey = styled.span`
  display: block;
  word-break: break-word;
  .copy-publickey {
    margin-left: 15px;
    color: ${colors.lightText};
  }
`;

export const GeneratedKeyInput = styled(KeyInput)`
  height: 50px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 4px;
  border: 1px solid ${colors.borderColorBase};
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
  ${breakpoint.sm} {
    width: 50%;
  }
`;

export const DownloadWraper = styled.div`
  width: 100%
  display: flex;
  flex-direction: column;
  ${breakpoint.sm} {
    width: 50%;
  }
`;

export const DownloadLink = styled.a`
  margin: 0 auto 18px;
  font-size: 16px;
  display: block;
  text-align: center;
`;
export const DownloadInfo = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .anticon {
    margin-right: 10px;
    color: ${colors.warningColor};
  }
`;
export const DownloadInfoText = styled.span``;
