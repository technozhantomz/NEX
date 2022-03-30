import {
  styled,
  Table as table,
  Text as text,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";
import { Check as check, Xmark as xmark } from "../../../../ui/src/icons";

export const ActionFormTabCard = styled.div`
  text-align: left;
`;

export const TableTitle = styled(text)`
  color: var(---text-icons);
  text-align: left;
  font: normal normal medium 16px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  font-size: 16px;
`;

export const Table = styled(table)`
  width: 760px;
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

export const Check = styled(check)`
  color: #11b881;
  margin-left: 15px;
`;

export const Xmark = styled(xmark)`
  color: #d01721;
  margin-left: 15px;
`;
