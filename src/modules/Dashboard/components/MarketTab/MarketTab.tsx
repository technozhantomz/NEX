import React from "react";

import { TradingPairCard } from "../../../../common/components";

import * as Styled from "./MarketTab.styled";
import { useMarketTab } from "./hooks";

export const MarketTab = (): JSX.Element => {
  const { pairs } = useMarketTab();

  return (
    <Styled.MarketContainer>
      <Styled.Heading>Choose the trading pair you want to use</Styled.Heading>
      <Styled.Row>
        {pairs.map((pair, index) => (
          <Styled.Col span={11} key={index}>
            <TradingPairCard
              tradingPair={pair.tradingPair}
              price={`${pair.marketPairStats.latest}`}
              percentChange={`${pair.marketPairStats.percentChange}%`}
              volume={`${pair.marketPairStats.volume}`}
            />
          </Styled.Col>
        ))}
      </Styled.Row>
    </Styled.MarketContainer>
  );
};
