import {
  Col as col,
  Row as row,
  styled,
  Button as UiButton,
  List as UiList,
  Table as UiTable,
} from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";
import { Check as check, Xmark as xmark } from "../../../../../ui/src/icons";

export const VoteTable = styled(UiTable)`
  max-width: 100%;
  .ant-table-thead > tr > th {
    background: transparent;
    color: ${colors.textColorSecondary};
    font-weight: 300;
    border: none;
    &:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    border: none;
    font-weight: 500;
  }
`;

export const VoteListItem = styled(UiList.Item)`
   {
    padding: 15px 20px;
  }
  .ant-list-item-action {
    display: flex;
    justify-content: space-between;
    li {
      padding: 0;
      .ant-list-item-action-split {
        display: none;
      }
    }
  }
`;

export const VoteItemContent = styled.div`
  margin: 18px 0 25px;
  .asset-info {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    .asset-info-title {
      font-weight: 300;
      color: ${colors.textColorSecondary};
    }
    .asset-info-value {
      font-weight: 500;
    }
  }
`;

export const VoteActionButton = styled(UiButton)`
   {
    margin: 0px;
    border: none;
    background: none;
    boxshadow: none;
    padding: 0;
    color: ${colors.additionalBlue};
    text-align: right;
    vertical-align: middle;
    &:hover {
      background: #fafafa;
    }
  }
`;

export const Container = styled.div`
  margin-bottom: 25px;
`;

export const Title = styled.h3`
  ${breakpoint.xs} {
    margin-bottom: 25px;
  }
`;

export const ColHeader = styled(col)`
  width: 25%;
  font-size: 12px;
  color: #6c6c6c;
  margin-bottom: 10px;
`;

export const Col = styled(col)`
  width: 25%;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Row = styled(row)`
  width: 100%;
`;

export const RowMessage = styled(row)`
  width: 100%;
  font-size: 20px;
  justify-content: center;
`;

/** ICONS */
export const Check = styled(check)`
  color: #11b881;
  margin-left: 15px;
`;

export const Xmark = styled(xmark)`
  color: #d01721;
  margin-left: 15px;
`;
