import * as Styled from "./HistoryBook.styled";
import { useHistory } from "./hooks/useHistory";
import { OrderHistoryRow } from "./hooks/useHistory.types";

export const HistoryBook = (): JSX.Element => {
  const { columns, orderHistoryRow, tableLoading } = useHistory();
  console.log("this is history", orderHistoryRow);
  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          loading={tableLoading}
          scroll={{ scrollToFirstRowOnChange: false }}
          pagination={false}
          columns={columns}
          dataSource={orderHistoryRow}
          rowClassName={(record) => {
            const rec = record as OrderHistoryRow;
            return rec.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
