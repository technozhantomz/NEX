import { styled, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const Flex = styled.div`
  display: flex;
`;
export const Table = styled(UiTable)`
  max-height: inherit;
  .ant-table-tbody > tr > td {
    border-bottom: none;
    font-size: 0.7em;
    padding: 2px;
    text-align: left;
  }
  .ant-table-thead > tr > th {
    font-size: 0.9em;
    background: ${colors.white};
    border-bottom: none;
    padding: 0 0 11px;
    overflow-wrap: unset;
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
