import { styled, List as UiList, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const FeesTabWrapper = styled.div`
  margin: 0 25px;
`;

export const FeesTable = styled(UiTable)`
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
  .ant-tag {
    padding: 5px 15px;
    background: ${colors.assetTag};
    border: none;
    color: ${colors.textColor};
    text-transform: capitalize;
  }
`;

export const FeeListItem = styled(UiList.Item)`
  padding: 15px 20px;
`;

export const FeeItemContent = styled.div`
  margin: 18px 0 25px;
  .fee-info {
    margin: 5px 0;
    display: flex;
    .fee-info-title {
      font-weight: 300;
      width: 110px;
      color: ${colors.textColorSecondary};
    }
    .fee-info-value {
      font-weight: 500;
      .ant-tag {
        padding: 5px 15px;
        background: ${colors.assetTag};
        border: none;
        color: ${colors.textColor};
        text-transform: capitalize;
      }
    }
  }
`;
