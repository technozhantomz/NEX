import { useViewportContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { OrderHistoryRow } from "../../types";

import * as Styled from "./HistoryBook.styled";
import { useHistory } from "./hooks/useHistory";

type Props = {
  forUser?: boolean;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  getHistory: (base: Asset, quote: Asset) => Promise<void>;
  orderHistoryRows: OrderHistoryRow[];
  loadingOrderHistoryRows: boolean;
  getUserHistory: (base: Asset, quote: Asset) => Promise<void>;
  userOrderHistoryRows: OrderHistoryRow[];
  loadingUserHistoryRows: boolean;
};

export const HistoryBook = ({
  forUser = false,
  currentBase,
  currentQuote,
  loadingSelectedPair,
  getHistory,
  orderHistoryRows,
  loadingOrderHistoryRows,
  getUserHistory,
  userOrderHistoryRows,
  loadingUserHistoryRows,
}: Props): JSX.Element => {
  const { width } = useViewportContext();
  const { columns } = useHistory({
    currentBase,
    currentQuote,
    loadingSelectedPair,
    getHistory,
    getUserHistory,
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
                : { scrollToFirstRowOnChange: false }
              : {}
          }
          loading={forUser ? loadingUserHistoryRows : loadingOrderHistoryRows}
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
