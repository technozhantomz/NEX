import { Dropdown, Menu, styled, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const Flex = styled.div`
  display: flex;
`;

export const Heading = styled.h2`
  font-size: 1.1em;
  font-weight: 500;
  margin-bottom: 15px;
  padding: 0;
  text-align: left;
`;

export const FilterContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`;

export const OrdersFilter = styled.button`
  display: flex;
  width: 100%;
  height: 25px;
  margin-bottom: 10px;
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

export const ThresholdDropdown = styled(Dropdown)`
  display: flex !important;
  align-items: center !important;
  margin-bottom: 10px;
`;

export const ThresholdLabel = styled.span`
  color: ${colors.textColorSecondary};
  font-size: 11px;
  margin-right: 5px;
`;

export const ThresholdValue = styled.span`
  font-size: 11px;
  color: #212121;
`;

export const BidRows = styled.div`
  height: 50% !important;
  padding: 0px;
  margin: 0px;
  overflow: auto;
`;

export const AskRows = styled.div`
  height: 50% !important;
  overflow: hidden;
  padding: 0px;
  margin: 0px;
`;

export const TableHeader = styled.thead`
  display: table-header-group;
  text-align: left;
  vertical-align: middle;
  border-color: inherit;
  width: auto;
  min-width: 100%;
`;

export const TableRow = styled.tr`
  display: table-row;
  width: 100%;
  vertical-align: inherit;
`;

export const TableCell = styled.th`
  font-size: 0.9em;
  position: relative;
  padding-right: 5px;
  color: #212121;
  font-weight: 500;
  background: #ffffff;
  overflow-wrap: unset;
  display: table-cell;
  vertical-align: inherit;
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

export const AskTable = styled(Table)``;

export const OrderBookContainer = styled.div`
  max-height: inherit;
  height: 50% !important;
  padding: 8px;
  overflow: hidden;
`;
