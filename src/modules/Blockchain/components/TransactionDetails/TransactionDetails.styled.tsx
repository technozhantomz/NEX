import {
  styled,
  Card as UiCard,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const LoadingContainer = styled.div`
  min-height: 44px;
  margin-left: 64px;
`;

export const BlockCard = styled(UiCard)`
    .ant-card-body {
      color: ${colors.textColor}
      padding: 0;
    }
  `;
export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const BlockWrapper = styled.div`
  margin: 20px 15px;
  max-width: 800px;
`;

export const BlockNav = styled.div`
  display: flex;
  align-items: center;
  a {
    color: ${colors.textColor};
  }
`;

export const BlockNavItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 25px;
`;

export const BlockNumber = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  font-weight: 400;
  margin: 0;
`;

export const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint.sm} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const BlockInfoTitle = styled.h3`
  font-size: 1em;
  font-weight: 200;
`;

export const BlockInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  word-break: break-all;
  width: 100%;
  min-height: 120px;
  ${breakpoint.sm} {
    min-height: 88px;
  }
`;
export const BlockTime = styled.p`
  font-weight: 400;
`;
