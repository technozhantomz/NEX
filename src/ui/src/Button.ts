import { Button as AntdButton } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { mixIns } from "./mixins";

export const Button = styled(AntdButton)`
   {
    height: 35px;
    ${mixIns.borderRadius}
    ${breakpoint.xs} {
      height: 45px;
    }
  }
`;
