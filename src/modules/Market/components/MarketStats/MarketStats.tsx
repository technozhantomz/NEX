import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import counterpart from "counterpart";
import { useRouter } from "next/router";

import { TradeHistoryRow } from "../../../../common/types";
import { colors } from "../../../../ui/src/colors";

import * as Styled from "./MarketStats.styled";
import { useMarketStats } from "./hooks";

export function MarketStats(): JSX.Element {
  const { marketPairStats, lastTradeHistory } = useMarketStats();
  const router = useRouter();
  const { pair } = router.query;
  const baseSymbol = (pair as string).split("_")[1];
  const quoteSymbol = (pair as string).split("_")[0];
  const renderPriceArrow = (lastTradeHistory: TradeHistoryRow) => {
    const arrow = lastTradeHistory.isPriceUp ? (
      <CaretUpOutlined />
    ) : (
      <CaretDownOutlined />
    );
    return lastTradeHistory.isPriceUp !== undefined ? arrow : "";
  };

  return (
    <Styled.Row>
      {lastTradeHistory && (
        <Styled.LatestCol>
          <Styled.LatestStatisticContainer>
            {lastTradeHistory.isBuyOrder ? (
              <>
                <Styled.LatestBuyStatisticValue>
                  {`${marketPairStats?.latest}`}{" "}
                  {renderPriceArrow(lastTradeHistory)}
                </Styled.LatestBuyStatisticValue>
                <Styled.LatestStatisticUnit>
                  {`${baseSymbol}`}
                </Styled.LatestStatisticUnit>
              </>
            ) : (
              <>
                <Styled.LatestSellStatisticValue>
                  {`${marketPairStats?.latest}`}{" "}
                  {renderPriceArrow(lastTradeHistory)}
                </Styled.LatestSellStatisticValue>
                <Styled.LatestStatisticUnit>{`${baseSymbol}`}</Styled.LatestStatisticUnit>
              </>
            )}
          </Styled.LatestStatisticContainer>
        </Styled.LatestCol>
      )}
      <Styled.Col>
        <Styled.Statistic
          title={counterpart.translate(
            "pages.market.twenty_four_hour_lowest_ask"
          )}
          value={marketPairStats.lowestAsk}
        />
      </Styled.Col>
      <Styled.Col>
        <Styled.Statistic
          title={counterpart.translate(
            "pages.market.twenty_four_hour_highest_bid"
          )}
          value={marketPairStats.highestBid}
        />
      </Styled.Col>
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
          value={`${marketPairStats.volume} ${quoteSymbol}`}
        />
      </Styled.Col>
    </Styled.Row>
  );
}
