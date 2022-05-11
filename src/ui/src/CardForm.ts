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
  font-size: 12px;
  .ant-btn-loading-icon {
    float: right;
  }
  ${breakpoint.xs} {
    font-size: 16px;
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
`;
