import { styled } from "../../../../../../ui/src";

export const Card = styled.div`
  height: 100px;
  /* UI Properties */
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #c1c2c4;
  border-radius: 4px;
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background: transparent
      linear-gradient(
        180deg,
        ${(props) =>
          props.theme
            ? props.theme.backgroundColorCode
            : props.theme.backgroundColorCode},
        var(---text-icons-ffffff) 100%
      )
      0% 0% no-repeat padding-box;
    border: 1px solid var(---primary-blue);
    background: transparent
      linear-gradient(
        180deg,
        ${(props) =>
          props.theme
            ? props.theme.backgroundColorCode
            : props.theme.backgroundColorCode},
        #ffffff 100%
      )
      0% 0% no-repeat padding-box;
    border: 1px solid #0a48be;
    border-radius: 4px;
    opacity: 1;
  }
`;
export const ContentHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TradingPairPara = styled.p`
  text-align: left;
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: #6c6c6c;
  opacity: 1;
  font-size: 14px;
  margin: 10px;
`;
export const TradingPairAmt = styled.p`
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: ${(props) =>
    props.theme
      ? props.theme.TradingPairAmtColor
      : props.theme.TradingPairAmtColor};
  opacity: 1;
  font-size: 14px;
  margin: 10px;
`;
export const Amount = styled.p`
  color: var(---text-icons);
  text-align: left;
  font: normal normal medium 28px/34px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  font-size: 28px;
  margin-left: 10px;
  display: ${(props) =>
    props.theme ? props.theme.display : props.theme.display};
`;
export const HoverAmount = styled.p`
  color: var(---text-icons);
  text-align: left;
  font: normal normal medium 28px/34px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  font-size: 28px;
  margin-left: 10px;
`;
