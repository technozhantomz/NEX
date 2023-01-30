import { styled, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const SettingsCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
    width: 100%;
    ${mixIns.borderRadius}
    opacity: 1;
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
