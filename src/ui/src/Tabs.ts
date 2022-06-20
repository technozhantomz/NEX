import { Tabs as AntdTabs } from "antd";
import styled from "styled-components";

import { colors } from "./colors";

export const Tabs = styled(AntdTabs)`
  .ant-tabs-tab {
    color: ${colors.textColor};
    font-weight: 500;
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
`;
