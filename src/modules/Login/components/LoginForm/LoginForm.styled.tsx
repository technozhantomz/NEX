import { CardForm, CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const LoginForm = styled(CardForm)`
  .ant-form-item {
    margin-bottom: 20px;
  }
  .ant-form-item-control-input-content {
    height: 40px;
  }
  .ant-input,
  .ant-input-affix-wrapper {
    height: 100%;
  }
  .ant-form-large .ant-form-item-control-input {
    width: 539px;
  }
  ${breakpoint.xs} {
    padding-top: 16px;
    .ant-form-item-control-input-content {
      height: 50px;
    }
    .ant-input,
    .ant-input-affix-wrapper {
      padding-left: 30px;
    }
  }
`;

export const LoginButton = styled(CardFormButton)`
  height: 100%;
  width: 100%;
  font-size: 12px;
  ${breakpoint.xs} {
    font-size: 16px;
  }
`;

export const LoginButtonContainer = styled.div`
  width: 90%;
  height: 35px;
  margin: 25px auto;
  ${breakpoint.xs} {
    width: 399px;
    height: 45px;
    margin: 35px auto;
  }
`;
