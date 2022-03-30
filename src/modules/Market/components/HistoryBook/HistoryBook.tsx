import * as Styled from "./HistoryBook.styled";
import { useHistory } from "./hooks/useHistory";

export const HistoryBook = (): JSX.Element => {
  const { orderHistoryRow, columns } = useHistory();

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={{ scrollToFirstRowOnChange: false, y: 600 }}
          pagination={false}
          columns={columns}
          dataSource={orderHistoryRow}
          bordered={false}
          rowClassName={(record) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
