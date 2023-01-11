import { useViewportContext } from "../../../../common/providers";
import { Scroll } from "../../../../common/types";
import { Order, OrderRow, PairAssets } from "../../types";
import { SpreadRow } from "./components";

import * as Styled from "./OrderBook.styled";
import { useOrderBook } from "./hooks";
import { useState } from "react";

type Props = {
    selectedAssets: PairAssets | undefined;
    loadingSelectedPair: boolean;
    loadingAsksBids: boolean;
    bids: Order[];
    asks: Order[];
};

export const OrderBook = ({
    selectedAssets,
    loadingSelectedPair,
    loadingAsksBids,
    bids,
    asks,
}: Props): JSX.Element => {
  const { md } = useViewportContext();
  const { columns } = useOrderBook({
    selectedAssets,
    loadingSelectedPair,
    loadingAsksBids,
  });

  // Add state variable to keep track of the selected filter type
  const [filterType, setFilterType] = useState<"all" | "bids" | "asks">(
    "all"
  );

   // Use the filterType state variable to decide which orders to display
  const dataSource =
  filterType === "bids"
    ? bids
    : filterType === "asks"
    ? asks
    : [...bids, ...asks];

  const desktopScrollForOrders =
    dataSource.length > 60
      ? { y: 1035, x: true, scrollToFirstRowOnChange: false }
      : { x: true, scrollToFirstRowOnChange: false };
    
  const desktopScroll = desktopScrollForOrders;

  const mobileScroll =
    dataSource.length > 6
      ? ({ y: 300, x: true, scrollToFirstRowOnChange: false } as Scroll)
      : ({ x: true, scrollToFirstRowOnChange: false } as Scroll);

  const scroll = md ? mobileScroll : (desktopScroll as Scroll);

  const lastTradeType = dataSource[0] ? (dataSource[0].isBuyOrder ? "buy" : "sell") : "";
  const lastTradePrice = dataSource[0] ? parseFloat(dataSource[0].quote) : 0;
  const lastTradeFiatAmount = dataSource[0] ? parseFloat(dataSource[0].price) : 0;
    const spread = bids[0] && asks[0] ?  parseFloat(bids[0].quote) - parseFloat(asks[0].quote) : 0;

  return (
    <>
      <Styled.OrderBookContainer>
        <Styled.Heading>Order Book</Styled.Heading>
        <Styled.ButtonGroup>
            <Styled.Button
              type={filterType === "all" ? "primary" : "default"}
              onClick={() => setFilterType("all")}
            >
              All
            </Styled.Button>
            <Styled.Button
              type={filterType === "bids" ? "primary" : "default"}
              onClick={() => setFilterType("bids")}
            >
              Buy
            </Styled.Button>
            <Styled.Button
              type={filterType === "asks" ? "primary" : "default"}
              onClick={() => setFilterType("asks")}
            >
              Sell
            </Styled.Button>
          </Styled.ButtonGroup>
        
        {filterType !== "asks" && (
            <Styled.BidRows>
                <Styled.Table
                    pagination={false}
                    columns={columns}
                    bordered={false}
                    scroll={scroll}
                    dataSource={bids}
                    rowClassName={(record) => {
                        const item = record as OrderRow;
                        return "buy";
                    }}
                ></Styled.Table>
            </Styled.BidRows>
        )}
        <SpreadRow 
            lastTradeType={lastTradeType}
            lastTradePrice={lastTradePrice}
            lastTradeFiatValue={lastTradeFiatAmount}
            spread={spread}
        />
        {filterType !== "bids" && (
            <Styled.AskRows className="ask-rows">
                <Styled.Table
                    pagination={false}
                    columns={columns}
                    bordered={false}
                    scroll={scroll}
                    dataSource={asks}
                    rowClassName={(record) => {
                        const item = record as OrderRow;
                        return "sell";
                    }}
                ></Styled.Table>
            </Styled.AskRows>
        )}
      </Styled.OrderBookContainer>
    </>
  );
};
