import { ColumnsType } from "antd/lib/table";
import { useMemo } from "react";

import { useViewportContext } from "../../../../common/providers";

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
  const { lg, xxl } = useViewportContext();

  const desktopScroll = useMemo(() => {
    if (tradeHistoryRows.length > 30) {
      return {
        y: 1120,
        x: undefined,
        scrollToFirstRowOnChange: false,
      };
    } else {
      return undefined;
    }
  }, [tradeHistoryRows]);
  const tabletScroll = useMemo(() => {
    if (tradeHistoryRows.length > 21) {
      return {
        y: 550,
        x: undefined,
        scrollToFirstRowOnChange: false,
      };
    } else {
      return undefined;
    }
  }, [tradeHistoryRows]);
  const mobileScroll = useMemo(() => {
    if (tradeHistoryRows.length > 8) {
      return {
        y: 200,
        x: undefined,
        scrollToFirstRowOnChange: false,
      };
    } else {
      return undefined;
    }
  }, [tradeHistoryRows]);
  const smallScreenScroll = lg ? mobileScroll : tabletScroll;
  const screenScroll = xxl ? smallScreenScroll : desktopScroll;
  const scroll = useMemo(() => {
    return tradeHistoryRows.length === 0 ? undefined : screenScroll;
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
