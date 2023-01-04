import {
  styled,
  Card as UiCard,
  Dropdown as UiDropdown,
} from "../../../ui/src";
import { colors } from "../../../ui/src/colors";
import { mixIns } from "../../../ui/src/mixins";

export const GPOSCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
  }
`;

export const MobileDropdownWrapper = styled.div`
  ${mixIns.inActiveTab}
`;

export const MobileTabsWrapper = styled.div`
  .ant-tabs-tab {
    color: ${colors.textColor};
  }
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
