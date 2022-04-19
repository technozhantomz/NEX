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

export const WitnessesTabWrapper = styled.div`
  margin: 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px;
  }
`;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const WitnessesSearch = styled(Search)`
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

export const WitnessesTable = styled(UiTable)`
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

export const WitnessListItem = styled(UiList.Item)``;

export const WitnessItemContent = styled.div`
  margin: 18px 0 25px;
  .witness-info {
    margin: 5px 0;
    display: flex;
    .witness-info-title {
      font-weight: 300;
      width: 100px;
      color: ${colors.textColorSecondary};
    }
    .witness-info-value {
      font-weight: 500;
    }
  }
`;
