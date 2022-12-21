import { useRouter } from "next/router";
import React from "react";

import { useUpdateExchanges } from "../../hooks";

import * as Styled from "./TradingPairCard.styled";
import { useTradingPairStyles } from "./hooks";

type PairProps = {
  tradingPair: string;
  price: string;
  percentChange: string;
  volume: string;
};

export const TradingPairCard = ({
  tradingPair,
  price,
  percentChange,
  volume,
}: PairProps): JSX.Element => {
  const router = useRouter();
  const { updateExchanges } = useUpdateExchanges();

  const {
    handleMouseHover,
    handleMouseOut,
    changeBackgroundColor,
    showChangeAndVolume,
    positiveTheme,
    negativeTheme,
  } = useTradingPairStyles(percentChange);

  return (
    <div
      onClick={() => {
        const activePair = tradingPair.replace("/", "_");
        updateExchanges(activePair);
        router.push(`/market/${activePair}`);
      }}
    >
      <Styled.Card
        className="trading-card"
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseOut}
        theme={changeBackgroundColor ? positiveTheme : negativeTheme}
      >
        <Styled.ContentHeader>
          <Styled.TradingPair>{tradingPair}</Styled.TradingPair>
          {showChangeAndVolume && (
            <Styled.PercentChange
              theme={changeBackgroundColor ? positiveTheme : negativeTheme}
            >
              {changeBackgroundColor ? "+" : ""}
              {percentChange}
            </Styled.PercentChange>
          )}
        </Styled.ContentHeader>
        <Styled.Price
          theme={showChangeAndVolume ? positiveTheme : negativeTheme}
        >
          {price}
        </Styled.Price>
        {showChangeAndVolume && <Styled.Volume>{volume}</Styled.Volume>}
      </Styled.Card>
    </div>
  );
};
