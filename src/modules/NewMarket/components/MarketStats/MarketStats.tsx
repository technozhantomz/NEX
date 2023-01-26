import counterpart from "counterpart";

import { colors } from "../../../../ui/src/colors";

import * as Styled from "./MarketStats.styled";
import { useMarketStats } from "./hooks";

export function MarketStats(): JSX.Element {
  const { marketPairStats } = useMarketStats();
  return (
    <Styled.Row gutter={20}>
      <Styled.Col>
        {/* {stats?.latestIsBuyOrder ? (
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
        )} */}
      </Styled.Col>
      {/* <Styled.Col>
        <Styled.Statistic title="Ask" value={stats?.ask_quote} precision={4} />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic title="Bid" value={stats?.bid_quote} precision={4} />
      </Styled.Col> */}
      <Styled.Col>
        <Styled.Statistic
          title={counterpart.translate("pages.market.twenty_four_hour_change")}
          valueStyle={{ color: colors.marketBuy }}
          value={`${marketPairStats.percentChange}%`}
        />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic
          title={counterpart.translate("pages.market.twenty_four_hour_high")}
          value={marketPairStats.dailyHigh}
        />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic
          title={counterpart.translate("pages.market.twenty_four_hour_low")}
          value={marketPairStats.dailyLow}
        />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic
          title={counterpart.translate("pages.market.twenty_four_hour_volume")}
          value={marketPairStats.volume}
        />
      </Styled.Col>
    </Styled.Row>
  );
}
