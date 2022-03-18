import {
  Form as form,
  Input as input,
  styled,
  Text as text,
} from "../../../../ui/src";

export const KeyManagementCard = styled.div`
  .ant-form-horizontal {
    color: var(---text-icons);
    text-align: left;
    font: normal normal medium 14px/17px Inter;
    letter-spacing: 0px;
    color: #212121;
    opacity: 1;
    margin-left: 30px;
    height: 856px;
    margin-left: 30px;
    @media (max-width: 500px) {
      margin: 5px;
    }
  }
`;

export const KeyManagementForm = styled(form)``;

export const LockWalletFormItem = styled(form.Item)`
  width: 50%;
  margin-top: 20px;
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  @media (max-width: 500px) {
    width: 100%;
  }
  .ant-input-affix-wrapper > input.ant-input {
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }
`;

export const Text = styled(text)``;

export const BtnFormItem = styled(form.Item)``;

export const Input = styled(input.Password)`
  height: 50px;
`;

export const SecondItem = styled(form.Item)``;

export const GeneratedKeyInput = styled(input.Password)`
  height: 50px;
  width: 50%;
  margin-top: 20px;
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1 .ant-input-password-icon {
    color: #b9b9b9;
    display: flex;
    justify-content: space-between;
    width: 38px;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
  .ant-input {
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }
`;
