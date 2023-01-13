import { styled } from "../../../../../ui/src";
import { colors } from "../../../../../ui/src/colors";

export const SpreadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9em;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.borderColorBase};
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 5px;
  padding-right: 5px;
  overflow: hidden;
`;

export const SpreadCell = styled.div`
  display: flex;
  align-items: center;
`;

export const SpreadIcon = styled.i`
  margin-right: 5px;
  margin-left: 2px;
  font-size: 16px;

  &.buy::before {
    content: "▲";
    color: ${colors.marketBuy};
  }

  &.sell::before {
    content: "▼";
    color: ${colors.marketSell};
  }
`;
