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
    margin-left: 30px;
    height: 500px;
    ${breakpoint.xs} {
      position: relative;
    }
  }
`;

export const SecurityTabForm = styled(UiForm)`
  margin-top: 24px;
`;

export const LockWalletFormItem = styled(UiForm.Item)`
  width: 90%;
  margin-top: 15px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    width: 100%;
    height: 50px;
    padding: 0 11px;
    align-items: center;
  }
  ${breakpoint.xs} {
    width: 40%;
  }
`;

export const LabelText = styled(UiText)`
  font-weight: 400;
`;

export const Select = styled(UiSelect)``;

export const Option = styled(UiOption)``;

export const SaveButton = styled(CardFormButton)`
  margin-top: 50px;
  ${breakpoint.xs} {
    position: absolute;
    right: 30px;
    bottom: 50px;
    width: 25%;
  }
`;
