import { styled, Button as UiButton, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const Flex = styled.div`
  display: flex;
`;

export const Heading = styled.h2`
    font-size: 1em;
    font-weight: 500;
    margin-bottom: 5px;
    padding: 0;
    text-align: left;
`;

export const ButtonGroup = styled.div`
    display: flex;
    padding: 0px;
    justify-content: space-between;
    margin-bottom: 5px;
    width: 100%;
`;


export const Button = styled(UiButton)`
  font-size: 0.6em;
  padding: 0px;
  width: 35px;
  height: 15px !important;
  

  &.ant-btn-primary {
    background-color: #3498db;
    border-color: #3498db;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-style: solid;
    border-radius: 100%;
    }
  }

  &.ant-btn-default {
    border-width: 1px !important;
    border-style: solid;
    border-radius: 100%;
    background-color: #ffffff;
    border-color: #bbbbbb;
    align-items: center !important;
    justify-content: center !important;
  }

  &:first-child {
    border-top-left-radius: 100% !important;
    border-bottom-left-radius: 100% !important;
  }
  
  &:last-child {
    border-top-right-radius: 100% !important;
    border-bottom-right-radius: 100% !important;
  }
`;


export const BidRows = styled.div`
    height: 50% !important;
    overflow: auto;
    padding: 0px;
    margin: 0px;
`;

export const AskRows = styled.div`
    height: 50% !important;
    overflow: auto;
    padding: 0px;
    margin: 0px;
    .ant-table-thead::before {
        content: "";
        display:table;
      }
      
      .ant-table-tbody::after {
          content: "";
          display:table;
      }
`;

export const Table = styled(UiTable)`
  &.ask-rows {
    .ant-table {
      display: flex;
      flex-direction: column;
    }
  }
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
    height: 50% !important;
    color: ${colors.marketSell};
  }
  .ant-table-tbody > tr.ant-table-row.buy > td:first-child {
    height: 50% !important;
    color: ${colors.marketBuy};
  }
`;


export const OrderBookContainer = styled.div`
  max-height: inherit;
  height: 50% !important;
  padding: 8px;
`;