import {
  styled,
  Card as UiCard,
  Dropdown as UiDropdown,
  Tabs as UiTabs,
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
    padding: 15px 28px 10px;
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
`;

export const Tabs = styled(UiTabs)`
  font-weight: 500;
  ${breakpoint.sm} {
    &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
    &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
      width: 100%;
    }
    .ant-tabs-tab {
      flex: 1 1 50%;
      justify-content: center;
    }
  }
`;

export const WalletCard = styled(UiCard)`
  .ant-tabs {
    border-radius: 4px;
    opacity: 1;
    max-width: 1070px;
  }
  .ant-table-wrapper {
    margin-left: 35px;
  }
  border-radius: 4pt;
  .ant-card-body {
    padding: 0 0 68px 0;
    .ant-tabs-nav-list {
      justify-content: space-between;
      width: 100%;
    }
    .ant-tabs-tab {
      justify-content: center;
      width: 100%;
    }
    .ant-tabs-nav {
      margin-bottom: 0px;
    }
    .ant-tabs-nav-operations {
      display: none;
    }
    .ant-tabs-top > .ant-tabs-nav::before {
      ${mixIns.inActiveTab}
    }
    .ant-tabs-ink-bar {
      height: 2pt;
    }
    .ant-list-item {
      border-bottom: 1px solid #f0f0f0;
    }
  }

  ${breakpoint.sm} {
    .ant-card-body {
      .ant-tabs-nav {
        width: 100%;
      }
      .ant-tabs-nav-list {
        justify-content: space-between;
        width: 100%;
      }
      .ant-tabs-nav-operations {
        display: flex;
      }
    }
  }

  ${breakpoint.md} {
    .ant-card-body {
      .ant-tabs-nav {
        width: 50%;
      }
    }
  }
`;
