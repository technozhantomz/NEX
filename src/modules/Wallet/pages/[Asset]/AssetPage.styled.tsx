import { styled, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const AssetCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
    max-width: 710px;
    .ant-tabs-tab,
    .ant-tabs-extra-content {
      justify-content: center;
      padding: 33px 28px 10px;
    }
    .ant-tabs-top > .ant-tabs-nav::before {
      border-bottom: 2pt solid #f0f0f0;
      max-width: 566px;
    }
    .ant-tabs-ink-bar {
      height: 2pt;
    }
    .ant-form {
      margin: 0 20px 39px;
      max-width: 566px;
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

export const AssetFormWapper = styled.div`
  margin: 0 20px 39px;
  max-width: 566px;
`;
