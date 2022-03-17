import { styled } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const StatsCard = styled.div`
  height: 120px;
  width: 220px;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  padding: 15px;
  &:hover {
    border: 2px solid #0a48be;
    background: transparent
      linear-gradient(0deg, ${colors.textColor} 0%, #d9e6ff 100%) 0% 0%
      no-repeat padding-box;
    background: transparent
      linear-gradient(0deg, ${colors.white} 0%, #d9e6ff 100%) 0% 0% no-repeat
      padding-box;
    box-shadow: 0px 15px 30px #c7c7c729;
  }
  &.no-data {
    background: #f0f0f0 0% 0% no-repeat padding-box;
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
