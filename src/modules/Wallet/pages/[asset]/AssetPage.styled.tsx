import {
  styled,
  Card as UiCard,
  Dropdown as UiDropdown,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const AssetCard = styled(UiCard)`
  .ant-table-wrapper {
    width: 566px;
  }
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
  }
  .ant-tabs-content-holder {
    min-height: 564px;
    border-radius: 4px;
  }
  ${breakpoint.sm} {
    .ant-form {
      margin: 20px 35px;
      min-width: 566px;
    }
    .ant-card-body {
      .ant-tabs-nav-operations {
        display: flex;
      }
      .ant-table-wrapper {
        margin: 0 35px;
      }
      .asset-table {
        max-width: 566px;
      }
    }
    .ant-tabs {
      border-radius: 4px;
      opacity: 1;
      max-width: 1070px;
    }
  }
`;

export const AssetFormWapper = styled.div`
  margin: 0 20px 39px;
  max-width: 566px;
`;

export const WithdrawFormWrapper = styled.div`
  max-width: 566px;
  button {
    max-width: 290px;
  }
  .ant-input {
    font-size: 16px;
  }
`;

export const MobileDropdownWrapper = styled.div`
  ${mixIns.inActiveTab}
  display: flex;
  justify-content: space-between;
  align-items: center;
  .back-link {
    width: 100%;
    text-align: center;
    padding: 15px 28px 10px;
  }
`;
export const MobileDropdown = styled(UiDropdown)`
  &.ant-btn-text,
  &.ant-btn-text:hover,
  &.ant-btn-text:focus {
    width: 100%;
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
`;
