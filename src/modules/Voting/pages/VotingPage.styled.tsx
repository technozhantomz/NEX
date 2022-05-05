import {
  styled,
  Card as UiCard,
  Dropdown as UiDropdown,
} from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";
import { mixIns } from "../../../ui/src/mixins";

export const VotingCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
  }
  ${breakpoint.sm} {
    .ant-card-body {
      .ant-tabs-tab {
        justify-content: center;
        padding: 33px 28px 10px;
      }
      .ant-tabs-top > .ant-tabs-nav::before {
        border-bottom: 2pt solid #f0f0f0;
      }
      .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
        justify-content: space-between;
        width: 100%;
      }
      .ant-tabs-ink-bar {
        height: 2pt;
      }
      .ant-tabs-nav-operations {
        display: none;
      }
    }
  }
`;

export const MobileDropdownWrapper = styled.div`
  ${mixIns.inActiveTab}
`;

export const MobileTabsWrapper = styled.div`
  .ant-tabs-tab {
    color: ${colors.textColor};
  }
`;

export const MobileDropdown = styled(UiDropdown)`
  &.ant-btn-text,
  &.ant-btn-text:hover,
  &.ant-btn-text:focus {
    width: 50%;
    text-transform: capitalize;
    height: 50px;
    padding: 15px 28px 10px;
    background: ${colors.white};
    border-bottom: 2pt solid ${colors.linkColor};
    border-radius: 0px;
    position: relative;
    top: 2px;
  }
`;
