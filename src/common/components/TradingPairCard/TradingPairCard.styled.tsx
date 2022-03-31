import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const Card = styled.div`
  height: 100px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  opacity: 1;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    border: 1px solid ${colors.borderColorBase};
    background: transparent
      linear-gradient(
        180deg,
        ${(props) =>
          props.theme
            ? props.theme.backgroundColorCode
            : props.theme.backgroundColorCode},
        ${colors.white} 100%
      )
      0% 0% no-repeat padding-box;
    border-radius: 4px;
    opacity: 1;
  }
`;
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TradingPair = styled.p`
  text-align: left;
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: ${colors.textColorSecondary};
  opacity: 1;
  font-size: 14px;
  margin: 10px;
`;
export const PercentChange = styled.p`
  font: normal normal medium 14px/17px Inter;
  letter-spacing: 0px;
  color: ${(props) =>
    props.theme
      ? props.theme.percentChangeColor
      : props.theme.percentChangeColor};
  opacity: 1;
  font-size: 14px;
  margin: 10px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;
export const Price = styled.p`
  text-align: left;
  font: normal normal medium 28px/34px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  font-size: 28px;
  margin-left: 10px;
  display: ${(props) =>
    props.theme ? props.theme.display : props.theme.display};
`;
export const Volume = styled.p`
  text-align: left;
  font: normal normal medium 28px/34px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  font-size: 28px;
  margin-left: 10px;
  ${breakpoint.sm} {
    font-size: 26px;
  }
`;
