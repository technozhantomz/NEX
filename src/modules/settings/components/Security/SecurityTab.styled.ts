import {
  Form as form,
  Option as option,
  Select as select,
  styled,
  Text as text,
} from "../../../../ui/src";

export const SecuritySettingsCard = styled.div`
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

export const LockWalletLabel = styled(text)`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const SecurityTabForm = styled(form)``;

export const LockWalletFormItem = styled(form.Item)`
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
    color: var(---text-icons);
    text-align: left;
    font: normal normal normal 16px/20px Inter;
    letter-spacing: 0px;
    color: #212121;
    opacity: 1;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export const Select = styled(select)``;

export const BtnFormItem = styled(form.Item)``;

export const Option = styled(option)``;
