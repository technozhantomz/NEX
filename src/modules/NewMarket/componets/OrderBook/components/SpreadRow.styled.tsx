import { styled } from "../../../../../ui/src";
import { colors } from "../../../../../ui/src/colors";

export const SpreadRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75em;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.borderColorBase};
  border-radius: 3px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-left: 4px;
  padding-right: 4px;
  overflow: hidden;
`;

export const SpreadCell = styled.div`
  display: flex;
  align-items: center;
  padding-right: 2px;
`;

export const SpreadIcon = styled.i`
  margin-right: 5px;
  margin-left: 2px;
  font-size: 1.4em;

  &.buy::before {
    content: "▲";
    color: ${colors.marketBuy};
  }

  &.sell::before {
    content: "▼";
    color: ${colors.marketSell};
  }
`;
