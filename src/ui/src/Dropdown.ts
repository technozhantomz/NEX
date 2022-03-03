import { Dropdown as AntdDropdown } from "antd";
import styled from "styled-components";

export const Dropdown = styled(AntdDropdown)`
  .ant-dropdown-trigger > .anticon.anticon-down,
  .ant-dropdown-link > .anticon.anticon-down,
  .ant-dropdown-button > .anticon.anticon-down {
    vertical-align: text-bottom;
  }
`;
