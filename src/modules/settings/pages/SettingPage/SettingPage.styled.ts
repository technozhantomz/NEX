import { styled, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const SettingsCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
    width: 100%;
    .ant-tabs-tab,
    .ant-tabs-extra-content {
      justify-content: center;
      padding: 33px 28px 10px;
    }
  }
  ${breakpoint.sm} {
    .ant-card-body {
      .ant-tabs-nav-operations {
        display: flex;
      }
      .ant-table-wrapper {
        margin: 0 20px 39px;
        max-width: 566px;
      }
    }
  }
`;
