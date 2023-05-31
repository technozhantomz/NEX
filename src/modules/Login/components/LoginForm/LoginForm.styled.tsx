import { CardForm, CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const LoginForm = styled(CardForm)`
  .ant-form-item {
    margin-bottom: 20px;
  }
  .ant-form-item-control-input-content {
    height: 40px;
  }
  .ant-form-item.checkbox .ant-form-item-control-input-content {
    height: 24px;
  }
  .ant-input,
  .ant-input-affix-wrapper,
  .ant-select,
  .ant-select-selector {
    height: 100% !important;
  }
  .ant-form-large .ant-form-item-control-input {
    width: 539px;
  }
  .ant-select-selector {
    ${mixIns.borderRadius} !important;
  }
  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }
  ${breakpoint.sm} {
    padding-top: 16px;
    .ant-form-item-control-input-content {
      height: 50px;
    }
    .ant-form-item.checkbox .ant-form-item-control-input-content {
      height: 24px;
    }
    .ant-input,
    .ant-input-affix-wrapper {
      padding-left: 30px;
    }
    .ant-select-selector {
      padding-left: 30px !important;
    }
  }
`;

export const WalletLockLabel = styled.p`
  font-weight: 400;
`;

export const LoginButton = styled(CardFormButton)`
  height: 100%;
  width: 100%;
`;

export const LoginButtonContainer = styled.div`
  width: 90%;
  height: 35px;
  margin: 25px auto;
  ${breakpoint.sm} {
    width: 399px;
    height: 45px;
    margin: 35px auto;
  }
`;
