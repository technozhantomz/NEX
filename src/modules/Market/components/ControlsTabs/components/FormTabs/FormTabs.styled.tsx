import { styled, Tabs as UiTabs } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";

export const Tabs = styled(UiTabs)`
  width: 100%;
  &.ant-tabs > .ant-tabs-nav {
    margin-bottom: 0;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
    padding: 2px;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations-hidden,
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations {
    display: none !important;
  }
  .ant-tabs-tab {
    flex: 1 1 50%;
    justify-content: center;
    padding: 12px 0 12px 0;
  }
  .ant-tabs-tab-btn,
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    font-size: 14px;
    ${breakpoint.lg} {
      font-size: 16px;
    }
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    border-bottom: unset;
  }
`;

export const TabContentContainer = styled.div`
  padding: 24px;
`;
