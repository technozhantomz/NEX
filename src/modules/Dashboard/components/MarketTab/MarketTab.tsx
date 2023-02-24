import counterpart from "counterpart";
import React from "react";

import {
  LoadingIndicator,
  TradingPairCard,
} from "../../../../common/components";

import * as Styled from "./MarketTab.styled";
import { useMarketTab } from "./hooks";

export const MarketTab = (): JSX.Element => {
  const { pairs, loading } = useMarketTab();

  return (
    <Styled.MarketContainer>
      <Styled.Heading>
        {counterpart.translate(`pages.dashboard.marketTab.heading`)}
      </Styled.Heading>
      {loading ? (
        <LoadingIndicator type="three-bounce" />
      ) : (
        <Styled.Div>
          <Styled.Row gutter={[16, 16]}>
            {pairs.map((pair) => (
              <Styled.Col span={12} key={pair.tradingPair}>
                <TradingPairCard
                  tradingPair={pair.tradingPair}
                  price={`${pair.marketPairStats.latest}`}
                  percentChange={`${pair.marketPairStats.percentChange}%`}
                  volume={`${pair.marketPairStats.volume}`}
                />
              </Styled.Col>
            ))}
          </Styled.Row>
        </Styled.Div>
      )}
    </Styled.MarketContainer>
  );
};
