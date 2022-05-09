import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";
import { mixIns } from "../../../ui/src/mixins";

export const Card = styled.div`
  height: 65px;
  ${breakpoint.xs} {
    height: 100px;
  }
  /* UI Properties */
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
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
    ${mixIns.borderRadius}
  }
`;
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    height: 25px;
  }
`;
export const TradingPair = styled.p`
  color: ${colors.textColorSecondary};
  font-size: 12px;
  margin: 10px 0 10px 6px;
  ${breakpoint.sm} {
    font-size: 14px;
    margin: 10px;
  }
`;
export const PercentChange = styled.p`
  color: ${(props) =>
    props.theme
      ? props.theme.percentChangeColor
      : props.theme.percentChangeColor};
  font-size: 12px;
  margin: 10px 10px 10px 0;
  ${breakpoint.xs} {
    margin: 10px;
    font-size: 14px;
  }
`;
export const Price = styled.p`
  text-align: left;
  color: ${colors.textColor};
  opacity: 1;
  font-size: 16px;
  margin-left: 10px;
  display: ${(props) =>
    props.theme ? props.theme.display : props.theme.display};
  ${breakpoint.sm} {
    font-size: 28px;
  }
`;
export const Volume = styled.p`
  text-align: left;
  color: ${colors.textColor};
  opacity: 1;
  font-size: 16px;
  margin-left: 10px;
  ${breakpoint.xs} {
    font-size: 28px;
  }
`;
