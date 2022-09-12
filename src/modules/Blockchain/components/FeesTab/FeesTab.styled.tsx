import {
  styled,
  Dropdown as UiDropdown,
  ListItem as UiListItem,
  Table as UiTable,
  TableSearch as UiTableSearch,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const FeesTabWrapper = styled.div`
  margin: 0 0 15px;
  ${breakpoint.sm} {
    margin: 0 25px 25px;
  }
`;

export const Section = styled.section`
  padding: 0 15px 25px;
  ${mixIns.hairline}
`;

export const FeesSearch = styled(UiTableSearch)``;

export const FeesTable = styled(UiTable)`
  max-width: 700px;
  ${breakpoint.sm} {
    margin-bottom: 14px;
  }
  .ant-table-thead > tr > th {
    color: ${colors.textColorSecondary};
    background: ${colors.white};
    // border: none;
    font-size: 0.9em;
    font-weight: 300;
    &:before {
      display: none;
    }
    ${breakpoint.sm} {
      padding: 16px 0px;
    }
    ${breakpoint.md} {
      padding: 16px 16px 16px 0;
    }
  }
  .ant-table-tbody > tr > td {
    // border: none;
    vertical-align: baseline;
    div:not(:last-child) {
      margin-bottom: 15px;
    }
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
  .ant-tag {
    padding: 5px 15px;
    background: ${colors.assetTag};
    border: none;
    color: ${colors.textColor};
    text-transform: capitalize;
  }
  .standard-fee {
    text-align: right;
  }
`;

export const FeesHeader = styled.h3`
  margin-top: 25px;
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-top: 25px;
    margin-bottom: 15px;
  }
`;

export const FeesDropdown = styled(UiDropdown);

export const FeeListItem = styled(UiListItem)``;

export const FeeItemContent = styled.div`
  margin: 18px 0 25px;
  .fee-info {
    margin: 5px 0;
    display: flex;
    .fee-info-title {
      font-weight: 300;
      width: 85px;
      min-width: 85px;
      margin-right: 5px;
      color: ${colors.textColorSecondary};
    }
    .fee-info-value {
      font-weight: 500;
      span {
        padding: 5px 5px;
        background: ${colors.assetTag};
        border: none;
        color: ${colors.textColor};
        text-transform: capitalize;
      }
    }
  }
`;

export const FeeTypeOrValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  span:not(:last-child) {
    margin-bottom: 5px;
  }
`;
