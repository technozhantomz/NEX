import { styled, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

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
      border-bottom: 2pt solid #f0f0f0;
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
