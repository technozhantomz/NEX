import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";

export const Layout = styled.main`
  &.default {
    margin: 0;
  }
  &.card-layout {
    margin: 0 5%;
  }
  ${breakpoint.sm} {
    &.card-layout {
      margin: 0 auto;
      max-width: 600px;
    }
  }
`;

export const PageHeading = styled.h1`
   {
    color: var(---white);
    font-size: 1.5em;
    font-weight: 300;
    margin: 7% 0 5%;
  }
`;
