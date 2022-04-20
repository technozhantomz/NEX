import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const Card = styled.div`
  height: 100px;
  /* UI Properties */
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    border: 1px solid ${colors.primaryColor};
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
  }
`;
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const TradingPair = styled.p`
  text-align: left;
  color: ${colors.textColorSecondary};
  opacity: 1;
  font-size: 14px;
  margin: 10px;
`;
export const PercentChange = styled.p`
  color: ${(props) =>
    props.theme
      ? props.theme.percentChangeColor
      : props.theme.percentChangeColor};
  font-size: 12px;
  margin: 10px;
  ${breakpoint.xs} {
    font-size: 14px;
  }
`;
export const Price = styled.p`
  text-align: left;
  color: ${colors.textColor};
  font-size: 28px;
  margin-left: 10px;
  display: ${(props) =>
    props.theme ? props.theme.display : props.theme.display};
`;
export const Volume = styled.p`
  text-align: left;
  color: ${colors.textColor};
  font-size: 26px;
  margin-left: 10px;
  ${breakpoint.xs} {
    font-size: 28px;
  }
`;
