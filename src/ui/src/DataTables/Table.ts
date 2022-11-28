import { CheckCircleFilled, LinkOutlined } from "@ant-design/icons";
import { Table as UiTable } from "ant-table-extensions";
import styled from "styled-components";

import { breakpoint } from "../breakpoints";
import { colors } from "../colors";

export const DataTable = styled(UiTable)`
  .ant-table {
    max-width: 876px;
  }
  ${breakpoint.sm} {
    margin-bottom: 14px;
  }
  .ant-table-thead > tr > th {
    color: ${colors.textColorSecondary};
    background: ${colors.white};
    border: none;
    font-size: 0.9em;
    font-weight: 300;
    &:before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    font-size: 1em;
    font-weight: normal;
  }
  .anticon-link {
    color: ${colors.linkColor};
  }
  .ant-tag {
    padding: 5px 15px;
    background: ${colors.assetTag};
    border: none;
    color: ${colors.textColor};
    text-transform: capitalize;
  }
  .standard-fee {
    text-align: right;
  }
  .ant-pagination.ant-pagination-mini .ant-pagination-options {
    display: inline-block;
    margin-inline-start: 16px;
    vertical-align: middle;
    .ant-select-single.ant-select-sm:not(.ant-select-customize-input)
      .ant-select-selector {
      border-radius: 4px;
    }
  }
`;

export const DataTableLastBlock = styled.span`
  color: ${colors.successColor};
`;
export const DataTableMissedBlocks = styled.span`
  color: ${colors.missedColor};
`;

export const DataTableUrlIcon = styled(LinkOutlined)`
  color: ${colors.linkColor};
`;

export const DataTableActiveIcon = styled(CheckCircleFilled)`
  color: ${colors.lightText};
`;
