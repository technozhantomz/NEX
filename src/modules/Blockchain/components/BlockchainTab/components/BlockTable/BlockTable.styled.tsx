import { styled, Table as UiTable } from "../../../../../../ui/src";
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
