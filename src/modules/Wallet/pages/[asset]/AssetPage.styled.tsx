import { styled, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const AssetCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
    .ant-tabs-tab,
    .ant-tabs-extra-content {
      justify-content: center;
      padding: 33px 28px 10px;
    }
    .ant-tabs-top > .ant-tabs-nav::before {
      ${mixIns.inActiveTab}
      max-width: 566px;
    }
    .ant-tabs > .ant-tabs-nav,
    .ant-tabs > div > .ant-tabs-nav {
      max-width: 710px;
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
      }
      .asset-table {
        max-width: 566px;
      }
    }
  }
`;

export const AssetFormWapper = styled.div`
  margin: 0 20px 39px;
  max-width: 566px;
`;
