import * as Styled from "./SpreadRow.styled";

type SpreadProps = {
  lastTradeType: "buy" | "sell" | "";
  lastTradePrice: number;
  lastTradeFiatValue: number;
  spread: number;
};

export const SpreadRow = ({
  lastTradeType,
  lastTradePrice,
  lastTradeFiatValue,
  spread,
}: SpreadProps): JSX.Element => {
  return (
    <Styled.SpreadRow>
      <Styled.SpreadCell>{spread.toFixed(3)}</Styled.SpreadCell>
      <Styled.SpreadCell>
        <Styled.SpreadIcon className={lastTradeType}>
          {lastTradeType === "buy" ? (
            <i className="fas fa-caret-up" style={{ color: "green" }} />
          ) : (
            <i className="fas fa-caret-down" style={{ color: "red" }} />
          )}
        </Styled.SpreadIcon>
      </Styled.SpreadCell>
      <Styled.SpreadCell>{lastTradePrice.toFixed(3)}</Styled.SpreadCell>
      <Styled.SpreadCell>{lastTradeFiatValue.toFixed(3)}</Styled.SpreadCell>
    </Styled.SpreadRow>
  );
};
