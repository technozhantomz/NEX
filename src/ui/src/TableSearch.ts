import { Input } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { mixIns } from "./mixins";

const { Search } = Input;

export const TableSearch = styled(Search)`
  max-width: 520px;
  margin-bottom: 0px;
  .ant-input {
    ${mixIns.borderRadius}
  }
  > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;
