import { Button, List, styled, Table } from "../../../../../../ui/src";
import { colors } from "../../../../../../ui/src/colors";
import { mixIns } from "../../../../../../ui/src/mixins";

export const ProxyTable = styled(Table)`
  padding: 0 35px 25px;
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
export const ProxyList = styled(List)`
  ${mixIns.hairlineTop}
  padding: 25px 0;
  &.ant-list-split.ant-list-something-after-last-item
    .ant-spin-container
    > .ant-list-items
    > .ant-list-item:last-child {
    border-bottom: none;
  }
`;

export const ProxyListItem = styled(List.Item)`
  padding: 15px 25px;
  border-bottom: none;
`;

export const ProxyListItemContent = styled.div`
  width: 100%;
  margin: 18px 0 25px;
  .vote-info {
    margin: 5px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .vote-info-title {
      font-weight: 300;
      color: ${colors.textColorSecondary};
      margin-right: 30px;
    }
    .vote-info-value {
      font-weight: 500;
    }
  }
`;

export const ProxyTableActionButton = styled(Button)`
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
`;
