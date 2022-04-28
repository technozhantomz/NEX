import { Dropdown, Menu, styled, Table as UiTable } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

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

export const TableContainer = styled.div`
  ${breakpoint.md} {
    height: ${(props) => (props.forUser ? "230px" : "775px")};
    overflow-y: auto;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 25px;
  justify-content: space-between;
`;

export const OrdersFilter = styled.button`
  display: flex;
  width: 25px;
  height: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  &.active {
    border: 1px solid #c1c2c4;
  }
  & span {
    background-color: #e2444d;
    height: 2px;
    width: 14px;
  }
  &.order-filters__type--total span:nth-child(3),
  &.order-filters__type--total span:nth-child(4) {
    background-color: #1cb881;
  }
  &.order-filters__type--buy span {
    background-color: #1cb881;
  }
  & span:not(:last-child) {
    margin-bottom: 1px;
  }
`;

export const ThresholdMenu = styled(Menu)``;

export const ThresholdDropdown = styled(Dropdown)``;

export const ThresholdLabel = styled.span`
  color: #6c6c6c;
  font-size: 12px;
  margin-right: 10px;
`;

export const ThresholdValue = styled.span`
  font-size: 14px;
  color: #212121;
`;
