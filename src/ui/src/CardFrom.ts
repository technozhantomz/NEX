import { Form as AntdForm } from "antd";
import styled from "styled-components";

import { Button } from "./Button";
import { breakpoint } from "./breakpoints";

export const CardFormButton = styled(Button)`
   {
    display: block;
    width: 85%;
    margin: 0 auto;
  }
  ${breakpoint.xs} {
     {
      width: 70%;
    }
  }
`;
export const CardFrom = styled(AntdForm)`
  .ant-form-item-has-success {
    .ant-input-suffix {
      color: var(--ant-success-color);
    }
  }
`;
