import {
  styled,
  Card as UiCard,
  Dropdown as UiDropdown,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const MobileDropdownWrapper = styled.div`
  ${mixIns.inActiveTab}
`;
export const MobileDropdown = styled(UiDropdown)`
  &.ant-btn-text,
  &.ant-btn-text:hover,
  &.ant-btn-text:focus {
    width: 50%;
    text-transform: capitalize;
    height: 50px;
    background: ${colors.white};
    border-bottom: 2pt solid ${colors.linkColor};
    border-radius: 0px;
    position: relative;
    top: 2px;
  }
`;

export const MobileTabsWrapper = styled.div`
  .ant-tabs-tab {
    color: ${colors.textColor};
  }
  .ant-menu-item {
    color: black !important;
    background: white !important;
    &.menu-selected {
      color: #0148be !important;
      background-color: #e6f4ff !important;
    }
  }
`;

export const BlockchainCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
  }
  ${breakpoint.sm} {
    .ant-card-body {
      .ant-tabs-tab {
        margin: 0;
        justify-content: center;
        padding: 33px 28px 10px;
        width: 100%;
      }
      .ant-tabs-top > .ant-tabs-nav::before {
        ${mixIns.inActiveTab}
      }
      .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
        justify-content: space-between;
        width: 100%;
      }
      .ant-tabs-ink-bar {
        height: 2pt;
      }
    }
  }
`;
