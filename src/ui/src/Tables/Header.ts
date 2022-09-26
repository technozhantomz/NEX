import styled from "styled-components";

import { breakpoint } from "../breakpoints";
import { colors } from "../colors";

export const BlockchainHeader = styled.h3`
  .anticon-info-circle {
    margin: 0 15px;
    color: ${colors.warningColor};
  }
  ${breakpoint.sm} {
    margin: 0 20px 0 0;
  }
`;
