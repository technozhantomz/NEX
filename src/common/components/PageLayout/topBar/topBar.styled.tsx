import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const TopBar = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #2e5fb7;
  padding-bottom: 13px;
  .topbar-left {
    margin: 23px 0 0 20px;
    display: flex;
    align-items: center;
    .logo {
      font-size: 10em;
      display: flex;
      color: var(---white);
    }
  }
  .topbar-right {
    margin: 23px 20px 0 0;
    display: flex;
    flex-direction: row;
  }
  ${breakpoint.xs} {
     {
      border: none;
      padding: 0;
    }
  }
`;
