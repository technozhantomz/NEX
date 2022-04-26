import {
  styled,
  ListItem as UiListItem,
  Table as UiTable,
} from "../../../../../../ui/src";
import { colors } from "../../../../../../ui/src/colors";

export const BlockTable = styled(UiTable)`
  max-width: 635px;
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
  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
  .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    cursor: pointer;
  }
`;

export const BlockListItem = styled(UiListItem)``;

export const BlockItemContent = styled.div`
  margin: 18px 0 25px;

  .block-info {
    margin: 5px 0;
    display: flex;
    .block-info-title {
      font-weight: 300;
      width: 100px;
      color: ${colors.textColorSecondary};
    }
    .block-info-value {
      font-weight: 500;
    }
  }
`;
