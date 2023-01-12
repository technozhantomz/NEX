import { styled, Tabs as UiTabs } from "../../../../ui/src";
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
  .ant-tabs-tab {
    flex: 1 1 50%;
    justify-content: center;
    padding: 13px 0 8px 0;
  }
  .ant-tabs-tab-btn {
    font-size: 20px;
  }
  .ant-tabs-nav::before {
    ${mixIns.hairline}
  }
`;

export const TabContentContainer = styled.div`
  .ant-table-wrapper {
    margin-bottom: 0 !important;
    width: 100%;
    padding: 8px 20px 20px 20px;
  }
`;
