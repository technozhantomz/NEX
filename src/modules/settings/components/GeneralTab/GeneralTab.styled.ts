import {
  CardFormButton as button,
  Checkbox as checkbox,
  Form as form,
  Option as option,
  Select as select,
  Space as space,
  styled,
  Text as text,
  Typography as typography,
} from "../../../../ui/src";

export const GeneralSettingsCard = styled.div`
  .ant-form-horizontal {
    color: var(---text-icons);
    text-align: left;
    font: normal normal medium 14px/17px Inter;
    letter-spacing: 0px;
    color: #212121;
    opacity: 1;
    margin-left: 30px;
    height: 500px;
    position: relative;
  }
`;

export const LanguageLabel = styled(text)`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const LanguageDiv = styled.div`
  margin-top: 20px;
`;

export const GeneralTabForm = styled(form)``;

export const LanguageFormItem = styled(form.Item)`
  width: 40%;
  margin-top: 20px;
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    width: 100%;
    height: 50px;
    padding: 0 11px;
    align-items: center;
  }
`;

export const Select = styled(select)``;

export const SecondItem = styled(form.Item)``;
export const FaucetURL = styled(text)`
  color: var(---text-icons);
  text-align: left;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
`;

export const FaucetText = styled(space)`
  margin-top: 30px;
`;

export const Button = styled(button)`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25%;
`;

export const Checkbox = styled(checkbox)``;

export const Option = styled(option)``;

export const Space = styled(space)``;

export const Typography = styled(typography)``;

export const Text = styled(text)``;
