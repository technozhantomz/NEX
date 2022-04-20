import { useViewportContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { breakpoints } from "../../../../ui/src/breakpoints";

import * as Styled from "./HistoryBook.styled";
import { useHistory } from "./hooks/useHistory";

type Props = {
  forUser?: boolean;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
};

export const HistoryBook = ({
  forUser = false,
  currentBase,
  currentQuote,
  loadingSelectedPair,
}: Props): JSX.Element => {
  const { width } = useViewportContext();
  const {
    orderHistoryRows,
    userOrderHistoryRows,
    columns,
    loadingOrderHistoryRows,
  } = useHistory({
    currentBase,
    currentQuote,
    loadingSelectedPair,
  });
  const dataSource = forUser ? userOrderHistoryRows : orderHistoryRows;

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={
            width > breakpoints.md
              ? dataSource.length > 24
                ? { scrollToFirstRowOnChange: false, y: 540 }
                : {}
              : {}
          }
          loading={forUser ? false : loadingOrderHistoryRows}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          bordered={false}
          rowClassName={(record) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
