import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const SendTabWrapper = styled.div`
  margin: 14px 25px 20px 25px;
  ${breakpoint.sm} {
    margin: 14px 35px 30px 35px;
  }
  .no-margin {
    margin: 0;
  }
`;
