import { CardFormButton, CardFrom, Form, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const LoginForm = styled(CardFrom)`
  text-align: center;
  .ant-form-item-control-input-content {
    height: 50px;
  }
  .ant-input,
  .ant-input-affix-wrapper {
    height: 100%;
    padding-left: 30px;
  }
  .ant-form-large .ant-form-item-control-input {
    width: 539px;
  }
`;

export const LoginFormButton = styled(CardFormButton)`
  height: 100%;
  width: 100%;
`;

export const ButtonDiv = styled.div`
  width: 90%;
  height: 35px;
  ${breakpoint.sm} {
    width: 399px;
    height: 45px;
  }
  margin: 35px auto;
`;
