import { styled, Tabs as UiTabs } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const TabsContainer = styled.div`
  .buy > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-tab.ant-tabs-tab-active {
    background-color: ${colors.marketBuy};
  }
  .sell > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-tab.ant-tabs-tab-active {
    background-color: ${colors.marketSell};
  }
  .buy > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-tab {
    margin-right: 8px;
    ${breakpoint.lg} {
      margin-right: 0;
    }
  }
  .sell > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-tab {
    margin-right: 8px;
    ${breakpoint.lg} {
      margin-right: 0;
    }
  }
`;

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
  &.ant-tabs
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    .ant-tabs-tab
    + .ant-tabs-tab {
    margin: 0;
    ${breakpoint.lg} {
      margin: 0;
    }
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations-hidden,
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations {
    display: none !important;
  }
  &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-tab {
    flex: 1 1 50%;
    justify-content: center;
    padding: 12px 0 12px 0;
    background: ${colors.borderColorBase};
    border-radius: 4px;
  }
  &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-tab-btn,
  &.ant-tabs
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    .ant-tabs-tab.ant-tabs-tab-active
    .ant-tabs-tab-btn {
    font-size: 16px;
    color: ${colors.white};
  }
  &.ant-tabs
    > .ant-tabs-nav
    > .ant-tabs-nav-wrap
    .ant-tabs-tab.ant-tabs-tab-active {
    border-bottom: unset;
  }

  &.ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap .ant-tabs-ink-bar {
    background-color: transparent;
  }
`;

export const TabContentContainer = styled.div``;
