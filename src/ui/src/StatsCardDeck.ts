import styled from "styled-components";

import { breakpoint } from "./breakpoints";

export const StatsCardsDeck = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  margin: 20px 0;
  .stats-card {
    margin-right: 15px;
  }
  ${breakpoint.sm} {
    margin: 25px 0 35px;
  }
`;
