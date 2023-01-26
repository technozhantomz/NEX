import { ColumnsType } from "antd/lib/table";
import { useMemo } from "react";

import * as Styled from "./HistoryTable.styled";
import { renderTradeHistoryColumnsWithPriceMovement } from "./components";
import { TradeHistoryColumn, useHistoryTable } from "./hooks";

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
  const desktopScroll = useMemo(() => {
    return {
      y: 1100,
      x: 240,
      scrollToFirstRowOnChange: false,
    };
  }, []);
  const scroll = useMemo(() => {
    return tradeHistoryRows.length === 0 ? undefined : desktopScroll;
  }, [tradeHistoryRows]);

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={scroll}
          loading={loadingTradeHistory}
          pagination={false}
          columns={
            renderTradeHistoryColumnsWithPriceMovement(
              tradeHistoryColumns
            ) as ColumnsType<TradeHistoryColumn>
          }
          dataSource={tradeHistoryRows}
          bordered={false}
          rowClassName={defineTableRowClassName}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
