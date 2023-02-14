import { styled, Tabs as UiTabs } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const Tabs = styled(UiTabs)`
  width: 100%;
  &.ant-tabs-top > .ant-tabs-nav,
  &.ant-tabs-bottom > .ant-tabs-nav,
  &.ant-tabs-top > div > .ant-tabs-nav,
  &.ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 0 0 8px 0;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-list,
  &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-list {
    width: 100%;
  }
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations-hidden,
  &.ant-tabs > .ant-tabs-nav .ant-tabs-nav-operations {
    display: none !important;
  }
  .ant-tabs-tab {
    flex: 1 1 33%;
    ${breakpoint.lg} {
      flex: 1 1 25%;
    }
    justify-content: center;
    padding: 20px 0 8px 0;
  }
  .ant-tabs-tab-btn {
    font-size: 16px;
    ${breakpoint.lg} {
      font-size: 18px;
    }
  }
  .ant-tabs-nav::before {
    ${mixIns.hairline}
  }
`;

export const TabContentContainer = styled.div`
  .ant-table-wrapper {
    margin-bottom: 0 !important;
    width: 100%;
  }
`;

export const HistoryTabContainer = styled.div`
  padding-left: 16px;
  .ant-table-wrapper {
    margin-bottom: 0 !important;
    width: 100%;
  }
  .ant-table {
    max-width: unset;
  }
`;
