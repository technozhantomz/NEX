import { styled, Tabs as UiTabs } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const Tabs = styled(UiTabs)`
  width: 100%;
  &.ant-tabs-top > .ant-tabs-nav,
  &.ant-tabs-bottom > .ant-tabs-nav,
  &.ant-tabs-top > div > .ant-tabs-nav,
  &.ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 0 0 10px 0;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    flex: 1 1 50%;
    justify-content: center;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn,
  .ant-tabs-tab:hover {
    color: ${colors.textColor};
  }
  &.for-user .ant-tabs-tab {
    ${breakpoint.md} {
      font-size: 20px;
    }
  }
`;
