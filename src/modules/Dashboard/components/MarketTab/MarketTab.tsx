import React from "react";

import * as Styled from "./MarketTab.styled";
import { TradingPairCard } from "./components";

export const MarketTab = (): JSX.Element => {
  const pairs = [
    {
      tradingPair: "BTC/PPY",
      HoverAmount: "38,872.1",
      TradingPairAmt: "-3.28%",
      amount: "1.000",
    },
    {
      tradingPair: "ETH/PPY",
      HoverAmount: "858.53",
      TradingPairAmt: "+4.8%",
      amount: "1.00",
    },
    {
      tradingPair: "PPY/HIVE",
      HoverAmount: "1.38",
      TradingPairAmt: "+2.8%",
      amount: "1.1",
    },
    {
      tradingPair: "PPY/SPK",
      HoverAmount: "8.58",
      TradingPairAmt: "-8.0%",
      amount: "1.00",
    },
  ];

  return (
    <Styled.MarketContainer>
      <Styled.HeadingPara>
        Choose the trading pair you want to use
      </Styled.HeadingPara>
      <Styled.Row>
        {pairs.map((e, index) => (
          <Styled.Col span={11} key={index}>
            <TradingPairCard
              tradingPair={e.tradingPair}
              amount={e.amount}
              TradingPairAmt={e.TradingPairAmt}
              HoverAmount={e.HoverAmount}
            />
          </Styled.Col>
        ))}
      </Styled.Row>
    </Styled.MarketContainer>
  );
};
