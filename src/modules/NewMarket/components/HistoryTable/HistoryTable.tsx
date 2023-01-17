import { ColumnsType } from "antd/lib/table";

import * as Styled from "./HistoryTable.styled";
import { useHistoryTable } from "./hooks";
import { TradeHistoryColumn } from "./hooks/useHistoryTable.types";

type Props = {
  forUser?: boolean;
};

export const HistoryTable = ({ forUser = false }: Props): JSX.Element => {
  const {
    tradeHistoryRows,
    tradeHistoryColumns,
    loadingTradeHistory,
    defineTableRowClassName,
  } = useHistoryTable({ forUser });
  const desktopScroll = {
    y: 1100,
    x: 240,
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
          dataSource={tradeHistoryRows}
          bordered={false}
          rowClassName={defineTableRowClassName}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
