import { styled, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const ProfileCard = styled(UiCard)`
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
