import { CheckCircleFilled, LinkOutlined } from "@ant-design/icons";
import { Table as UiTable } from "ant-table-extensions";
import styled from "styled-components";

import { breakpoint } from "../breakpoints";
import { colors } from "../colors";

export const BlockchainTable = styled(UiTable)`
  .ant-table {
    max-width: 727px;
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
    border: none;
  }
  .anticon-link {
    color: ${colors.linkColor};
  }
`;

export const BlockchainTableLastBlock = styled.span`
  color: ${colors.successColor};
`;
export const BlockchainTableMissedBlocks = styled.span`
  color: ${colors.missedColor};
`;

export const BlockchainTableUrlIcon = styled(LinkOutlined)`
  color: ${colors.linkColor};
`;

export const BlockchainTableActiveIcon = styled(CheckCircleFilled)`
  color: ${colors.lightText};
`;
