import { ColumnsType } from "antd/lib/table";

import { TradeHistoryColumn, TradeHistoryRow } from "../../types";

import * as Styled from "./HistoryTable.styled";
import { useHistoryTable } from "./hooks";

type Props = {
  forUser?: boolean;
};

export const HistoryTable = ({ forUser = false }: Props): JSX.Element => {
  const {
    tradeHistoryRows,
    userOrderHistoryRows,
    tradeHistoryColumns,
    loadingTradeHistory,
  } = useHistoryTable({ forUser });
  const desktopScroll = {
    y: undefined,
    x: 310,
    scrollToFirstRowOnChange: false,
  };
  const scroll = tradeHistoryRows.length === 0 ? undefined : desktopScroll;

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={scroll}
          loading={loadingTradeHistory}
          pagination={false}
          columns={tradeHistoryColumns as ColumnsType<TradeHistoryColumn>}
          dataSource={forUser ? userOrderHistoryRows : tradeHistoryRows}
          bordered={false}
          rowClassName={(record: any) => {
            const item = record as TradeHistoryRow;
            return item.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
