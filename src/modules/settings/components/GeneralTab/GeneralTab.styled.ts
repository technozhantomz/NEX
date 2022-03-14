/** @format */

import {
  styled,
  Card as UiCard,
  Text as text,
  Form as form,
  Select as select,
  Space as space,
} from '../../../../ui/src';
import { breakpoint } from '../../../../ui/src/breakpoints';

export const GeneralSettingsCard = styled.div`
  .ant-form-horizontal {
    color: var(---text-icons);
    text-align: left;
    font: normal normal medium 14px/17px Inter;
    letter-spacing: 0px;
    color: #212121;
    opacity: 1;
    margin-left: 30px;
    height: 856px;
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

