import {
  styled,
  List as UiList,
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
`;

export const BlockListItem = styled(UiList.Item)`
  padding: 15px 20px;
`;

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
