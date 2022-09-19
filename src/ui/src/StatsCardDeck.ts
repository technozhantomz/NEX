import styled from "styled-components";

import { breakpoint } from "./breakpoints";

export const StatsCardsDeck = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  margin: 20px 0px;
  .stats-card {
    margin-right: 15px;
  }
  ${breakpoint.sm} {
    margin: 15px 0 25px;
    max-width: 876px;
    flex-wrap: wrap;
    .stats-card {
      margin: 10px 7.5px 10px;
    }
  }
`;
