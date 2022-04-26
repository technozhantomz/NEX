import {
  CardFormButton,
  styled,
  Text,
  Checkbox as UiCheckbox,
  Form as UiForm,
  Option as UiOption,
  Select as UiSelect,
  Space as UiSpace,
  Typography as UiTypography,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const GeneralSettingsCard = styled.div`
  .ant-form-horizontal {
    text-align: left;
    letter-spacing: 0px;
    color: ${colors.textColor};
    margin-left: 30px;
    height: 500px;
    ${breakpoint.xs} {
      position: relative;
    }
  }
`;

export const GeneralTabForm = styled(UiForm)`
  margin-top: 24px;
`;

export const LanguageFormItem = styled(UiForm.Item)`
  width: 90%;
  margin-top: 15px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  opacity: 1;
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
export const LabelText = styled(Text)`
  font-weight: 400;
`;
export const Select = styled(UiSelect)``;

export const FormItem = styled(UiForm.Item)`
  margin-top: 15px;
  margin-bottom: 5px;
`;
export const FaucetURL = styled(Text)`
  text-align: left;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
`;

export const FaucetSpace = styled(UiSpace)`
  margin-top: 30px;
  gap: 15px;
`;

export const SaveButton = styled(CardFormButton)`
  margin-top: 50px;
  ${breakpoint.xs} {
    position: absolute;
    right: 30px;
    bottom: 50px;
    width: 25%;
  }
`;

export const TransferCheckbox = styled(UiCheckbox)`
  padding-left: 10px;
`;

export const Checkbox = styled(UiCheckbox)``;

export const Option = styled(UiOption)``;

export const Space = styled(UiSpace)``;

export const Typography = styled(UiTypography)``;
