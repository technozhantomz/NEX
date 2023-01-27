import { Tabs as AntdTabs } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { colors } from "./colors";
import { mixIns } from "./mixins";

export const PageTabs = styled(AntdTabs)`
  .ant-tabs-tab {
    color: ${colors.textColor};
    font-weight: 500;
    min-width: 120px;
  }
  .ant-tabs-tab-btn:focus,
  .ant-tabs-tab-remove:focus,
  .ant-tabs-tab-btn:active,
  .ant-tabs-tab-remove:active {
    color: ${colors.textColor};
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${colors.textColor};
    text-shadow: unset;
  }
  .ant-tabs-tab.ant-tabs-tab-active {
    border-bottom: 2pt solid #0a48be;
  }
  ${breakpoint.sm} {
    .ant-tabs-tab {
      margin: 0;
      justify-content: center;
      padding: 33px 28px 10px;
      width: 100%;
    }
    .ant-tabs-top > .ant-tabs-nav::before {
      ${mixIns.inActiveTab}
    }
    .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
      justify-content: space-between;
      width: 100%;
    }
    .ant-tabs-ink-bar {
      height: 2pt;
    }
    .ant-tabs-top > .ant-tabs-nav {
      margin: 0;
    }
  }
`;
