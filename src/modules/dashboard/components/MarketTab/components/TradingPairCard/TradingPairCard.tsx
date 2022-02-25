import React, { useState } from "react";

import * as Styled from "./TradingPairCard.styled";

type PairProps = {
  tradingPair: string;
  amount: string;
  HoverAmount: string;
  TradingPairAmt: string;
};

export const TradingPairCard = ({
  tradingPair,
  amount,
  TradingPairAmt,
  HoverAmount,
}: PairProps): JSX.Element => {
  const [showText, setShowText] = useState<boolean>(false);
  const [changeStyle, setChangeStyle] = useState<boolean>(false);

  const positiveTheme = {
    backgroundColorCode: "#CBFFED 0%",
    display: "none",
    TradingPairAmtColor: "#1CB881",
  };

  const negativeTheme = {
    backgroundColorCode: "#FFE7E7 0%",
    display: "block",
    TradingPairAmtColor: "#E2444D;",
  };

  const mouseHover = () => {
    const pairamt = parseInt(TradingPairAmt);

    if (pairamt >= 0) {
      setChangeStyle(true);
    } else {
      setChangeStyle(false);
    }
    setShowText(true);
  };

  const mouseOut = () => {
    setShowText(false);
  };

  return (
    <Styled.Card
      onMouseEnter={mouseHover}
      onMouseLeave={mouseOut}
      theme={changeStyle ? positiveTheme : negativeTheme}
    >
      <Styled.ContentHeaderDiv>
        <Styled.TradingPairPara>{tradingPair}</Styled.TradingPairPara>
        {showText && (
          <Styled.TradingPairAmt
            theme={changeStyle ? positiveTheme : negativeTheme}
          >
            {TradingPairAmt}
          </Styled.TradingPairAmt>
        )}
      </Styled.ContentHeaderDiv>
      <Styled.Amount theme={showText ? positiveTheme : negativeTheme}>
        {amount}
      </Styled.Amount>
      {showText && <Styled.HoverAmount>{HoverAmount}</Styled.HoverAmount>}
    </Styled.Card>
  );
};
