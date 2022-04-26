import Link from "next/link";
import React from "react";

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
  const {
    handleMouseHover,
    handleMouseOut,
    changeBackgroundColor,
    showChangeAndVolume,
    positiveTheme,
    negativeTheme,
  } = useTradingPairStyles(percentChange);

  return (
    <Link href={`/market/${tradingPair.replace("/", "_")}`} passHref>
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
              {changeBackgroundColor ? "+" : "-"}
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
    </Link>
  );
};
