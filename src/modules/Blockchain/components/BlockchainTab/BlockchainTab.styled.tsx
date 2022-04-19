import {
  Input,
  styled,
  StatsCardsDeck as UIStatsCardsDeck,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

const { Search } = Input;

export const BlockTabWrapper = styled.div`
  margin: 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px;
  }
`;

export const StatsCardsDeck = styled(UIStatsCardsDeck)``;

export const BlockSearch = styled(Search)`
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
