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

`;

export const SpreadCell = styled.div`
  display: flex;
  align-items: center;
`;

export const SpreadIcon = styled.i`
    font-size: 18px;
    margin-right: 0px;
    
    &.buy::before {
        content: "↑";
        color: ${colors.marketBuy};
        font-size: 18px;
        margin-right: 0px;
    }
    
    &.sell::before {
        content: "↓";
        color: ${colors.marketSell};
        font-size: 18px;
        margin-right: 0px;
    }
`;