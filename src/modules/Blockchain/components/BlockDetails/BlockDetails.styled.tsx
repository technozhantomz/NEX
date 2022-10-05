import { styled, Card as UiCard } from "../../../../ui/src";
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

export const BlockWrapper = styled.div`
  margin: 35px;
  max-width: 374px;
`;
export const BlockNumber = styled.h2`
  display: flex;
  justify-content: space-between;
  font-size: 1em;
  font-weight: 400;
  margin: 0;
`;
export const BlockInfoTitle = styled.h3`
  margin: 20px 0;
  font-size: 1em;
  font-weight: 200;
`;
export const BlockInfo = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: normal;
`;
export const BlockTime = styled.p`
  font-weight: 400;
`;
