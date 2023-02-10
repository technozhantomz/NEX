import {
  DataTabWrapper,
  Select,
  styled,
  DataTable as UiTable,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { mixIns } from "../../../../../../ui/src/mixins";

export const OrdersWrapper = styled(DataTabWrapper)`
  margin: 0px 12px;
`;

export const Table = styled(UiTable)`
  .ant-table-tbody > tr > td {
    font-size: 12px;
    padding: 8px;
  }
  .ant-table-thead > tr > th {
    font-size: 12px;
    ${breakpoint.lg} {
      font-size: 14px;
    }
    padding: 8px;
  }
  .sell,
  .ant-table-tbody > tr.sell.ant-table-row:hover > td,
  .ant-table-tbody > tr.sell > td.ant-table-cell-row-hover {
    background: #fff4f4;
  }
  .buy,
  .ant-table-tbody > tr.buy.ant-table-row:hover > td,
  .ant-table-tbody > tr.buy > td.ant-table-cell-row-hover {
    background: #e5fff6;
  }
  .ant-table {
    max-width: 100%;
  }
  margin-bottom: 14px;
  .ant-table-tbody > tr > td:last-child {
    border-bottom: unset;
  }
`;

export const ExpandableRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 28px;
  padding: right: 28px;
  ${breakpoint.lg} {
    padding-left: 32px;
    padding-right: 32px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  ${breakpoint.lg} {
    justify-content: space-between;
  }
`;

export const ItemTitle = styled.div`
  min-width: 90px;
  ${breakpoint.lg} {
    min-width: 180px;
  }
`;

export const ItemValue = styled.div``;

export const FiltersContainer = styled.div`
  display: flex;
`;

export const Filter = styled(Select)`
  &.ant-select {
    height: 45px;
    font-size: 14px;
    margin-right: 12px;
    min-width: 130px;
    ${breakpoint.lg} {
      margin-right: 16px;
      min-width: 220px;
      font-size: 16px;
      height: 50px;
    }
    .ant-select-selector {
      height: 100%;
      display: flex;
      align-items: center;
      ${mixIns.borderRadius}
    }
  }
`;
