import { Table as UiTable } from "ant-table-extensions";

import {
  styled,
  ListItem as UiListItem,
  PrintTable as UiPrintTable,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const SonsTabWrapper = styled.div`
  margin: 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px;
  }
`;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const SonsHeaderBar = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  align-content: center;
  .ant-input-group-wrapper {
    margin: 0;
  }
  .ant-input-affix-wrapper {
    width: 40%;
    height: 50px;
    max-width: 341px;
    margin-right: 15px;
  }
  ${breakpoint.sm} {
    .ant-input-affix-wrapper {
      width: 50%;
      margin-right: 25px;
    }
  }
`;

export const SonsHeader = styled.h3`
  margin-left: 15px;
  .anticon-info-circle {
    margin: 0 15px;
    color: ${colors.warningColor};
  }
  ${breakpoint.sm} {
    margin: 0 20px;
  }
`;

export const DownloadLinks = styled.span`
  .anticon-download {
    margin-right: 15px;
    height: 17px;
    color: ${colors.lightText};
  }
`;

export const SonsTable = styled(UiTable)`
  .ant-table {
    max-width: 727px;
  }
  ${breakpoint.sm} {
    margin-bottom: 14px;
  }
  .ant-table-thead > tr > th {
    color: ${colors.textColorSecondary};
    background: ${colors.white};
    border: none;
    font-size: 0.9em;
    font-weight: 300;
    &:before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    border: none;
  }
  .anticon-link {
    color: ${colors.linkColor};
  }
`;

export const SonListItem = styled(UiListItem)``;

export const SonItemContent = styled.div`
  margin: 18px 0 25px;
  .son-info {
    margin: 5px 0;
    display: flex;
    .son-info-title {
      font-weight: 300;
      width: 120px;
      min-width: 120px;
      word-break: break-word;
      margin-right: 5px;
      color: ${colors.textColorSecondary};
    }
    .son-info-value {
      font-weight: 500;
    }
  }
`;

export const PrintTable = styled(UiPrintTable)``;
