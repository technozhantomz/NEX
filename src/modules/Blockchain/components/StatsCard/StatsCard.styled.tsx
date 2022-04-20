import { styled } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const StatsCard = styled.div`
  height: 120px;
  min-width: 220px;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  padding: 15px;
  &:hover {
    border: 2px solid #0a48be;
    background: transparent
      linear-gradient(0deg, ${colors.white} 0%, #d9e6ff 100%) 0% 0% no-repeat
      padding-box;
    box-shadow: 0px 15px 30px #c7c7c729;
  }
  &.no-data {
    background: ${colors.inactiveColor} 0% 0% no-repeat padding-box;
    box-shadow: 0px 15px 30px #c7c7c729;
  }
`;

export const StatsCardHeading = styled.h3`
  color: ${colors.textColor};
  font-size: 1em;
`;
export const StatsCardValue = styled.p`
  color: ${colors.textColorSecondary};
  font-size: 1.4em;
  font-weight: 500;
  margin-bottom: 8px;
  span {
    font-size: 0.8em;
    font-weight: 400;
  }
`;
