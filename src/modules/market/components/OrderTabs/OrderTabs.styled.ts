import { styled, Tabs as UiTabs } from "../../../../ui/src";

export const Tabs = styled(UiTabs)`
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
`;
