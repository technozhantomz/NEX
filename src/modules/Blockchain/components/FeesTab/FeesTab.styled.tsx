import {
  BlockchainDownloadLinks,
  BlockchainHeaderBar,
  BlockchainItemContent,
  BlockchainTable,
  BlockchainTabWrapper,
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const FeesTabWrapper = styled(BlockchainTabWrapper)``;

export const FeesHeaderBar = styled(BlockchainHeaderBar)``;

export const FeesHeader = styled.h3`
  .anticon-info-circle {
    margin: 0 15px;
    color: ${colors.warningColor};
  }
  ${breakpoint.sm} {
    margin: 0 20px;
  }
`;

export const DownloadLinks = styled(BlockchainDownloadLinks)``;

export const FeesTable = styled(BlockchainTable)`
  .ant-table-thead > tr > th {
    ${breakpoint.sm} {
      padding: 16px 0px;
    }
    ${breakpoint.md} {
      padding: 16px 16px 16px 0;
    }
  }
  .ant-table-tbody > tr > td {
    ${breakpoint.sm} {
      padding: 16px 0px;
      span {
        padding: 5px 16px;
      }
    }
    ${breakpoint.md} {
      padding: 16px 16px 16px 0;
      span {
        padding: 5px 21px;
      }
    }
  }
`;

export const FeeListItem = styled(UiListItem)``;

export const FeeItemContent = styled(BlockchainItemContent)``;

export const FeeTypeOrValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  span:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export const PrintTable = styled(UiPrintTable)``;
