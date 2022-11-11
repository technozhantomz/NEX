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
`;

export const SettingsCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
    width: 100%;
    border-radius: 4px;
    opacity: 1;
    .ant-tabs-tab,
    .ant-tabs-extra-content {
      justify-content: center;
      padding: 33px 28px 10px;
      width: 240px;
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
