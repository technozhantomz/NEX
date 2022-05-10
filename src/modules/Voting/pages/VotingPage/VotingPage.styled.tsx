import { styled, Text as text, Card as UiCard } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const VotingPageCard = styled(UiCard)`
  .ant-card-body {
    padding: 0;
    width: 100%;
    .ant-tabs-tab,
    .ant-tabs-extra-content {
      justify-content: center;
      padding: 33px 28px 10px;
    }
  }
  ${breakpoint.sm} {
    .ant-card-body {
      .ant-tabs-nav-operations {
        display: flex;
      }
    }
  }
`;

export const Text = styled(text)``;
