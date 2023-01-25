import { styled, DataTable as UiTable } from "../../../../ui/src";

export const OrdersTable = styled(UiTable)`
  .ant-table-tbody > tr > td {
    font-size: 12px;
  }
  .sell,
  .ant-table-tbody > tr.sell.ant-table-row:hover > td,
  .ant-table-tbody > tr.sell > td.ant-table-cell-row-hover {
    background: #fff4f4;
    min-height: 60px;
  }
  .buy,
  .ant-table-tbody > tr.buy.ant-table-row:hover > td,
  .ant-table-tbody > tr.buy > td.ant-table-cell-row-hover {
    background: #e5fff6;
    min-height: 60px;
  }
  .ant-table {
    max-width: 100%;
  }
  margin-bottom: 14px;
  .ant-table-tbody > tr > td:last-child {
    border-bottom: unset;
  }
`;
