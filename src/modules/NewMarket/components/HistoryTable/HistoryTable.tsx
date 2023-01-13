import { ColumnsType } from "antd/lib/table";

import { TradeHistoryColumn, TradeHistoryRow } from "../../types";

import * as Styled from "./HistoryTable.styled";
import { useHistoryTable } from "./hooks";

type Props = {
  tradeHistoryRows: TradeHistoryRow[];
  loading: boolean;
  tradeHistoryColumns: TradeHistoryColumn[];
};

export const HistoryTable = ({
  tradeHistoryRows,
  loading,
  tradeHistoryColumns,
}: Props): JSX.Element => {
  const desktopScroll = {
    y: undefined,
    x: 310,
    scrollToFirstRowOnChange: false,
  };
  const scroll = tradeHistoryRows.length === 0 ? undefined : desktopScroll;
  const { defineTableRowClassName } = useHistoryTable();

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={scroll}
          loading={loading}
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
