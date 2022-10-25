import { useViewportContext } from "../../../../common/providers";
import { Asset, Scroll } from "../../../../common/types";
import { OrderHistoryRow } from "../../types";

import * as Styled from "./HistoryBook.styled";
import { useHistory } from "./hooks";

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
  const { md } = useViewportContext();
  const { columns } = useHistory({
    currentBase,
    currentQuote,
    loadingSelectedPair,
    getHistory,
    getUserHistory,
  });
  const dataSource = forUser ? userOrderHistoryRows : orderHistoryRows;
  const desktopScroll =
    dataSource.length > 24
      ? { y: 540, x: true, scrollToFirstRowOnChange: false }
      : { x: true, scrollToFirstRowOnChange: false };
  const scroll = md ? ({ x: true } as Scroll) : (desktopScroll as Scroll);

  return (
    <>
      <Styled.TableContainer>
        <Styled.Table
          scroll={scroll}
          loading={forUser ? loadingUserHistoryRows : loadingOrderHistoryRows}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          bordered={false}
          rowClassName={(record) => {
            const item = record as OrderHistoryRow;
            return item.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
