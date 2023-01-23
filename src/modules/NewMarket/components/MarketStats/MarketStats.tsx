import { useCallback, useEffect, useState } from "react";

import { useMarketPairStats } from "../../../../common/hooks";
import { useMarketContext } from "../../../../common/providers";
import { MarketPairStats } from "../../../../common/types";
import { colors } from "../../../../ui/src/colors";

import * as Styled from "./MarketStats.styled";

export function MarketStats(): JSX.Element {
  const [stats, setStats] = useState<MarketPairStats>();
  const { selectedPair } = useMarketContext();
  const { getMarketPairStats } = useMarketPairStats();

  const getMarketStats = useCallback(async () => {
    if (selectedPair) {
      try {
        const stats = await getMarketPairStats(
          selectedPair.base,
          selectedPair.quote
        );
        setStats(stats);
        console.log({ stats });
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedPair]);

  useEffect(() => {
    if (selectedPair) {
      getMarketStats();
    }
  }, [selectedPair]);

  return (
    <Styled.Row gutter={20}>
      <Styled.Col>
        {stats?.latestIsBuyOrder ? (
          <Styled.LatestBuyStatistic
            title={`${stats?.latest} ${selectedPair?.quote.symbol}`}
            value={`${stats?.latest} ${
              selectedPair?.base.symbol
            } ${String.fromCharCode(9650)}`}
            valueStyle={{ color: colors.marketBuy }} //need to get user's preferred currency
          />
        ) : (
          <Styled.LatestSellStatistic
            title={`${stats?.latest} ${selectedPair?.quote.symbol}`}
            value={`${stats?.latest} ${
              selectedPair?.base.symbol
            } ${String.fromCharCode(9660)}`} //need to get user's preferred currency
            valueStyle={{ color: colors.marketSell }}
          />
        )}
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="Ask" value={stats?.ask_quote} precision={4} />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="Bid" value={stats?.bid_quote} precision={4} />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic
          title="24h Change"
          valueStyle={{ color: colors.marketBuy }}
          value={`${stats?.percentChange}%`}
        />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="24h High" value={stats?.dailyHigh} />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="24h Low" value={stats?.dailyLow} />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="24h Volume" value={stats?.volume} />
      </Styled.Col>
    </Styled.Row>
  );
}
