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
    <Styled.Row gutter={30}>
      <Styled.Col>
        {/* shall display the last price (quote asset) for the selected market pair. */}
        <Styled.LatestStatistic
          title={`${stats?.latest} ${selectedPair?.quote.symbol}`}
          // shall display the last price in the user’s preferred currency (user settings).
          // In a market pair, there's a base/quote, so this should be the base price
          value={`${stats?.latest} ${selectedPair?.base.symbol}`}
        />
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
          value={stats?.percentChange}
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
