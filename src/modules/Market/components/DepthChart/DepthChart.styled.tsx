import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const DepthChartContainer = styled.div`
  .chart-container {
    margin-top: 32px;
    height: 564px;
    ${breakpoint.xxl} {
      margin-top: 0;
      height: 365px;
    }
  }
`;
