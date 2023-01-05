// import { useViewportContext } from "../../../../common/providers";
import { Scroll } from "../../../../common/types";
import { OrderHistoryRow, PairAssets } from "../../types";

import * as Styled from "./TradeHistory.styled";
import { useHistory } from "./hooks";

type Props = {
  forUser?: boolean;
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  orderHistoryRows: OrderHistoryRow[];
  loadingOrderHistoryRows: boolean;
  userOrderHistoryRows: OrderHistoryRow[];
  loadingUserHistoryRows: boolean;
};

export const TradeHistory = ({
  forUser = false,
  selectedAssets,
  loadingSelectedPair,
  orderHistoryRows,
  loadingOrderHistoryRows,
  userOrderHistoryRows,
  loadingUserHistoryRows,
}: Props): JSX.Element => {
  // const { md } = useViewportContext();
  const { columns } = useHistory({
    selectedAssets,
    loadingSelectedPair,
    // forUser,
  });
  const dataSource = forUser ? userOrderHistoryRows : orderHistoryRows;
  // const desktopScrollForUserHistories =
  //   dataSource.length > 11
  //     ? {
  //         y: 290,
  //         x: true,
  //         scrollToFirstRowOnChange: false,
  //       }
  //     : { x: true, scrollToFirstRowOnChange: false };

  // const desktopScrollForHistories =
  //   dataSource.length > 24
  //     ? { y: 770, x: true, scrollToFirstRowOnChange: false }
  //     : { x: true, scrollToFirstRowOnChange: false };
  // const desktopScroll = forUser
  //   ? desktopScrollForUserHistories
  //   : desktopScrollForHistories;

  const scroll =
    dataSource.length > 100
      ? ({ y: 300, x: true, scrollToFirstRowOnChange: false } as Scroll)
      : ({ x: true, scrollToFirstRowOnChange: false } as Scroll);
  // const scroll = md ? mobileScroll : (desktopScroll as Scroll);

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
