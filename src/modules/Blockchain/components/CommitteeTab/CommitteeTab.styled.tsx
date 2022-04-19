import {
  Input,
  styled,
  List as UiList,
  StatsCardsDeck as UIStatsCardsDeck,
  Table as UiTable,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

const { Search } = Input;

export const CommitteeTabWrapper = styled.div`
  margin: 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px;
  }
`;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const CommitteeSearch = styled(Search)`
  max-width: 520px;
  margin-bottom: 35px;
  .ant-input {
    ${mixIns.borderRadius}
  }
  > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
`;

export const CommitteeTable = styled(UiTable)`
  max-width: 798px;
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

export const CommiteeListItem = styled(UiList.Item)``;

export const CommiteeItemContent = styled.div`
  margin: 18px 0 25px;
  .commitee-info {
    margin: 5px 0;
    display: flex;
    .commitee-info-title {
      font-weight: 300;
      width: 100px;
      color: ${colors.textColorSecondary};
    }
    .commitee-info-value {
      font-weight: 500;
    }
  }
`;
