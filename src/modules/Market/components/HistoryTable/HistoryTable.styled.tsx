import { styled, DataTable as UiTable } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const Table = styled(UiTable)`
  max-height: inherit;
  .ant-table-tbody > tr > td {
    border-bottom: none;
    padding: 2px;
    text-align: left;
    font-size: 12px;
    ${breakpoint.xxl} {
      font-size: 10px;
    }
  }
  .ant-table-thead > tr > th {
    background: ${colors.white};
    border-bottom: none;
    padding: 0 0 11px;
    overflow-wrap: unset;
    font-size: 14px;
    ${breakpoint.xxl} {
      font-size: 12px;
    }
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: none;
  }
  .ant-table-tbody > tr.ant-table-row.sell > td:first-child {
    color: ${colors.marketSell};
  }
  .ant-table-tbody > tr.ant-table-row.buy > td:first-child {
    color: ${colors.marketBuy};
  }
`;

export const TableContainer = styled.div`
  max-height: inherit;
`;
