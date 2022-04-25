import { Button as AntdButton } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";

export const Button = styled(AntdButton)`
   {
    height: 35px;
    &:after {
      display: none;
    }
    border-radius: 4px;
    ${breakpoint.xs} {
      height: 45px;
    }
  }
`;
