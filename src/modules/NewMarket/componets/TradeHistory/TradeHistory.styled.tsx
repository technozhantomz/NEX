import { styled, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const Flex = styled.div`
  display: flex;
`;
export const Table = styled(UiTable)`
  .ant-table-tbody > tr > td {
    border-bottom: none;
    font-size: 1em;
    padding: 2px;
    text-align: center;
  }
  .ant-table-thead > tr > th {
    background: #fff;
    border-bottom: none;
    padding: 13px;
    text-align: center;
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
    :after {
      content: "\f0d7";
    }
  }
  .ant-table-tbody > tr.ant-table-row.buy > td:first-child {
    color: ${colors.marketBuy};
    :after {
      content: "\f0d7";
      margin-left: 5px;
    }
  }
`;

export const TableContainer = styled.div``;
