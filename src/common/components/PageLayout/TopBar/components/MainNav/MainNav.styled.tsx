import { styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";

export const LogoContainer = styled.div`
  margin-bottom: 40px;
  .topbar-left {
    margin: 23px 0 0 20px;
    display: flex;
    align-items: center;
    .peerplays-logo {
      display: flex;
      align-items: center;
      .logo {
        font-size: 10em;
        display: flex;
        color: ${colors.additionalBlue} !important;
        margin-right: 6px;
        ${breakpoint.sm} {
          margin-right: 12px;
        }
      }
      .peer {
        color: ${colors.additionalBlue} !important;
        letter-spacing: 1px;
        font-size: 1.25rem;
        margin: 0;
        .plays {
          font-weight: 200;
        }
      }
    }
  }
  ${breakpoint.sm} {
    display: none;
  }
`;
