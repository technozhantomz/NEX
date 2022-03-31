import * as Styled from "./HistoryBook.styled";
import { useHistory } from "./hooks/useHistory";

type Props = {
  forUser?: boolean;
};

export const HistoryBook = ({ forUser = false }: Props): JSX.Element => {
  const { orderHistoryRow, userOrderHistoryRow, columns } = useHistory();

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={{ scrollToFirstRowOnChange: false, y: 600 }}
          pagination={false}
          columns={columns}
          dataSource={forUser ? userOrderHistoryRow : orderHistoryRow}
          bordered={false}
          rowClassName={(record) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
