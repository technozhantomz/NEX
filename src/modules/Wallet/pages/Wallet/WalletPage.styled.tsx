import { styled, Card as UiCard, Tabs as UiTabs } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const Tabs = styled(UiTabs)`
  ${breakpoint.xs} {
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
  .ant-card-body {
    padding: 0;
    .ant-tabs-nav-list {
      justify-content: space-between;
      width: 100%;
    }
    .ant-tabs-tab {
      justify-content: center;
      width: 100%;
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
  }
  ${breakpoint.xs} {
    .ant-card-body {
      .ant-tabs-nav {
        width: 30%;
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
`;
