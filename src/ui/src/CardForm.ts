import { Form as AntdForm } from "antd";
import styled from "styled-components";

import { Button } from "./Button";
import { breakpoint } from "./breakpoints";
import { colors } from "./colors";
import { mixIns } from "./mixins";

export const CardFormButton = styled(Button)`
  display: block;
  width: 85%;
  margin: 0 auto;
  font-size: 14px;
  .ant-btn-loading-icon {
    float: right;
  }
  ${breakpoint.sm} {
    width: 70%;
  }
`;
export const CardForm = styled(AntdForm)`
  .ant-input,
  .ant-input-affix-wrapper {
    ${mixIns.borderRadius}
  }
  .ant-form-item-has-success {
    .ant-input-suffix {
      color: ${colors.successColor};
    }
  }
  .ant-form-item-has-error {
    margin-bottom: 10px;
  }
  .ant-form-item .ant-form-item-margin-offset {
    margin-bottom: 0 !important;
  }
`;
