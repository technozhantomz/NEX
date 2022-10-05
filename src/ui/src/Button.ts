import { Button as AntdButton } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { mixIns } from "./mixins";

export const Button = styled(AntdButton)`
   {
    & > span {
      white-space: normal;
    }
    height: unset;
    min-height: 35px;
    ${mixIns.borderRadius}
    &:after {
      display: none;
    }
    ${breakpoint.sm} {
      min-height: 45px;
    }
  }
`;
