import {
  CardFormButton,
  styled,
  Form as UiForm,
  Option as UiOption,
  Select as UiSelect,
  Text as UiText,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const SecuritySettingsCard = styled.div`
  .ant-form-horizontal {
    text-align: left;
    color: ${colors.textColor};
    height: 500px;
    margin: 20px;
    ${breakpoint.xs} {
      margin-left: 30px;
    }
  }
`;

export const SecurityTabForm = styled(UiForm)`
  margin-top: 24px;
`;

export const LockWalletFormItem = styled(UiForm.Item)`
  width: 100%;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    width: 100%;
    height: 40px;
    padding: 0 11px;
    align-items: center;
    ${breakpoint.xs} {
      height: 50px;
    }
  }
  ${breakpoint.xs} {
    width: 350px;
    margin: 15px 0;
  }
`;

export const LabelText = styled(UiText)`
  font-weight: 400;
`;

export const Select = styled(UiSelect)``;

export const Option = styled(UiOption)``;

export const SaveButton = styled(CardFormButton)`
 margin-top: 40px;
  width: 255px;
  height: 35px;
  ${breakpoint.xs} {
    position: absolute;
    right: 30px;
    bottom: 50px;
    width: 290px;
    height: 45px;
  }
  }
`;

export const BtnDiv = styled.div``;
