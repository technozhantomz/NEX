import { styled, Table as UiTable } from "../../../../ui/src";

export const Flex = styled.div`
  display: flex;
`;
export const Table = styled(UiTable)`
  .ant-table-tbody > tr > td {
    border-bottom: none;
    font-size: 1em;
    padding: 0;
    text-align: center;
  }
  .ant-table-thead > tr > th {
    background: #fff;
    border-bottom: none;
    padding: 13px;
    text-align: center;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td,
  .ant-table-tbody > tr > td.ant-table-cell-row-hover {
    background: none;
  }
  .ant-table-tbody > tr.ant-table-row.sell {
    background: #fff4f4;
  }
  .ant-table-tbody > tr.ant-table-row.buy {
    background: #e5fff6;
  }
`;

export const TableContainer = styled.div``;
