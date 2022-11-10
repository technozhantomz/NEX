import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const TopBar = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #2e5fb7;
  padding-bottom: 13px;
  .topbar-left {
    margin: 23px 0 0 20px;
    display: flex;
    align-items: center;
    .peerplays-logo {
      display: flex;
      align-items: center;
      .logo-link {
        display: flex;
        align-items: center;
        color: ${colors.white};
        .logo {
          font-size: 10em;
          display: flex;
          color: ${colors.white};
          margin-right: 6px;
          ${breakpoint.sm} {
            margin-right: 12px;
          }
        }
        .peer {
          color: ${colors.white};
          letter-spacing: 1px;
          font-size: 1.25rem;
          margin: 0;
          .plays {
            font-weight: 200;
          }
          .link {
            font-size: 1.25rem;
            font-weight: 200;
            color: #ff903e;
            letter-spacing: 1px;
          }
        }
      }
    }
    .dex-logo {
      margin: 0 0 0 6px;
      font-size: 1.25rem;
      font-weight: 200;
      color: #ff903e;
      letter-spacing: 1px;
      ${breakpoint.sm} {
        margin: 0 0 0 15px;
      }
    }
  }
  .topbar-right {
    margin: 23px 20px 0 0;
    display: flex;
    flex-direction: row;
  }
  ${breakpoint.sm} {
    border: none;
  }
`;
