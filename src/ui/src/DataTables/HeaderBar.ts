import styled from "styled-components";

import { breakpoint } from "../breakpoints";
import { colors } from "../colors";

export const DataTableHeaderBar = styled.div`
  margin-top: 25px;
  .ant-input-suffix {
    color: ${colors.borderColorBase};
  }
  display: block;
  .ant-input-group-wrapper {
    margin: 0;
  }
  .ant-input-affix-wrapper {
    width: 60%;
    height: 50px;
    max-width: 341px;
    margin-right: 15px;
  }
  ${breakpoint.sm} {
    display: flex;
    align-items: center;
    align-content: center;
    .ant-input-affix-wrapper {
      width: 220px;
      margin-right: 25px;
      border-radius: 4px;
    }
  }
`;
