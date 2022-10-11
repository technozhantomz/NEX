import {
  styled,
  Card as UiCard,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const BlockCard = styled(UiCard)`
  .ant-card-body {
    color: ${colors.textColor}
    padding: 0;
    .ant-tabs-tab {
      justify-content: center;
      padding: 33px 28px 10px;
    }
    .ant-tabs-top > .ant-tabs-nav::before {
      ${mixIns.inActiveTab}
    }
    .ant-tabs > .ant-tabs-nav .ant-tabs-nav-list {
      justify-content: space-between;
      width: 100%;
    }
    .ant-tabs-ink-bar {
      height: 2pt;
    }
    .ant-tabs-nav-operations {
      display: none;
    }
  }
  ${breakpoint.sm} {
  }
`;
export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const BlockWrapper = styled.div`
  margin: 35px;
  max-width: 800px;
`;

export const BlockNav = styled.div`
  display: flex;
  align-items: center;
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
  justify-content: space-between;
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
`;
export const BlockTime = styled.p`
  font-weight: 400;
`;
